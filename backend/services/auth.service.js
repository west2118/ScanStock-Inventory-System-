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

export const registerService = async (
  name,
  username,
  role,
  status,
  password,
) => {
  const hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users(username, password, name, role, status) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [username, hash, name, role, status],
  );

  return result.rows[0];
};

export const loginService = async ({ username, password }) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  const user = rows[0];
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Password not matched!");

  const accessToken = createAccessToken({ id: user.id, role: user.role });
  const refreshToken = createRefreshToken(user);

  const hash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1,$2,NOW() + INTERVAL '7 days')`,
    [user.id, hash],
  );

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, name: user.name, role: user.role },
  };
};

export const refreshTokenService = async (refreshToken) => {
  const payload = verifyRefreshToken(refreshToken);
  const hash = hashToken(refreshToken);

  const { rows } = await pool.query(
    "SELECT * FROM refresh_tokens WHERE token_hash=$1 AND revoked=false",
    [hash],
  );

  if (!rows.length) throw new Error("Invalid refresh token");

  return createAccessToken({ id: payload.id, role: payload.role });
};

export const revokeRefreshTokenService = async (refreshToken) => {
  const hash = hashToken(refreshToken);

  await pool.query(
    "UPDATE refresh_tokens SET revoked=true WHERE token_hash=$1",
    [hash],
  );
};

export const meService = async (userId) => {
  const { rows } = await pool.query(
    "SELECT id, role, name FROM users WHERE id=$1",
    [userId],
  );

  return rows[0];
};
