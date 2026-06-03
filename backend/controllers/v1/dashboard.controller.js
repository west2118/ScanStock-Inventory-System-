import pool from "../../config/db.js";
import {
  getDashboardChartsService,
  getDashboardSummaryStatsService,
} from "../../services/dashboard.service.js";

export const getDashboardData = async (req, res) => {
  const client = await pool.connect();

  const { branchId } = req.user;

  try {
    const [summary, charts] = await Promise.all([
      getDashboardSummaryStatsService(client, branchId),
      getDashboardChartsService(client, branchId),
    ]);

    res.status(200).json({
      summary,
      charts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard data",
    });
  } finally {
    client.release();
  }
};
