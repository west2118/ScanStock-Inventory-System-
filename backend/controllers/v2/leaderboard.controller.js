import pool from "../../config/db.js";
import { getLeaderboardDataService } from "../../services/leaderboard.service.js";


export const getLeaderboardData = async (req, res) => {
    const client = await pool.connect();

    try {
        const data = await getLeaderboardDataService(client);

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
