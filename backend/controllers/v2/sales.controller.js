import pool from "../../config/db.js";
import { getSalesDataService } from "../../services/sales.service.js";


export const getSalesData = async (req, res) => {
    const client = await pool.connect();

    try {
        const data = await getSalesDataService(client);

        return res.status(200).json(data);
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch branches",
        });
    } finally {
        client.release();
    }
};
