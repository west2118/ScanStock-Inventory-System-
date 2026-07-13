import pool from "../config/db.js";

export const createBranchService = async (data) => {
  const {
    branchName,
    branchCode,
    branchType,
    region,
    address,
    openingTime,
    closingTime,
  } = data;

  const query = `
    INSERT INTO branches (
      branch_name,
      branch_code,
      branch_type,
      region,
      address,
      opening_time,
      closing_time
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *;
  `;

  const values = [
    branchName,
    branchCode,
    branchType,
    region,
    address,
    openingTime,
    closingTime,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const updateBranchService = async (id, data) => {
  const {
    branchName,
    branchCode,
    branchType,
    region,
    address,
    status,
    openingTime,
    closingTime,
  } = data;

  const { rows } = await pool.query(
    `
      UPDATE branches
      SET
        branch_name = $1,
        branch_code = $2,
        branch_type = $3,
        region = $4,
        address = $5,
        status = $6,
        opening_time = $7,
        closing_time = $8,
        updated_at = NOW()
      WHERE id = $9
      RETURNING *;
    `,
    [
      branchName,
      branchCode,
      branchType,
      region,
      address,
      status,
      openingTime,
      closingTime,
      id,
    ],
  );

  return rows[0];
};

export const deleteBranchService = async (id) => {
  const { rows } = await pool.query(
    `
      UPDATE branches
      SET status = 'archived'
      WHERE id = $1;
    `,
    [id],
  );

  return rows[0];
};

export const getBranchByIdService = async (id) => {
  const { rows } = await pool.query(
    `
      SELECT *
      FROM branches
      WHERE id = $1
    `,
    [id],
  );

  return rows[0];
};

// ----------- FIXING THE TOP ------------------

export const getBranchOptionsService = async () => {
  const result = await pool.query(`
    SELECT
      id,
      branch_name AS "branchName"
    FROM branches
    ORDER BY branch_name ASC
  `);

  return result.rows;
};

export const getBranchesService = async ({
  page = 1, limit = 10, search, status, region
} = {}) => {
  const offset = (page - 1) * limit;

  const conditions = [];
  const values = [];
  let idx = 1;

  /* -------------------- SEARCH -------------------- */
  if (search) {
    conditions.push(`
      (
        b.branch_name ILIKE $${idx}
        OR b.branch_code ILIKE $${idx}
        OR b.address ILIKE $${idx}
        OR b.region ILIKE $${idx}
        OR CONCAT(u.first_name, ' ', u.last_name) ILIKE $${idx}
      )
    `);

    values.push(`%${search}%`);
    idx++;
  }

  /* -------------------- STATUS FILTER -------------------- */
  if (status) {
    conditions.push(`b.status = $${idx}`);
    values.push(status);
    idx++;
  }

  /* -------------------- REGION FILTER -------------------- */
  if (region) {
    conditions.push(`b.region = $${idx}`);
    values.push(region);
    idx++;
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const branchesQuery = `
    WITH BranchSales AS (
      SELECT
        branch_id,
        SUM(total_amount) AS total_sales
      FROM transactions
      WHERE status = 'completed'
      GROUP BY branch_id
    ),
    BranchOrders AS (
      SELECT branch_id, SUM(total_amount) AS total_sales
      FROM orders
      WHERE order_status IN ('delivered', 'completed')
        AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
      GROUP BY branch_id
    ),

    inventory AS (
      SELECT
        branch_id,
        SUM(stock) AS total_inventory
      FROM branch_inventory
      GROUP BY branch_id
    )

    SELECT
      b.id,
      b.region,
      b.branch_name AS "branchName",
      b.branch_code AS "branchCode",
      b.address AS location,
      b.opening_time AS "openingTime",
      b.closing_time AS "closingTime",
      b.contact,
      b.status,
      b.created_at AS "createdAt",

      CASE 
        WHEN b.manager_id IS NOT NULL THEN
          json_build_object(
            'id', b.manager_id,
            'name', NULLIF(TRIM(CONCAT(u.first_name, ' ', u.last_name)), ''),
            'email', NULLIF(u.email, '')
          )
        ELSE NULL
      END AS manager,

      COALESCE(
        CASE WHEN b.branch_name ILIKE '%Central%' THEN o.total_sales
        ELSE s.total_sales END,
      0) AS "totalSales",
      COALESCE(i.total_inventory, 0) AS "totalInventory"

    FROM branches b

    LEFT JOIN users u
      ON u.id = b.manager_id

    LEFT JOIN BranchSales s
      ON s.branch_id = b.id

    LEFT JOIN BranchOrders o
      ON o.branch_id = b.id

    LEFT JOIN inventory i
      ON i.branch_id = b.id

    ${whereClause}

    ORDER BY "totalSales" DESC

    LIMIT $${idx}
    OFFSET $${idx + 1}
  `;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM branches b
    LEFT JOIN users u
      ON u.id = b.manager_id
    ${whereClause}
  `;

  const [branchesResult, countResult] = await Promise.all([
    pool.query(branchesQuery, [...values, limit, offset]),
    pool.query(countQuery, values),
  ]);

  const total = Number(countResult.rows[0].total);
  const totalPages = Math.ceil(total / limit);

  return {
    branches: branchesResult.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

export const getBranchesSummaryStatsService = async () => {
  const summaryResult = await pool.query(`
    SELECT 
      (SELECT COUNT(*) FROM branches)::int AS "totalBranches",
      (
        (SELECT COALESCE(SUM(total_amount), 0) FROM transactions WHERE status = 'completed')
        +
        (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE order_status IN ('delivered', 'completed') AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid'))
      )::int AS "totalSales",
      (SELECT COALESCE(SUM(stock), 0) FROM branch_inventory)::int AS "totalStocks"
  `);

  return summaryResult.rows[0];
};

export const getBranchesChartsService = async (client) => {
  const salesQuery = `
    WITH BranchSales AS (
        SELECT branch_id, SUM(total_amount) AS total_sales
        FROM transactions
        WHERE status = 'completed'
        GROUP BY branch_id
    ),
    BranchOrders AS (
        SELECT branch_id, SUM(total_amount) AS total_sales
        FROM orders
        WHERE order_status IN ('delivered', 'completed')
          AND EXISTS (SELECT 1 FROM order_payments op WHERE op.order_id = orders.id AND op.payment_status = 'paid')
        GROUP BY branch_id
    )
    SELECT
      b.branch_name AS name,
      COALESCE(
          CASE WHEN b.branch_name ILIKE '%Central%' THEN o.total_sales
          ELSE s.total_sales END,
      0)::int AS value
    FROM branches b
    LEFT JOIN BranchSales s ON s.branch_id = b.id
    LEFT JOIN BranchOrders o ON o.branch_id = b.id
    ORDER BY value DESC;
  `;

  const stocksQuery = `
    SELECT
      b.region AS name,
      COALESCE(SUM(bi.stock), 0)::int AS value
    FROM branches b
    LEFT JOIN branch_inventory bi ON bi.branch_id = b.id
    GROUP BY b.region
    ORDER BY value DESC;
  `;

  const [salesResult, stocksResult] = await Promise.all([
    client.query(salesQuery),
    client.query(stocksQuery),
  ]);

  return {
    salesDistribution: salesResult.rows,
    stockDistribution: stocksResult.rows,
  };
};
