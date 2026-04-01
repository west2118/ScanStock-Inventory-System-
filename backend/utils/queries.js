export const DATE_RANGE_CTE = `
WITH date_range AS (
  SELECT
    CASE 
      WHEN $1 = 'range' THEN $3::timestamptz
      WHEN $1 = 'daily' THEN DATE_TRUNC('day', base_date)
      WHEN $1 = 'weekly' THEN DATE_TRUNC('week', base_date)
      WHEN $1 = 'monthly' THEN DATE_TRUNC('month', base_date)
      WHEN $1 = 'quarterly' THEN DATE_TRUNC('quarter', base_date)
      WHEN $1 = 'yearly' THEN DATE_TRUNC('year', base_date)
    END AS start_date,

    CASE 
      WHEN $1 = 'range' THEN ($4::timestamptz + INTERVAL '1 day')
      WHEN $1 = 'daily' THEN DATE_TRUNC('day', base_date) + INTERVAL '1 day'
      WHEN $1 = 'weekly' THEN DATE_TRUNC('week', base_date) + INTERVAL '1 week'
      WHEN $1 = 'monthly' THEN DATE_TRUNC('month', base_date) + INTERVAL '1 month'
      WHEN $1 = 'quarterly' THEN DATE_TRUNC('quarter', base_date) + INTERVAL '3 months'
      WHEN $1 = 'yearly' THEN DATE_TRUNC('year', base_date) + INTERVAL '1 year'
    END AS end_date

  FROM (
    SELECT make_timestamptz(
      COALESCE($2::int, EXTRACT(YEAR FROM NOW())::int),
      EXTRACT(MONTH FROM NOW())::int,
      EXTRACT(DAY FROM NOW())::int,
      0,0,0
    ) AS base_date
  ) b
)
`;

export const SUMMARY_STATS_QUERY = `
${DATE_RANGE_CTE},

previous_range AS (
  SELECT
    (start_date - (end_date - start_date)) AS start_date,
    start_date AS end_date
  FROM date_range
),

-- 🔥 total stock (separate aggregation)
total_stock AS (
  SELECT COALESCE(SUM(stock), 0) AS total_stock
  FROM products
),

current_data AS (
  SELECT
    COALESCE(SUM(sm.quantity * sm.price) FILTER (WHERE sm.type = 'OUT'), 0) AS revenue,
    COALESCE(SUM(sm.quantity) FILTER (WHERE sm.type = 'IN'), 0) AS stock_in,
    COALESCE(SUM(sm.quantity) FILTER (WHERE sm.type = 'OUT'), 0) AS stock_out
  FROM stock_movements sm
  CROSS JOIN date_range dr
  WHERE sm.created_at >= dr.start_date
    AND sm.created_at < dr.end_date
),

previous_data AS (
  SELECT
    COALESCE(SUM(sm.quantity * sm.price) FILTER (WHERE sm.type = 'OUT'), 0) AS revenue,
    COALESCE(SUM(sm.quantity) FILTER (WHERE sm.type = 'IN'), 0) AS stock_in,
    COALESCE(SUM(sm.quantity) FILTER (WHERE sm.type = 'OUT'), 0) AS stock_out
  FROM stock_movements sm
  CROSS JOIN previous_range pr
  WHERE sm.created_at >= pr.start_date
    AND sm.created_at < pr.end_date
)

SELECT
  -- CURRENT VALUES
  c.revenue AS "totalRevenue",
  c.stock_in AS "stockIns",
  c.stock_out AS "stockOuts",

  -- TURNOVER
  ROUND(
    CASE 
      WHEN ts.total_stock = 0 THEN 0
      ELSE (c.stock_out / ts.total_stock::numeric) * 100
    END
  , 2) AS "turnover",

  -- % DIFFERENCES
  ROUND(
    CASE WHEN p2.revenue = 0 THEN 0
    ELSE ((c.revenue - p2.revenue) / p2.revenue::numeric) * 100
    END
  , 2) AS "revenueChange",

  ROUND(
    CASE WHEN p2.stock_in = 0 THEN 0
    ELSE ((c.stock_in - p2.stock_in) / p2.stock_in::numeric) * 100
    END
  , 2) AS "stockInChange",

  ROUND(
    CASE WHEN p2.stock_out = 0 THEN 0
    ELSE ((c.stock_out - p2.stock_out) / p2.stock_out::numeric) * 100
    END
  , 2) AS "stockOutChange",

  ROUND(
    CASE 
      WHEN ts.total_stock = 0 OR p2.stock_out = 0 THEN 0
      ELSE (
        ((c.stock_out / ts.total_stock::numeric) - 
         (p2.stock_out / ts.total_stock::numeric))
        / (p2.stock_out / ts.total_stock::numeric)
      ) * 100
    END
  , 2) AS "turnoverChange"

FROM current_data c
CROSS JOIN previous_data p2
CROSS JOIN total_stock ts
`;

export const getTimeSeriesQuery = (metric) => {
  const metricSelect = {
    revenue: `
        COALESCE(
        SUM(CASE 
                WHEN sm.type = 'OUT' 
                THEN sm.quantity * sm.price 
                ELSE 0 
            END), 
        0) AS value
    `,

    stocks: `
        COALESCE(SUM(CASE WHEN type = 'IN' THEN quantity ELSE 0 END), 0) AS "value1",
        COALESCE(SUM(CASE WHEN type = 'OUT' THEN quantity ELSE 0 END), 0) AS "value2"
    `,

    netChange: `
        ABS(
            COALESCE(
              SUM(CASE WHEN sm.type = 'IN' THEN sm.quantity ELSE 0 END) -
              SUM(CASE WHEN sm.type = 'OUT' THEN sm.quantity ELSE 0 END),
              0
            )
          ) AS value
    `,

    performance: `
        COALESCE(
          SUM(CASE 
                  WHEN sm.type = 'OUT' 
                  THEN sm.quantity * sm.price 
                  ELSE 0 
              END), 
        0) AS value1,
        COALESCE(SUM(CASE WHEN type = 'IN' THEN quantity ELSE 0 END), 0) AS value2,
        COALESCE(SUM(CASE WHEN type = 'OUT' THEN quantity ELSE 0 END), 0) AS value3
    `,
  };

  const joinItems =
    metric === "items"
      ? "LEFT JOIN transaction_items ti ON ti.transaction_id = sm.id"
      : "";

  return `
  ${DATE_RANGE_CTE},

  base AS (
    SELECT
      dr.start_date,
      dr.end_date,
      dr.end_date - dr.start_date AS range_diff
    FROM date_range dr
  ),

  series AS (

    -- NORMAL MODES (unchanged)
    SELECT
      generate_series(
        CASE
          WHEN $1 = 'daily'
            THEN dr.start_date + INTERVAL '7 hour'
          ELSE dr.start_date
        END,
        CASE
          WHEN $1 = 'daily'
            THEN dr.start_date + INTERVAL '18 hour'
          ELSE dr.end_date - INTERVAL '1 second'
        END,
        CASE
          WHEN $1 = 'daily' THEN INTERVAL '1 hour'
          WHEN $1 = 'weekly' THEN INTERVAL '1 day'
          WHEN $1 = 'monthly' THEN INTERVAL '1 week'
          WHEN $1 = 'quarterly' THEN INTERVAL '1 month'
          WHEN $1 = 'yearly' THEN INTERVAL '1 month'
        END
      ) AS slot,
      NULL::timestamp AS period_end,
      NULL::interval AS range_diff
    FROM date_range dr
    WHERE $1 <> 'range'

    UNION ALL

    -- RANGE MODE (AUTO GROUPING)

    -- DAILY (≤ 15 days)
    SELECT
      gs AS slot,
      LEAST(gs + INTERVAL '1 day', b.end_date) AS period_end,
      b.range_diff
    FROM base b,
    LATERAL generate_series(
      b.start_date,
      b.end_date - INTERVAL '1 second',
      INTERVAL '1 day'
    ) gs
    WHERE $1 = 'range'
      AND b.range_diff <= INTERVAL '15 days'

    UNION ALL

    -- WEEKLY (≤ 90 days)
    SELECT
      gs AS slot,
      LEAST(gs + INTERVAL '1 week', b.end_date) AS period_end,
      b.range_diff
    FROM base b,
    LATERAL generate_series(
      b.start_date,
      b.end_date - INTERVAL '1 second',
      INTERVAL '1 week'
    ) gs
    WHERE $1 = 'range'
      AND b.range_diff > INTERVAL '15 days'
      AND b.range_diff <= INTERVAL '90 days'

    UNION ALL

    -- MONTHLY (≤ 2 years)
    SELECT
      CASE
        WHEN gs = DATE_TRUNC('month', b.start_date)
          THEN b.start_date
        ELSE gs
      END AS slot,
      LEAST(
        DATE_TRUNC('month', gs) + INTERVAL '1 month',
        b.end_date
      ) AS period_end,
      b.range_diff
    FROM base b,
    LATERAL generate_series(
      DATE_TRUNC('month', b.start_date),
      DATE_TRUNC('month', b.end_date),
      INTERVAL '1 month'
    ) gs
    WHERE $1 = 'range'
      AND b.range_diff > INTERVAL '90 days'
      AND b.range_diff <= INTERVAL '2 years'

    UNION ALL

    -- YEARLY (> 2 years)
    SELECT
      CASE
        WHEN gs = DATE_TRUNC('year', b.start_date)
          THEN b.start_date
        ELSE gs
      END AS slot,
      LEAST(
        DATE_TRUNC('year', gs) + INTERVAL '1 year',
        b.end_date
      ) AS period_end,
      b.range_diff
    FROM base b,
    LATERAL generate_series(
      DATE_TRUNC('year', b.start_date),
      DATE_TRUNC('year', b.end_date),
      INTERVAL '1 year'
    ) gs
    WHERE $1 = 'range'
      AND b.range_diff > INTERVAL '2 years'
  )

  SELECT
    CASE
      WHEN $1 = 'daily' THEN TO_CHAR(slot, 'FMHH12AM')
      WHEN $1 = 'weekly' THEN TO_CHAR(slot, 'Dy')
      WHEN $1 = 'monthly' THEN 'Week ' || ROW_NUMBER() OVER (ORDER BY slot)
      WHEN $1 = 'quarterly' THEN TO_CHAR(slot, 'Mon')
      WHEN $1 = 'yearly' THEN TO_CHAR(slot, 'Mon')

      WHEN $1 = 'range' THEN
        CASE
          WHEN range_diff <= INTERVAL '15 days'
            THEN TO_CHAR(slot, 'Mon FMDD')
          WHEN range_diff <= INTERVAL '90 days'
            THEN 'Week ' || ROW_NUMBER() OVER (ORDER BY slot)
          WHEN range_diff <= INTERVAL '2 years'
            THEN TO_CHAR(slot, 'Mon YYYY')
          ELSE TO_CHAR(slot, 'YYYY')
        END
    END AS label,

    CASE
      WHEN $1 = 'daily' THEN
        TO_CHAR(slot, 'FMHH12:MI AM')
        || ' - ' ||
        TO_CHAR(slot + INTERVAL '59 minutes', 'FMHH12:MI AM')

      WHEN $1 = 'weekly' THEN
        TO_CHAR(slot, 'Mon DD, YYYY')

      WHEN $1 = 'monthly' THEN
        TO_CHAR(slot, 'Mon DD')
        || ' - ' ||
        TO_CHAR(
          LEAST(
            slot + INTERVAL '6 days',
            DATE_TRUNC('month', slot) + INTERVAL '1 month - 1 day'
          ),
          'Mon DD, YYYY'
        )

      WHEN $1 = 'quarterly' THEN
        TO_CHAR(slot, 'Mon DD')
        || ' - ' ||
        TO_CHAR(slot + INTERVAL '1 month - 1 day', 'Mon DD, YYYY')

      WHEN $1 = 'yearly' THEN
        TO_CHAR(slot, 'Mon DD')
        || ' - ' ||
        TO_CHAR(slot + INTERVAL '1 month - 1 day', 'Mon DD, YYYY')

      WHEN $1 = 'range' THEN
        CASE
          WHEN range_diff <= INTERVAL '15 days'
            THEN TO_CHAR(slot, 'Mon DD, YYYY')
          ELSE
            TO_CHAR(slot, 'Mon DD')
            || ' - ' ||
            TO_CHAR(period_end - INTERVAL '1 day', 'Mon DD, YYYY')
        END
    END AS date,

    ${metricSelect[metric]}

  FROM series s
  LEFT JOIN stock_movements sm
    ON sm.created_at >= s.slot
    AND sm.created_at <
      CASE
        WHEN $1 = 'range'
          THEN s.period_end
        ELSE s.slot +
          CASE
            WHEN $1 = 'daily' THEN INTERVAL '1 hour'
            WHEN $1 = 'weekly' THEN INTERVAL '1 day'
            WHEN $1 = 'monthly' THEN
              LEAST(
                slot + INTERVAL '1 week',
                DATE_TRUNC('month', slot) + INTERVAL '1 month'
              ) - slot
            WHEN $1 = 'quarterly' THEN INTERVAL '1 month'
            WHEN $1 = 'yearly' THEN INTERVAL '1 month'
          END
      END

  ${joinItems}

  GROUP BY s.slot, s.range_diff, s.period_end
  ORDER BY s.slot;
  `;
};

export const CATEGORY_PERFORMANCE_QUERY = `
${DATE_RANGE_CTE}

SELECT
  p.category AS "name",
  SUM(sm.quantity)::int AS value1,
  SUM(sm.quantity * sm.price)::int AS value2
FROM stock_movements sm
JOIN products p ON p.id = sm.product_id
CROSS JOIN date_range dr
WHERE sm.type = 'OUT'
  AND sm.created_at >= dr.start_date
  AND sm.created_at < dr.end_date
GROUP BY p.category
ORDER BY value1 DESC;
`;

export const LOW_STOCK_QUERY = `
SELECT
  id,
  sku,
  product_name AS "productName",
  stock,
  stock_low AS "stockLow",
  stock_critical AS "stockCritical"
FROM products
WHERE stock <= stock_low
ORDER BY stock ASC
LIMIT 5
`;

export const TOP_PERFORMING_PRODUCTS_QUERY = `
${DATE_RANGE_CTE}

SELECT
  p.id,
  p.product_name AS "productName",
  p.sku,
  p.stock,

  COALESCE(
    SUM(CASE WHEN sm.type = 'OUT' THEN sm.quantity ELSE 0 END), 
    0
  ) AS "sales",

  COALESCE(
    SUM(CASE 
      WHEN sm.type = 'OUT' 
      THEN sm.quantity * sm.price 
      ELSE 0 
    END), 
    0
  ) AS "revenue",

  ROUND(
    CASE 
      WHEN p.stock = 0 THEN 0
      ELSE 
        (
          COALESCE(
            SUM(sm.quantity) FILTER (WHERE sm.type = 'OUT'), 
            0
          ) / p.stock::numeric
        ) * 100
    END
  , 2)::int AS "turnover"

FROM products p

CROSS JOIN date_range dr

LEFT JOIN stock_movements sm 
  ON sm.product_id = p.id
  AND sm.created_at >= dr.start_date
  AND sm.created_at < dr.end_date

GROUP BY p.id, p.product_name, p.sku, p.stock
ORDER BY "sales" DESC
LIMIT 5
`;

export const STOCK_CATEGORY_QUERY = `
SELECT
  category AS "label",
  COALESCE(SUM(stock), 0) AS "value"
FROM products
GROUP BY "label"
ORDER BY "value" DESC
LIMIT 5
`;

export const INVENTORY_METRICS_QUERY = `
${DATE_RANGE_CTE}

SELECT
  p.product_name AS "productName",
  p.stock,

  COALESCE(p.stock * p.price, 0) AS "stockValue",

  COALESCE(
    SUM(sm.quantity) FILTER (WHERE sm.type = 'OUT'),
    0
  ) AS "sales",

  ROUND(
    CASE 
      WHEN p.stock = 0 THEN 0
      ELSE 
        (
          COALESCE(
            SUM(sm.quantity) FILTER (WHERE sm.type = 'OUT'), 
            0
          ) / p.stock::numeric
        ) * 100
    END
  , 2)::int AS "turnover"

  FROM products p

  CROSS JOIN date_range dr

  LEFT JOIN stock_movements sm 
    ON sm.product_id = p.id
    AND sm.created_at >= dr.start_date
    AND sm.created_at < dr.end_date

  GROUP BY p.product_name, p.stock, p.price
  ORDER BY "sales" DESC
  LIMIT 5
`;
