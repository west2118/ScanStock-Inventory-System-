import pool from "../config/db.js";
import { calculateSales } from "../utils/transactions.js";
import { updateProductStockService } from "./branch.inventory.service.js";

export const createTransactionService = async (
  client,
  {
    transaction_number,
    branch_id,
    handled_by,
    paymentMethod,
    customer_name,
    customer_tin = null,
    grossSales,
    totalSales,
    discount,
    vatable_sales,
    vat_exempt_sales,
    zero_rated_sales,
    vatAmount,
    totalAmount,
    customer_cash,
    changeAmount,
    notes,
  },
) => {
  const result = await client.query(
    `
    INSERT INTO transactions (
      transaction_number,
      branch_id,
      handled_by,
      payment_method,
      customer_name,
      customer_tin,
      gross_sales,
      total_sales,
      discount,
      vatable_sales,
      vat_exempt_sales,
      zero_rated_sales,
      vat_amount,
      total_amount,
      customer_cash,
      change_amount,
      notes
    )
    VALUES (
      $1,$2,$3,$4,$5,
      $6,$7,$8,$9,$10,
      $11,$12,$13,$14,$15,$16,$17
    )
    RETURNING *
    `,
    [
      transaction_number,
      branch_id,
      handled_by,
      paymentMethod,
      customer_name,
      customer_tin || null,
      grossSales,
      totalSales,
      discount,
      vatable_sales,
      vat_exempt_sales,
      zero_rated_sales,
      vatAmount,
      totalAmount,
      customer_cash,
      changeAmount,
      notes,
    ],
  );

  return result.rows[0];
};

export const createTransactionItemService = async (
  client,
  { transaction_id, id, quantity, price, subtotal, vatType, productName },
) => {
  const result = await client.query(
    "INSERT INTO transaction_items (transaction_id, product_id, quantity, price, subtotal, vat_type, product_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [transaction_id, id, quantity, price, subtotal, vatType, productName],
  );

  return result.rows[0];
};

export const createTransactionFlowService = async (client, payload) => {
  const { handled_by, discount, customer_cash, items, branch_id, notes } =
    payload;

  const sales = calculateSales(items, Number(discount), Number(customer_cash));

  const transactionNumber = `TXN-${Date.now()}-${Math.floor(
    1000 + Math.random() * 9000,
  )}`;

  const transaction = await createTransactionService(client, {
    ...payload,
    transaction_number: transactionNumber,
    ...sales,
  });

  for (const item of items) {
    const productResult = await client.query(
      `
        SELECT stock
        FROM branch_inventory
        WHERE product_id = $1
        AND branch_id = $2
        FOR UPDATE
    `,
      [item.id, branch_id],
    );

    const product = productResult.rows[0];

    if (!product) {
      throw new Error(`Product ${item.id} not found in branch ${branch_id}`);
    }

    const currentStock = Number(product.stock);

    if (currentStock < item.quantity) {
      throw new Error(`Insufficient stock for product ${item.id}`);
    }

    const itemSubtotal = item.price * item.quantity;

    await createTransactionItemService(client, {
      transaction_id: transaction.id,
      ...item,
      subtotal: itemSubtotal,
    });

    // Update Stock
    await updateProductStockService({
      client,
      id: item.id,
      branchId: branch_id,
      action: "OUT",
      quantity: item.quantity,
      price: item.price,
      reference: transaction.id,
      handledBy: handled_by,
    });
  }

  return transaction;
};

export const getTransactionsService = async ({
  page = 1,
  limit = 10,
  search,
  status,
  user,
  branchId,
}) => {
  const offset = (page - 1) * limit;

  const conditions = [];
  const values = [branchId];
  let idx = 1;

  conditions.push(`t.branch_id = $${idx}`);
  idx++;

  const isCashier = user?.role === "cashier";

  if (isCashier) {
    conditions.push(`t.handled_by = $${idx}`);
    values.push(user.id);
    idx++;
  }

  // Search (transactions + items + date)
  if (search) {
    conditions.push(`
    (
      t.id::text ILIKE $${idx}
      OR t.customer_name ILIKE $${idx}
      OR t.status ILIKE $${idx}
      OR to_char(t.created_at, 'FMMonth YYYY') ILIKE $${idx}
      OR to_char(t.created_at, 'YYYY-MM-DD') ILIKE $${idx}
      OR EXISTS (
        SELECT 1
        FROM transaction_items ti
        JOIN products p ON p.id = ti.product_id
        WHERE ti.transaction_id = t.id
        AND t.branch_id = $1
        AND (
          p.product_name ILIKE $${idx}
        )
      )
    )
  `);
    values.push(`%${search}%`);
    idx++;
  }

  // Status filter
  if (status) {
    conditions.push(`t.status = $${idx}`);
    values.push(status);
    idx++;
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  /* -------------------- TOTAL COUNT -------------------- */
  const totalResult = await pool.query(
    `
    SELECT COUNT(*)::int AS total
    FROM transactions t
    ${whereClause}
    `,
    values,
  );

  const total = totalResult.rows[0].total;
  const totalPages = Math.ceil(total / limit);

  /* -------------------- DATA QUERY -------------------- */
  const result = await pool.query(
    `
    SELECT
      t.id,
      t.transaction_number AS "transactionNumber",
      CONCAT(u.first_name, ' ', u.last_name) AS "handledBy",
      t.payment_method AS "paymentMethod",
      t.customer_name AS "customerName",
      t.customer_tin AS "customerTin",

      t.gross_sales AS "grossSales",
      t.total_sales AS "totalSales",
      t.discount,
      t.vatable_sales AS "vatableSales",
      t.vat_exempt_sales AS "vatExemptSales",
      t.zero_rated_sales AS "zeroRatedSales",
      t.vat_amount AS "vatAmount",

      t.total_amount AS "totalAmount",
      t.customer_cash AS "customerCash",
      t.change_amount AS "changeAmount",

      t.notes,
      t.status,
      t.created_at AS "createdAt",

      t.void_reason AS "voidReason",
      CONCAT(u.first_name, ' ', u.last_name) AS "voidedBy",
      t.voided_at AS "voidedAt",

      COALESCE(
        json_agg(
          json_build_object(
            'transactionId', ti.transaction_id,
            'productId', ti.product_id,
            'productName', ti.product_name,
            'price', ti.price,
            'quantity', ti.quantity,
            'vatType', ti.vat_type,
            'subtotal', ti.subtotal
          )
        ) FILTER (WHERE ti.id IS NOT NULL),
        '[]'
      ) AS "items"

    FROM transactions t
    LEFT JOIN transaction_items ti ON ti.transaction_id = t.id
    LEFT JOIN users u ON u.id = t.handled_by::int
    LEFT JOIN products p ON p.id = ti.product_id

    ${whereClause}

    GROUP BY
      t.id,
      u.first_name,
      u.last_name

    ORDER BY t.created_at DESC
    LIMIT $${idx} OFFSET $${idx + 1}
    `,
    [...values, limit, offset],
  );

  return {
    transactions: result.rows,
    page,
    total,
    totalPages,
  };
};

export const getTransactionSummaryCardsService = async (branchId) => {
  const result = await pool.query(
    `
     WITH today_transactions AS (
        SELECT COUNT(*)::int AS transactions
        FROM transactions
        WHERE branch_id = $1
          AND created_at >= CURRENT_DATE
          AND created_at < CURRENT_DATE + INTERVAL '1 day'
          AND status = 'completed'
          AND payment_status = 'paid'
      ),

      yesterday_transactions AS (
        SELECT COUNT(*)::int AS transactions
        FROM transactions
        WHERE branch_id = $1
          AND created_at >= CURRENT_DATE - INTERVAL '1 day'
          AND created_at < CURRENT_DATE
          AND status = 'completed'
          AND payment_status = 'paid'
      ),

      today_items AS (
        SELECT COALESCE(SUM(ti.quantity), 0)::int AS total
        FROM transaction_items ti
        JOIN transactions t ON t.id = ti.transaction_id
        WHERE t.branch_id = $1
          AND t.status = 'completed'
          AND t.payment_status = 'paid'
          AND t.created_at >= CURRENT_DATE
          AND t.created_at < CURRENT_DATE + INTERVAL '1 day'
      ),

      yesterday_items AS (
        SELECT COALESCE(SUM(ti.quantity), 0)::int AS total
        FROM transaction_items ti
        JOIN transactions t ON t.id = ti.transaction_id
        WHERE t.branch_id = $1
          AND t.status = 'completed'
          AND t.payment_status = 'paid'
          AND t.created_at >= CURRENT_DATE - INTERVAL '1 day'
          AND t.created_at < CURRENT_DATE
      ),

      customers AS (
        SELECT COUNT(DISTINCT customer_name)::int AS total
        FROM transactions
        WHERE branch_id = $1
          AND status = 'completed'
      ),

      avg_order AS (
        SELECT 
          COALESCE(AVG(total_amount), 0) AS avg
        FROM transactions
        WHERE branch_id = $1
          AND created_at >= CURRENT_DATE
          AND created_at < CURRENT_DATE + INTERVAL '1 day'
          AND status = 'completed'
          AND payment_status = 'paid'
      )

      SELECT
        t.transactions AS "totalTransactionsToday",
        (t.transactions - y.transactions) AS "totalTransactionsDifferenceToday",
        ti.total AS "totalItemSalesToday",
        (ti.total - yi.total) AS "totalItemSalesDifferenceToday",
        c.total AS "totalCustomers",
        a.avg AS "totalAvgOrder"
      FROM today_transactions t
      CROSS JOIN yesterday_transactions y
      CROSS JOIN today_items ti
      CROSS JOIN yesterday_items yi
      CROSS JOIN customers c
      CROSS JOIN avg_order a;
    `,
    [branchId],
  );

  return result.rows[0];
};
