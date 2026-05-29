import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import stockMovementRoutes from "./routes/stock.movement.routes.js";
import reportRoutes from "./routes/report.route.js";
import branchRoutes from "./routes/branch.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";

import createProductTable from "./data/createProductTable.js";
import createStockMovementTable from "./data/createStockMovement.js";
import createBranchTable from "./data/createBranchTable.js";
import createBranchInventoryTable from "./data/createBranchInventoryTable.js";
import createTransactionTable from "./data/createTransactionTable.js";
import createTransactionItemTable from "./data/createTransactionItemTable.js";
import createUserTable from "./data/createUserTable.js";
import createRefreshTokenTable from "./data/createRefreshTokenTable.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Routes
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", stockMovementRoutes);
app.use("/api", reportRoutes);
app.use("/api", branchRoutes);
app.use("/api", transactionRoutes);

// Create table before starting server
createBranchInventoryTable();
createProductTable();
// createBranchTable();
// createUserTable();
// createRefreshTokenTable();
// createStockMovementTable();
createTransactionTable();
createTransactionItemTable();

// Testing postgres
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`✅ Database connected: ${result.rows[0].current_database}`);
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    res.status(500).send("Database not connected");
  }
});

// Server running
app.listen(port, () => {
  console.log(`Server is running on local: ${port}`);
});
