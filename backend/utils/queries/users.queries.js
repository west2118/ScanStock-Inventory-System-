export const usersQuery = (whereClause, idx) => `
    SELECT
      u.id,
      u.branch_id AS "branchId",
      CONCAT(u.first_name, ' ', u.last_name) AS name,
      u.email AS username,
      u.role,
      u.status,
      u.email,
      '' AS contact,

      b.branch_name AS "branchName",
      b.branch_code AS "branchCode"

    FROM users u
    LEFT JOIN branches b
      ON b.id = u.branch_id

    ${whereClause}

    ORDER BY u.id DESC
    LIMIT $${idx}
    OFFSET $${idx + 1}
  `;

export const countQuery = (whereClause) => `
    SELECT COUNT(*)::int AS total

    FROM users u
    LEFT JOIN branches b
      ON b.id = u.branch_id

    ${whereClause}
  `;
