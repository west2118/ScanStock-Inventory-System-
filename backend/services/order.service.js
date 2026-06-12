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
}) => {
  const offset = (page - 1) * limit;

  const countResult = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM orders
    WHERE customer_id = $1
    `,
    [customerId],
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
      ) AS items

    FROM orders o

    LEFT JOIN order_addresses oa
      ON oa.order_id = o.id

    LEFT JOIN order_payments op
      ON op.order_id = o.id

    WHERE o.customer_id = $1

    ORDER BY o.created_at DESC

    LIMIT $2 OFFSET $3
    `,
    [customerId, limit, offset],
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
