import pool from "../config/db.js";

export const createOrderService = async ({
  customerId,
  deliveryMethod,
  notes,
  items,
  address,
  shippingFee = 0,
  discountAmount = 0,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

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
        address.fullName,
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
