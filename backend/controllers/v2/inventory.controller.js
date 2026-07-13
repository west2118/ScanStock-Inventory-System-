import pool from "../../config/db.js";
import { getInventoryDataService } from "../../services/inventory.service.js";

export const getInventoryData = async (req, res) => {
    const client = await pool.connect();

    try {
        const data = await getInventoryDataService(client);

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
