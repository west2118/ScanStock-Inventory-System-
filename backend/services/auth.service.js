import pool from "../config/db.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/token.js";
import dotenv from "dotenv";
import { hashToken } from "../utils/hash.js";

dotenv.config();

export const registerService = async ({
  branchId = null,
  firstName,
  lastName,
  email,
  password,
  role = "customer",
  status = "active",
}) => {
  const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [email.toLowerCase()]);
  if (existingUser.rowCount > 0) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
      INSERT INTO users (
        branch_id,
        first_name,
        last_name,
        email,
        password,
        role,
        status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING
        id,
        branch_id,
        first_name,
        last_name,
        email,
        role,
        status,
        email_verified,
        created_at
    `,
    [
      branchId,
      firstName,
      lastName,
      email.toLowerCase(),
      hashedPassword,
      role,
      status,
    ],
  );

  return result.rows[0];
};

export const loginService = async ({ email, password }) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  const user = rows[0];
  if (!user) throw new Error("Invalid email or password");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid email or password");

  if (user.status !== "active") {
    throw new Error("Account is inactive");
  }

  await pool.query(
    `
    UPDATE users
    SET last_login_at = NOW()
    WHERE id = $1
    `,
    [user.id],
  );

  const accessToken = createAccessToken({
    id: user.id,
    role: user.role,
    branchId: user.branch_id,
  });

  const refreshToken = createRefreshToken({
    id: user.id,
  });

  const hash = hashToken(refreshToken);

  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1,$2,NOW() + INTERVAL '7 days')`,
    [user.id, hash],
  );

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      role: user.role,
      branchId: user.branch_id,
    },
  };
};

export const revokeRefreshTokenService = async (refreshToken) => {
  const hash = hashToken(refreshToken);

  await pool.query(
    "UPDATE refresh_tokens SET revoked=true WHERE token_hash=$1",
    [hash],
  );
};

export const refreshTokenService = async (refreshToken) => {
  const payload = verifyRefreshToken(refreshToken);
  const oldHash = hashToken(refreshToken);

  const { rows } = await pool.query(
    `
    SELECT *
    FROM refresh_tokens
    WHERE token_hash = $1
      AND revoked = false
      AND expires_at > NOW()
    `,
    [oldHash],
  );

  if (!rows.length) {
    throw new Error("Invalid refresh token");
  }

  // Revoke old refresh token
  await pool.query(
    `
    UPDATE refresh_tokens
    SET revoked = true
    WHERE token_hash = $1
    `,
    [oldHash],
  );

  // GET LATEST USER DATA FROM DATABASE
  const { rows: userRows } = await pool.query(
    `
    SELECT
      id,
      role,
      branch_id,
      status
    FROM users
    WHERE id = $1
    `,
    [payload.id],
  );

  const user = userRows[0];

  if (!user) {
    throw new Error("User not found");
  }

  if (user.status !== "active") {
    throw new Error("Account is inactive");
  }

  // CREATE NEW ACCESS TOKEN USING CURRENT DATABASE DATA
  const newAccessToken = createAccessToken({
    id: user.id,
    role: user.role,
    branchId: user.branch_id,
  });

  // CREATE NEW REFRESH TOKEN
  const newRefreshToken = createRefreshToken({
    id: user.id,
  });

  const newHash = hashToken(newRefreshToken);

  await pool.query(
    `
    INSERT INTO refresh_tokens (
      user_id,
      token_hash,
      expires_at
    )
    VALUES (
      $1,
      $2,
      NOW() + INTERVAL '7 days'
    )
    `,
    [user.id, newHash],
  );

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const meService = async (userId) => {
  const { rows } = await pool.query(
    `
    SELECT 
      u.id,
      u.role,
      u.first_name AS "firstName",
      u.last_name AS "lastName",
      u.email,
      u.branch_id AS "branchId",
      b.branch_name AS "branchName"
    FROM users u
    LEFT JOIN branches b ON b.id = u.branch_id
    WHERE u.id = $1
    `,
    [userId],
  );

  return rows[0];
};
