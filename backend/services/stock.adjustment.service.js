import pool from "../config/db.js";

export const createStockAdjustmentService = async ({
  branchId,
  reason,
  items,
  createdBy,
  adjustmentType,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const adjustmentResult = await client.query(
      `
      INSERT INTO stock_adjustments (
        branch_id,
        status,
        reason,
        created_by,
        adjustment_type
      )
      VALUES ($1, 'pending', $2, $3, $4)
      RETURNING *
      `,
      [branchId, reason, createdBy, adjustmentType],
    );

    const adjustment = adjustmentResult.rows[0];

    for (const item of items) {
      await client.query(
        `
        INSERT INTO stock_adjustment_items (
          adjustment_id,
          product_id,
          quantity,
          remarks
        )
        VALUES ($1, $2, $3, $4)
        `,
        [adjustment.id, item.productId, item.quantity, item.remarks || null],
      );
    }

    await client.query("COMMIT");

    return adjustment;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const approveStockAdjustmentService = async ({
  adjustmentId,
  handledBy,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const adjustmentResult = await client.query(
      `
      SELECT *
      FROM stock_adjustments
      WHERE id = $1
      FOR UPDATE
      `,
      [adjustmentId],
    );

    const adjustment = adjustmentResult.rows[0];

    if (!adjustment) {
      throw new Error("Stock adjustment not found");
    }

    if (adjustment.status !== "pending") {
      throw new Error(`Stock adjustment already ${adjustment.status}`);
    }

    if (!["IN", "OUT"].includes(adjustment.adjustment_type)) {
      throw new Error(`Invalid adjustment type: ${adjustment.adjustment_type}`);
    }

    const itemsResult = await client.query(
      `
      SELECT *
      FROM stock_adjustment_items
      WHERE adjustment_id = $1
      `,
      [adjustmentId],
    );

    const items = itemsResult.rows;

    if (!items.length) {
      throw new Error("No stock adjustment items found");
    }

    for (const item of items) {
      const inventoryResult = await client.query(
        `
        SELECT *
        FROM branch_inventory
        WHERE branch_id = $1
        AND product_id = $2
        FOR UPDATE
        `,
        [adjustment.branch_id, item.product_id],
      );

      let inventory = inventoryResult.rows[0];

      let beforeStock = 0;
      let afterStock = 0;

      if (!inventory) {
        if (adjustment.adjustment_type === "OUT") {
          throw new Error(
            `Cannot deduct stock. Product ${item.product_id} has no inventory record.`,
          );
        }

        const createInventoryResult = await client.query(
          `
          INSERT INTO branch_inventory (
            branch_id,
            product_id,
            stock,
            reserved_stock,
            created_at,
            updated_at
          )
          VALUES (
            $1,
            $2,
            $3,
            0,
            NOW(),
            NOW()
          )
          RETURNING *
          `,
          [adjustment.branch_id, item.product_id, item.quantity],
        );

        inventory = createInventoryResult.rows[0];

        beforeStock = 0;
        afterStock = Number(item.quantity);
      } else {
        beforeStock = Number(inventory.stock);

        if (adjustment.adjustment_type === "IN") {
          afterStock = beforeStock + Number(item.quantity);
        }

        if (adjustment.adjustment_type === "OUT") {
          afterStock = beforeStock - Number(item.quantity);
        }

        if (afterStock < 0) {
          throw new Error(`Insufficient stock for product ${item.product_id}`);
        }

        await client.query(
          `
          UPDATE branch_inventory
          SET
            stock = $1,
            updated_at = NOW()
          WHERE id = $2
          `,
          [afterStock, inventory.id],
        );
      }

      await client.query(
        `
        UPDATE stock_adjustment_items
        SET
          previous_stock = $1,
          new_stock = $2
        WHERE id = $3
        `,
        [beforeStock, afterStock, item.id],
      );

      await client.query(
        `
        INSERT INTO stock_movements (
          branch_id,
          handled_by,
          product_id,
          reference_type,
          reference_id,
          movement_type,
          quantity,
          before_stock,
          after_stock,
          remarks,
          created_at
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          NOW()
        )
        `,
        [
          adjustment.branch_id,
          adjustment.created_by,
          item.product_id,
          "stock_adjustment",
          adjustment.id,
          adjustment.adjustment_type,
          item.quantity,
          beforeStock,
          afterStock,
          item.remarks || adjustment.reason || null,
        ],
      );
    }

    await client.query(
      `
      UPDATE stock_adjustments
      SET
        status = 'approved',
        handled_by = $1,
        handled_at = NOW()
      WHERE id = $2
      `,
      [handledBy, adjustmentId],
    );

    await client.query("COMMIT");

    return {
      success: true,
      adjustmentId,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const rejectStockAdjustmentService = async ({
  adjustmentId,
  handledBy,
  rejectionReason,
}) => {
  const result = await pool.query(
    `
    UPDATE stock_adjustments
    SET
      status = 'rejected',
      handled_by = $1,
      handled_at = NOW(),
      rejection_reason = $2
    WHERE id = $3
    AND status = 'pending'
    RETURNING *
    `,
    [handledBy, rejectionReason, adjustmentId],
  );

  if (!result.rows.length) {
    throw new Error("Stock adjustment not found or already processed");
  }

  return result.rows[0];
};

export const getStockAdjustmentsService = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
  branchId,
}) => {
  const offset = (page - 1) * limit;

  const conditions = [];
  const filterValues = [];

  if (search) {
    filterValues.push(`%${search}%`);
    conditions.push(`sa.reason ILIKE $${filterValues.length}`);
  }

  if (status) {
    filterValues.push(status);
    conditions.push(`sa.status = $${filterValues.length}`);
  }

  if (branchId) {
    filterValues.push(branchId);
    conditions.push(`sa.branch_id = $${filterValues.length}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM stock_adjustments sa
    ${whereClause}
  `;

  const countResult = await pool.query(countQuery, filterValues);
  const total = Number(countResult.rows[0].total);

  const dataValues = [...filterValues, limit, offset];

  const query = `
    SELECT
      sa.id,
      sa.status,
      sa.reason,
      sa.created_at AS "createdAt",
      sa.adjustment_type AS "adjustmentType",
      CONCAT(hu.first_name, ' ', hu.last_name) AS "handledBy",
      sa.handled_at AS "handledAt",

      u.id AS "createdById",
      CONCAT(u.first_name, ' ', u.last_name) AS "createdByName",

      COALESCE(
        json_agg(
          json_build_object(
            'id', sai.id,
            'productId', p.id,
            'productName', p.product_name,
            'quantity', sai.quantity,

            'prevStock',
              CASE
                WHEN sa.status = 'pending' THEN COALESCE(bi.stock, 0)
                WHEN sa.status = 'approved' THEN COALESCE(sai.previous_stock, 0)
                WHEN sa.status = 'rejected' THEN 0
                ELSE 0
              END,

            'newStock',
              CASE
                WHEN sa.status = 'pending' AND sa.adjustment_type = 'IN'
                  THEN COALESCE(bi.stock, 0) + sai.quantity

                WHEN sa.status = 'pending' AND sa.adjustment_type = 'OUT'
                  THEN COALESCE(bi.stock, 0) - sai.quantity

                WHEN sa.status = 'approved'
                  THEN COALESCE(sai.new_stock, 0)

                WHEN sa.status = 'rejected'
                  THEN 0

                ELSE 0
              END,

            'remarks', sai.remarks
          )
          ORDER BY sai.id
        ) FILTER (WHERE sai.id IS NOT NULL),
        '[]'
      ) AS items

    FROM stock_adjustments sa

    LEFT JOIN users u
      ON u.id = sa.created_by

    LEFT JOIN users hu
      ON hu.id = sa.handled_by

    LEFT JOIN stock_adjustment_items sai
      ON sai.adjustment_id = sa.id

    LEFT JOIN products p
      ON p.id = sai.product_id

    LEFT JOIN branch_inventory bi
      ON bi.branch_id = sa.branch_id
      AND bi.product_id = sai.product_id

    ${whereClause}

    GROUP BY
      sa.id,
      u.id,
      u.first_name,
      u.last_name,
      hu.first_name,
      hu.last_name

    ORDER BY sa.created_at DESC

    LIMIT $${dataValues.length - 1}
    OFFSET $${dataValues.length}
  `;

  const result = await pool.query(query, dataValues);

  return {
    adjustments: result.rows,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};
