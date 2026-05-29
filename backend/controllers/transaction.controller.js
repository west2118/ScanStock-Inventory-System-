import pool from "../config/db.js";
import {
  createTransactionFlowService,
  getTransactionsService,
  getTransactionSummaryCardsService,
} from "../services/transaction.service.js";

// Create Transaction
export const createTransaction = async (req, res) => {
  const data = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const transaction = await createTransactionFlowService(client, data);

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      message: "Transaction completed successfully!",
    });
  } catch (error) {
    console.log(error);

    await client.query("ROLLBACK");

    res.status(500).json({
      message: error.message || "Failed to make transaction",
    });
  } finally {
    client.release();
  }
};

// Transaction Summary Cards
export const getTransactionSummaryCards = async (req, res) => {
  const { branchId } = req.user;

  try {
    const result = await getTransactionSummaryCardsService(branchId);

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to void transaction" });
  }
};

// Get Transactions (with pagination)
export const getTransactions = async (req, res) => {
  const { branchId } = req.user;

  try {
    const { page = 1, limit = 10, search = "", status } = req.query;

    const user = req.user;

    const result = await getTransactionsService({
      page: Number(page),
      limit: Number(limit),
      search,
      status,
      user,
      branchId,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch transactions",
    });
  }
};
