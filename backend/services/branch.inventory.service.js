export const updateProductStockService = async ({
  id,
  branchId,
  action,
  quantity,
  notes,
  handledBy,
}) => {
  try {
    const inventoryRes = await client.query(
      `
      SELECT *
      FROM branch_inventory
      WHERE product_id = $1
      AND branch_id = $2
      `,
      [id, branchId],
    );

    let inventory;

    if (inventoryRes.rowCount === 0) {
      const createInventoryRes = await client.query(
        `
        INSERT INTO branch_inventory (
          branch_id,
          product_id,
          stock
        )
        VALUES ($1, $2, 0)
        RETURNING *
        `,
        [branchId, id],
      );

      inventory = createInventoryRes.rows[0];
    } else {
      inventory = inventoryRes.rows[0];
    }

    const beforeStock = inventory.stock;
    let afterStock = beforeStock;

    // 🔥 Compute stock
    if (action === "IN") {
      afterStock += quantity;
    } else if (action === "OUT") {
      if (quantity > beforeStock) {
        throw new Error("Insufficient stock");
      }

      afterStock -= quantity;
    } else {
      throw new Error("Invalid action type");
    }

    // 📝 Update inventory stock
    const updateRes = await client.query(
      `
      UPDATE branch_inventory
      SET
        stock = $1,
        updated_at = NOW()
      WHERE product_id = $2
      AND branch_id = $3
      RETURNING *
      `,
      [afterStock, id, branchId],
    );

    // 📦 Log movement
    await client.query(
      `
      INSERT INTO stock_movements (
        handled_by,
        product_id,
        branch_id,
        type,
        quantity,
        before_stock,
        after_stock,
        reference
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        handledBy,
        id,
        branchId,
        action,
        quantity,
        beforeStock,
        afterStock,
        notes || null,
      ],
    );

    return updateRes.rows[0];
  } catch (error) {
    throw error;
  }
};
