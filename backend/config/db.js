import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,

  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("connect", async (client) => {
  await client.query(`SET TIME ZONE 'Asia/Manila'`);
  console.log("Connection pool established with Database");
});

export default pool;
