import pool from "../../config/db.js";
import {
    getDashboardChartsService,
    getDashboardSummaryStatsService,
    getDashboardDataService
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
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch dashboard data",
        });
    } finally {
        client.release();
    }
};

export const getDashboardBranchPulseData = async (req, res) => {
    const client = await pool.connect();

    try {
        const data = await getDashboardDataService(client);

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch branches",
        });
    } finally {
        client.release();
    }
};
