import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import stockMovementRoutes from "./routes/stock.movement.routes.js";
import reportRoutes from "./routes/report.route.js";
import branchRoutes from "./routes/branch.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import brandRoutes from "./routes/brand.routes.js";
import stockAdjustmentRoutes from "./routes/stock.adjustment.routes.js";

import createProductTable from "./data/createProductTable.js";
import createStockMovementTable from "./data/createStockMovement.js";
import createBranchTable from "./data/createBranchTable.js";
import createBranchInventoryTable from "./data/createBranchInventoryTable.js";
import createTransactionTable from "./data/createTransactionTable.js";
import createTransactionItemTable from "./data/createTransactionItemTable.js";
import createUserTable from "./data/createUserTable.js";
import createRefreshTokenTable from "./data/createRefreshTokenTable.js";
import createBrandTable from "./data/createBrandTable.js";
import createCategoryTable from "./data/createCategory.js";
import createProductImagesTable from "./data/createProductImages.js";
import createProductSpecificationsTable from "./data/createProductSpecification.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { apiLimiter } from "./utils/apiLimiter.js";
import createStockAdjustmentTable from "./data/createStockAdjustmentTable.js";
import createStockAdjustmentItemTable from "./data/createStockAdjustmentItemTable.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(compression());

app.use("/api", apiLimiter);

// Routes
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", stockMovementRoutes);
app.use("/api", reportRoutes);
app.use("/api", transactionRoutes);

app.use("/api", categoryRoutes);
app.use("/api", brandRoutes);
app.use("/api", branchRoutes);
app.use("/api", stockAdjustmentRoutes);

app.use("/api", dashboardRoutes);

app.use(errorHandler);

// Create table before starting server
createBranchInventoryTable();
// createProductTable();
createBranchTable();
// createUserTable();
// createRefreshTokenTable();
// createStockMovementTable();
// createTransactionTable();
// createTransactionItemTable();
// createBrandTable();
// createCategoryTable();
// createProductImagesTable();
// createProductSpecificationsTable();
createStockAdjustmentTable();
createStockAdjustmentItemTable();
createStockMovementTable();

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
