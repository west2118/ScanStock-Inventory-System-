import pool from "../config/db.js";

export const createOrderService = async ({
  customerId,
  deliveryMethod,
  paymentMethod,
  notes,
  items,
  address,
  shippingFee = 0,
  discountAmount = 0,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const fullName = `${address.firstName} ${address.lastName}`;

    if (!items || items.length === 0) {
      throw new Error("Order items are required");
    }

    if (!address) {
      throw new Error("Order address is required");
    }

    const branchResult = await client.query(
      `
      SELECT id
      FROM branches
      WHERE branch_name = 'Central Warehouse'
      LIMIT 1
      `,
    );

    if (branchResult.rows.length === 0) {
      throw new Error("Central Warehouse branch not found");
    }

    const branchId = branchResult.rows[0].id;

    let subtotal = 0;

    for (const item of items) {
      const inventoryResult = await client.query(
        `
        SELECT
          stock,
          reserved_stock
        FROM branch_inventory
        WHERE branch_id = $1
          AND product_id = $2
        FOR UPDATE
        `,
        [branchId, item.productId],
      );

      if (inventoryResult.rows.length === 0) {
        throw new Error(`Inventory not found for product ID ${item.productId}`);
      }

      const inventory = inventoryResult.rows[0];

      const availableStock =
        Number(inventory.stock) - Number(inventory.reserved_stock);

      if (availableStock < Number(item.quantity)) {
        throw new Error(
          `Insufficient stock for product ID ${item.productId}. Available: ${availableStock}`,
        );
      }

      subtotal += Number(item.price) * Number(item.quantity);
    }

    const orderNumber = `ORD-${Date.now()}`;

    const totalProductsAmount = items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0,
    );

    const vatableAmount = items
      .filter((item) => item.vatType === "vatable")
      .reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0,
      );

    const vatableDiscount =
      totalProductsAmount > 0
        ? (vatableAmount / totalProductsAmount) * Number(discountAmount)
        : 0;

    const vatableBase = vatableAmount - vatableDiscount + Number(shippingFee);

    const taxAmount = vatableBase * (12 / 112);

    const totalAmount =
      totalProductsAmount + Number(shippingFee) - Number(discountAmount);

    const netSales = totalAmount - taxAmount;

    const orderResult = await client.query(
      `
      INSERT INTO orders (
        branch_id,
        customer_id,
        order_number,
        subtotal,
        shipping_fee,
        discount_amount,
        tax_amount,
        total_amount,
        net_sales,
        delivery_method,
        order_status,
        notes
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending', $11
      )
      RETURNING *
      `,
      [
        branchId,
        customerId,
        orderNumber,
        subtotal,
        shippingFee,
        discountAmount,
        taxAmount,
        totalAmount,
        netSales,
        deliveryMethod,
        notes,
      ],
    );

    const order = orderResult.rows[0];

    await client.query(
      `
      INSERT INTO order_payments (
        order_id,
        payment_method,
        transaction_id,
        amount,
        payment_status,
        paid_at
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        order.id,
        paymentMethod,
        null,
        totalAmount,
        paymentMethod === "cod" ? "pending" : "pending",
        null,
      ],
    );

    for (const item of items) {
      const itemSubtotal = Number(item.price) * Number(item.quantity);

      await client.query(
        `
        INSERT INTO order_items (
          order_id,
          product_id,
          sku,
          product_name,
          price,
          quantity,
          subtotal
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          order.id,
          item.productId,
          item.sku,
          item.productName,
          item.price,
          item.quantity,
          itemSubtotal,
        ],
      );

      await client.query(
        `
        UPDATE branch_inventory
        SET
          reserved_stock = reserved_stock + $1,
          updated_at = NOW()
        WHERE branch_id = $2
          AND product_id = $3
        `,
        [item.quantity, branchId, item.productId],
      );
    }

    await client.query(
      `
      INSERT INTO order_addresses (
        order_id,
        full_name,
        email,
        phone,
        address_line,
        barangay,
        city,
        province,
        postal_code,
        landmark
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `,
      [
        order.id,
        fullName,
        address.email,
        address.phone,
        address.addressLine,
        address.barangay,
        address.city,
        address.province,
        address.postalCode,
        address.landmark,
      ],
    );

    await client.query(
      `
      INSERT INTO order_status_history (
        order_id,
        previous_status,
        new_status,
        remarks,
        changed_by
      )
      VALUES ($1, $2, $3, $4, $5)
      `,
      [order.id, null, "pending", "Order placed by customer", customerId],
    );

    await client.query(
      `
      DELETE FROM cart_items
      WHERE cart_id = (
        SELECT id
        FROM carts
        WHERE customer_id = $1
        LIMIT 1
      )
      AND product_id = ANY($2::int[])
      `,
      [customerId, items.map((item) => item.productId)],
    );

    await client.query("COMMIT");

    return {
      message: "Order created successfully",
      order,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getCustomerOrdersService = async ({
  customerId,
  page = 1,
  limit = 10,
  status = "all",
  search = "",
}) => {
  const offset = (page - 1) * limit;

  let statusQuery = "";
  let queryParams = [customerId];

  if (status !== "all") {
    if (status === "delivered") {
      statusQuery = `AND o.order_status IN ('delivered', 'completed')`;
    } else {
      queryParams.push(status);
      statusQuery = `AND o.order_status = $${queryParams.length}`;
    }
  }

  let searchQuery = "";
  if (search) {
    queryParams.push(`%${search}%`);
    searchQuery = `AND (o.order_number ILIKE $${queryParams.length} OR EXISTS (SELECT 1 FROM order_items oi WHERE oi.order_id = o.id AND oi.product_name ILIKE $${queryParams.length}))`;
  }

  const countResult = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM orders o
    WHERE o.customer_id = $1 ${statusQuery} ${searchQuery}
    `,
    queryParams,
  );

  const total = Number(countResult.rows[0].total);

  const result = await pool.query(
    `
    SELECT
      o.id,
      o.order_number AS "orderNumber",

      o.subtotal AS "subtotal",
      o.shipping_fee AS "shippingFee",
      o.discount_amount AS "discountAmount",
      o.tax_amount AS "taxAmount",
      o.total_amount AS "totalAmount",
      o.net_sales AS "netSales",

      o.delivery_method AS "deliveryMethod",
      o.order_status AS "orderStatus",
      o.notes,

      op.payment_method AS "paymentMethod",
      op.payment_status AS "paymentStatus",
      op.transaction_id AS "transactionId",
      op.amount AS "paymentAmount",
      op.paid_at AS "paidAt",

      o.placed_at AS "placedAt",
      o.created_at AS "createdAt",

      json_build_object(
        'fullName', oa.full_name,
        'email', oa.email,
        'phone', oa.phone,
        'addressLine', oa.address_line,
        'barangay', oa.barangay,
        'city', oa.city,
        'province', oa.province,
        'postalCode', oa.postal_code,
        'landmark', oa.landmark
      ) AS address,

      (
        SELECT COALESCE(
          json_agg(
            json_build_object(
              'id', oi.id,
              'productId', oi.product_id,
              'sku', oi.sku,
              'productName', oi.product_name,
              'price', oi.price,
              'quantity', oi.quantity,
              'subtotal', oi.subtotal,
              'imageUrl',
              (
                SELECT pi.image_url
                FROM product_images pi
                WHERE pi.product_id = oi.product_id
                AND pi.is_primary = true
                LIMIT 1
              )
            )
          ),
          '[]'
        )
        FROM order_items oi
        WHERE oi.order_id = o.id
      ) AS items,

      (
        SELECT COALESCE(
          json_agg(
            json_build_object(
              'id', osh.id,
              'newStatus', osh.new_status,
              'remarks', osh.remarks,
              'createdAt', osh.created_at
            ) ORDER BY osh.created_at ASC
          ),
          '[]'
        )
        FROM order_status_history osh
        WHERE osh.order_id = o.id
      ) AS history

    FROM orders o

    LEFT JOIN order_addresses oa
      ON oa.order_id = o.id

    LEFT JOIN order_payments op
      ON op.order_id = o.id

    WHERE o.customer_id = $1 ${statusQuery} ${searchQuery}

    ORDER BY o.created_at DESC

    LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
    `,
    [...queryParams, limit, offset],
  );

  return {
    orders: result.rows,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getBranchOrdersService = async ({
  branchId,
  page = 1,
  limit = 10,
  status = "all",
  search = "",
  payment = "all",
  date = "all",
}) => {
  const offset = (page - 1) * limit;

  let whereClauses = ["o.branch_id = $1"];
  let queryParams = [branchId];

  if (status !== "all") {
    if (status === "delivered") {
      whereClauses.push(`o.order_status IN ('delivered', 'completed')`);
    } else {
      queryParams.push(status);
      whereClauses.push(`o.order_status = $${queryParams.length}`);
    }
  }

  if (search) {
    queryParams.push(`%${search}%`);
    const searchIndex = queryParams.length;
    whereClauses.push(`(o.order_number ILIKE $${searchIndex} OR oa.full_name ILIKE $${searchIndex})`);
  }

  if (payment !== "all") {
    queryParams.push(payment);
    whereClauses.push(`op.payment_method = $${queryParams.length}`);
  }

  if (date !== "all") {
    let dateInterval = "";
    if (date === "7days") dateInterval = "7 days";
    else if (date === "30days") dateInterval = "30 days";
    else if (date === "90days") dateInterval = "90 days";
    else if (date === "thisyear") dateInterval = "1 year";

    if (dateInterval) {
       whereClauses.push(`o.created_at >= NOW() - INTERVAL '${dateInterval}'`);
    }
  }

  const whereString = whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";

  const countQuery = `
    SELECT COUNT(DISTINCT o.id) AS total
    FROM orders o
    LEFT JOIN order_addresses oa ON oa.order_id = o.id
    LEFT JOIN order_payments op ON op.order_id = o.id
    ${whereString}
  `;

  const countResult = await pool.query(countQuery, queryParams);
  const total = Number(countResult.rows[0].total);

  const resultQueryParams = [...queryParams, limit, offset];
  const limitIndex = queryParams.length + 1;
  const offsetIndex = queryParams.length + 2;

  const resultQuery = `
    SELECT
      o.id,
      o.branch_id AS "branchId",
      o.customer_id AS "customerId",
      o.order_number AS "orderNumber",

      o.subtotal,
      o.shipping_fee AS "shippingFee",
      o.discount_amount AS "discountAmount",
      o.tax_amount AS "taxAmount",
      o.total_amount AS "totalAmount",
      o.net_sales AS "netSales",

      o.delivery_method AS "deliveryMethod",
      o.order_status AS "orderStatus",
      o.notes,

      op.payment_method AS "paymentMethod",
      op.payment_status AS "paymentStatus",
      op.transaction_id AS "transactionId",
      op.amount AS "paymentAmount",
      op.paid_at AS "paidAt",

      o.placed_at AS "placedAt",
      o.created_at AS "createdAt",

      json_build_object(
        'fullName', oa.full_name,
        'email', oa.email,
        'phone', oa.phone,
        'addressLine', oa.address_line,
        'barangay', oa.barangay,
        'city', oa.city,
        'province', oa.province,
        'postalCode', oa.postal_code,
        'landmark', oa.landmark
      ) AS address,

      COALESCE(
        json_agg(
          json_build_object(
            'id', oi.id,
            'productId', oi.product_id,
            'sku', oi.sku,
            'productName', oi.product_name,
            'price', oi.price,
            'quantity', oi.quantity,
            'subtotal', oi.subtotal,
            'imageUrl',
            (
              SELECT pi.image_url
              FROM product_images pi
              WHERE pi.product_id = oi.product_id
              AND pi.is_primary = true
              LIMIT 1
            )
          )
        ) FILTER (WHERE oi.id IS NOT NULL),
        '[]'
      ) AS items,

      (
        SELECT COALESCE(
          json_agg(
            json_build_object(
              'id', osh.id,
              'newStatus', osh.new_status,
              'remarks', osh.remarks,
              'createdAt', osh.created_at
            ) ORDER BY osh.created_at ASC
          ),
          '[]'
        )
        FROM order_status_history osh
        WHERE osh.order_id = o.id
      ) AS history

    FROM orders o
    LEFT JOIN order_addresses oa ON oa.order_id = o.id
    LEFT JOIN order_payments op ON op.order_id = o.id
    LEFT JOIN order_items oi ON oi.order_id = o.id

    ${whereString}

    GROUP BY o.id, oa.id, op.id
    ORDER BY o.created_at DESC
    LIMIT $${limitIndex} OFFSET $${offsetIndex}
    `;

  const result = await pool.query(resultQuery, resultQueryParams);

  return {
    orders: result.rows,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const processOrderService = async ({ orderId, branchId, userId }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const orderResult = await client.query(
      `
      SELECT
        o.id,
        o.branch_id,
        o.order_status,
        op.payment_method,
        op.payment_status
      FROM orders o
      LEFT JOIN order_payments op
        ON op.order_id = o.id
      WHERE o.id = $1
      `,
      [orderId],
    );

    if (orderResult.rows.length === 0) {
      throw new Error("Order not found");
    }

    const order = orderResult.rows[0];

    if (order.branch_id !== branchId) {
      throw new Error("You cannot process orders from another branch");
    }

    if (order.order_status !== "pending") {
      throw new Error("Only pending orders can be processed");
    }

    if (!order.payment_method) {
      throw new Error("Order payment record not found");
    }

    if (order.payment_method !== "cod" && order.payment_status !== "paid") {
      throw new Error(
        "Online payments must be paid before the order can be processed",
      );
    }

    await client.query(
      `
      UPDATE orders
      SET
        order_status = 'processing',
        fulfilled_by = $1,
        updated_at = NOW()
      WHERE id = $2
      `,
      [userId, orderId],
    );

    await client.query(
      `
      INSERT INTO order_status_history (
        order_id,
        previous_status,
        new_status,
        changed_by
      )
      VALUES ($1, $2, $3, $4)
      `,
      [orderId, "pending", "processing", userId],
    );

    await client.query("COMMIT");

    return {
      message: "Order is now processing",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const shipOrderService = async ({
  orderId,
  branchId,
  userId,
  trackingNumber,
  courierName,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const orderResult = await client.query(
      `
      SELECT
        id,
        branch_id,
        order_status
      FROM orders
      WHERE id = $1
      `,
      [orderId],
    );

    if (orderResult.rows.length === 0) {
      throw new Error("Order not found");
    }

    const order = orderResult.rows[0];

    if (order.branch_id !== branchId) {
      throw new Error("You cannot ship orders from another branch");
    }

    if (order.order_status !== "processing") {
      throw new Error("Only processing orders can be shipped");
    }

    if (!trackingNumber?.trim()) {
      throw new Error("Tracking number is required");
    }

    if (!courierName?.trim()) {
      throw new Error("Courier name is required");
    }

    await client.query(
      `
      UPDATE orders
      SET
        order_status = 'shipped',
        tracking_number = $1,
        courier_name = $2,
        fulfilled_by = $3,
        updated_at = NOW()
      WHERE id = $4
      `,
      [trackingNumber, courierName, userId, orderId],
    );

    await client.query(
      `
      INSERT INTO order_status_history (
        order_id,
        previous_status,
        new_status,
        remarks,
        changed_by
      )
      VALUES ($1, $2, $3, $4, $5)
      `,
      [
        orderId,
        "processing",
        "shipped",
        `Tracking Number: ${trackingNumber}, Courier: ${courierName}`,
        userId,
      ],
    );

    await client.query("COMMIT");

    return {
      message: "Order has been shipped",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const deliverOrderService = async ({ orderId, branchId, userId }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const orderResult = await client.query(
      `
      SELECT
        id,
        branch_id,
        order_status
      FROM orders
      WHERE id = $1
      `,
      [orderId],
    );

    if (orderResult.rows.length === 0) {
      throw new Error("Order not found");
    }

    const order = orderResult.rows[0];

    if (order.branch_id !== branchId) {
      throw new Error("You cannot update orders from another branch");
    }

    if (order.order_status !== "shipped") {
      throw new Error("Only shipped orders can be delivered");
    }

    await client.query(
      `
      UPDATE orders
      SET
        order_status = 'delivered',
        fulfilled_by = $1,
        updated_at = NOW()
      WHERE id = $2
      `,
      [userId, orderId],
    );

    await client.query(
      `
      UPDATE order_payments
      SET
        payment_status = 'paid',
        paid_at = NOW()
      WHERE order_id = $1
        AND payment_method = 'cod'
        AND payment_status <> 'paid'
      `,
      [orderId],
    );

    await client.query(
      `
      INSERT INTO order_status_history (
        order_id,
        previous_status,
        new_status,
        changed_by
      )
      VALUES ($1, $2, $3, $4)
      `,
      [orderId, "shipped", "delivered", userId],
    );

    await client.query("COMMIT");

    return {
      message: "Order has been delivered",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const completeOrderService = async ({ orderId, customerId }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const orderResult = await client.query(
      `
      SELECT id, customer_id, order_status
      FROM orders
      WHERE id = $1
      `,
      [orderId],
    );

    if (orderResult.rows.length === 0) {
      throw new Error("Order not found");
    }

    const order = orderResult.rows[0];

    if (order.customer_id !== customerId) {
      throw new Error("You cannot complete another customer's order");
    }

    if (order.order_status !== "delivered") {
      throw new Error("Only delivered orders can be completed");
    }

    await client.query(
      `
      UPDATE orders
      SET
        order_status = 'completed',
        updated_at = NOW()
      WHERE id = $1
      `,
      [orderId],
    );

    await client.query(
      `
      INSERT INTO order_status_history (
        order_id,
        previous_status,
        new_status,
        changed_by
      )
      VALUES ($1, $2, $3, $4)
      `,
      [orderId, "delivered", "completed", customerId],
    );

    await client.query("COMMIT");

    return {
      message: "Order has been completed",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getOrderSummaryStatsService = async (branchId) => {
  const result = await pool.query(
    `
    SELECT
      COUNT(*)::int AS total,
      COUNT(CASE WHEN order_status = 'pending' THEN 1 END)::int AS pending,
      COUNT(CASE WHEN order_status = 'processing' THEN 1 END)::int AS processing,
      COUNT(CASE WHEN order_status = 'shipped' THEN 1 END)::int AS shipped,
      COUNT(CASE WHEN order_status = 'delivered' OR order_status = 'completed' THEN 1 END)::int AS delivered,
      COUNT(CASE WHEN order_status = 'returned' THEN 1 END)::int AS returned,
      COUNT(CASE WHEN order_status = 'cancelled' THEN 1 END)::int AS cancelled,
      COALESCE(SUM(CASE WHEN order_status = 'delivered' OR order_status = 'completed' THEN total_amount ELSE 0 END), 0)::float AS revenue
    FROM orders
    WHERE branch_id = $1
    `,
    [branchId]
  );
  return result.rows[0];
};

export const getCustomerOrderStatsService = async (customerId) => {
  const result = await pool.query(
    `
    SELECT
      COUNT(*)::int AS total,
      COUNT(CASE WHEN order_status = 'pending' THEN 1 END)::int AS pending,
      COUNT(CASE WHEN order_status = 'processing' THEN 1 END)::int AS processing,
      COUNT(CASE WHEN order_status = 'shipped' THEN 1 END)::int AS shipped,
      COUNT(CASE WHEN order_status = 'delivered' OR order_status = 'completed' THEN 1 END)::int AS delivered,
      COUNT(CASE WHEN order_status = 'returned' THEN 1 END)::int AS returned,
      COUNT(CASE WHEN order_status = 'cancelled' THEN 1 END)::int AS cancelled
    FROM orders
    WHERE customer_id = $1
    `,
    [customerId]
  );
  return result.rows[0];
};

export const getCustomerActiveOrderCountService = async (customerId) => {
  const result = await pool.query(
    `
    SELECT COUNT(*)::int AS count
    FROM orders
    WHERE customer_id = $1 AND order_status IN ('pending', 'processing', 'shipped')
    `,
    [customerId]
  );
  return result.rows[0];
};

export const cancelOrderService = async ({ orderId, customerId, reason }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const orderResult = await client.query(
      `
      SELECT id, branch_id, customer_id, order_status
      FROM orders
      WHERE id = $1
      `,
      [orderId],
    );

    if (orderResult.rows.length === 0) {
      throw new Error("Order not found");
    }

    const order = orderResult.rows[0];

    if (order.customer_id !== customerId) {
      throw new Error("You cannot cancel another customer's order");
    }

    if (order.order_status !== "pending" && order.order_status !== "processing") {
      throw new Error("Only pending or processing orders can be cancelled");
    }

    const itemsResult = await client.query(
      `
      SELECT product_id, quantity
      FROM order_items
      WHERE order_id = $1
      `,
      [orderId],
    );

    for (const item of itemsResult.rows) {
      await client.query(
        `
        UPDATE branch_inventory
        SET
          reserved_stock = reserved_stock - $1,
          updated_at = NOW()
        WHERE branch_id = $2
          AND product_id = $3
        `,
        [item.quantity, order.branch_id, item.product_id],
      );
    }

    await client.query(
      `
      UPDATE orders
      SET
        order_status = 'cancelled',
        updated_at = NOW()
      WHERE id = $1
      `,
      [orderId],
    );

    await client.query(
      `
      INSERT INTO order_status_history (
        order_id,
        previous_status,
        new_status,
        remarks,
        changed_by
      )
      VALUES ($1, $2, $3, $4, $5)
      `,
      [
        orderId,
        order.order_status,
        "cancelled",
        reason ? `Cancelled by customer. Reason: ${reason}` : "Cancelled by customer",
        customerId,
      ],
    );

    await client.query("COMMIT");

    return {
      message: "Order has been cancelled",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const submitOrderReviewService = async ({
  orderId,
  customerId,
  reviews,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Check if the order exists, belongs to the customer, and is delivered
    const orderResult = await client.query(
      `
      SELECT id, customer_id, order_status
      FROM orders
      WHERE id = $1
      `,
      [orderId],
    );

    if (orderResult.rows.length === 0) {
      throw new Error("Order not found");
    }

    const order = orderResult.rows[0];

    if (order.customer_id !== customerId) {
      throw new Error("You cannot review another customer's order");
    }

    if (order.order_status !== "delivered") {
      throw new Error("Only delivered orders can be reviewed and completed");
    }

    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
      throw new Error("No reviews provided");
    }

    // Insert the reviews
    for (const item of reviews) {
      await client.query(
        `
        INSERT INTO product_reviews (
          order_id,
          product_id,
          customer_id,
          rating,
          title,
          review
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [orderId, item.productId, customerId, item.rating, item.title, item.review],
      );
    }

    // Update order status to completed
    await client.query(
      `
      UPDATE orders
      SET
        order_status = 'completed',
        updated_at = NOW()
      WHERE id = $1
      `,
      [orderId],
    );

    // Insert order history log
    await client.query(
      `
      INSERT INTO order_status_history (
        order_id,
        previous_status,
        new_status,
        remarks,
        changed_by
      )
      VALUES ($1, $2, $3, $4, $5)
      `,
      [orderId, "delivered", "completed", "Customer submitted order reviews", customerId],
    );

    await client.query("COMMIT");

    return {
      message: "Reviews submitted and order completed successfully",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

