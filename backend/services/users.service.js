import bcrypt from "bcrypt";
import { countQuery, usersQuery } from "../utils/queries/users.queries.js";
import pool from "../config/db.js";

export const getUsersService = async (
    client,
    { page = 1, limit = 10, search, status, role, branchId },
) => {
    const offset = (page - 1) * limit;

    const conditions = [];
    const values = [];
    let idx = 1;

    /* -------------------- SEARCH -------------------- */
    if (search) {
        conditions.push(`
      (
        u.id::text ILIKE $${idx}
        OR u.email ILIKE $${idx}
        OR CONCAT(u.first_name, ' ', u.last_name) ILIKE $${idx}
        OR u.role ILIKE $${idx}
        OR u.status ILIKE $${idx}
        OR b.branch_name ILIKE $${idx}
      )
    `);

        values.push(`%${search}%`);
        idx++;
    }

    /* -------------------- STATUS FILTER -------------------- */
    if (status) {
        conditions.push(`u.status = $${idx}`);
        values.push(status);
        idx++;
    }

    /* -------------------- ROLE FILTER -------------------- */
    if (role) {
        conditions.push(`u.role = $${idx}`);
        values.push(role);
        idx++;
    }

    /* -------------------- BRANCH FILTER -------------------- */
    if (branchId) {
        conditions.push(`u.branch_id = $${idx}`);
        values.push(branchId);
        idx++;
    }

    const whereClause =
        conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    /* -------------------- DATA client -------------------- */
    const [usersResult, countResult] = await Promise.all([
        client.query(usersQuery(whereClause, idx), [...values, limit, offset]),
        client.query(countQuery(whereClause), values),
    ]);

    const total = countResult.rows[0].total;
    const totalPages = Math.ceil(total / limit);

    return {
        users: usersResult.rows,
        pagination: {
            page,
            limit,
            total,
            totalPages,
        },
    };
};

export const getUsersSummaryStatsService = async () => {
    const query = `
    SELECT
      COUNT(*)::int AS "totalUsers",

      COUNT(*) FILTER (WHERE status = 'active')::int AS "activeUsers",
      COUNT(*) FILTER (WHERE status = 'inactive')::int AS "inactiveUsers",
      
      COUNT(*) FILTER (WHERE role = null)::int AS "unassigned",

      COUNT(*) FILTER (WHERE role = 'central_admin')::int AS "centralAdmins",
      COUNT(*) FILTER (WHERE role = 'admin')::int AS "admins",
      COUNT(*) FILTER (WHERE role = 'branch_manager')::int AS "branchManagers",
      COUNT(*) FILTER (WHERE role = 'inventory_staff')::int AS "inventoryStaff",
      COUNT(*) FILTER (WHERE role = 'cashier')::int AS "cashiers"

    FROM users
  `;

    const { rows } = await pool.query(query);

    return rows[0];
};

export const createUserService = async ({
    branchId,
    name,
    username,
    email,
    password,
    confirmPassword,
    role,
    contact,
}) => {
    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    const existingUser = await pool.query(
        `
    SELECT id
    FROM users
    WHERE email = $1
       AND status <> 'archived'
  `,
        [email],
    );

    if (existingUser.rows.length > 0) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nameParts = (name || "").split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || " ";

    const result = await pool.query(
        `
    INSERT INTO users (
      branch_id,
      first_name,
      last_name,
      email,
      password,
      role
    )
    VALUES ($1, $2, $3, $4, $5, $6)

    RETURNING
      id,
      branch_id AS "branchId",
      first_name,
      last_name,
      email,
      role,
      status
  `,
        [
            branchId,
            firstName,
            lastName,
            email,
            hashedPassword,
            role || "cashier",
        ],
    );

    return result.rows[0];
};

export const updateUserService = async ({
    id,
    branchId,
    name,
    username,
    email,
    role,
    status,
    contact,
}) => {
    const existingUser = await pool.query(
        `
    SELECT id
    FROM users
    WHERE id = $1
        AND status <> 'archived'
  `,
        [id],
    );

    if (existingUser.rows.length === 0) {
        throw new Error("User not found");
    }

    const duplicateUser = await pool.query(
        `
    SELECT id
    FROM users
    WHERE email = $1
      AND id <> $2
      AND status <> 'archived'
  `,
        [email, id],
    );

    if (duplicateUser.rows.length > 0) {
        throw new Error("Email already exists");
    }

    const nameParts = (name || "").split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || " ";

    const result = await pool.query(
        `
    UPDATE users
    SET
      branch_id = $1,
      first_name = $2,
      last_name = $3,
      email = $4,
      role = $5,
      status = $6
    WHERE id = $7

    RETURNING
      id,
      branch_id AS "branchId",
      first_name,
      last_name,
      email,
      role,
      status
  `,
        [branchId, firstName, lastName, email, role, status, id],
    );

    return result.rows[0];
};

export const disabledUserService = async (id) => {
    const result = await pool.query(
        `
    UPDATE users
    SET status = 'inactive'
    WHERE id = $1

    RETURNING
      id,
      name,
      status
  `,
        [id],
    );

    if (result.rows.length === 0) {
        throw new Error("User not found");
    }

    return result.rows[0];
};

export const deleteUserService = async (id) => {
    const result = await pool.query(
        `
    UPDATE users
    SET status = 'archived'
    WHERE id = $1

    RETURNING
      id,
      name,
      status
  `,
        [id],
    );

    if (result.rows.length === 0) {
        throw new Error("User not found");
    }

    return result.rows[0];
};

export const resetPasswordService = async ({ id, password }) => {
    const existingUser = await pool.query(
        `
    SELECT id
    FROM users
    WHERE id = $1
      AND status <> 'archived'
    `,
        [id],
    );

    if (existingUser.rows.length === 0) {
        throw new Error("User not found");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `
    UPDATE users
    SET password = $1
    WHERE id = $2

    RETURNING
      id,
      username,
      email
    `,
        [hashedPassword, id],
    );

    return result.rows[0];
};
