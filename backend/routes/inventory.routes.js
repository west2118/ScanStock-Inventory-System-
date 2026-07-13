import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authRole.js";
import { getInventoryData } from "../controllers/v2/inventory.controller.js";

const router = express.Router();

router.get(
    "/inventory",
    verifyToken,
    authorizeRoles("central_admin"),
    getInventoryData,
);
export default router;
