import express from "express";
import { getSalesData } from "../controllers/v2/sales.controller.js";

const router = express.Router();

router.get("/sales", getSalesData);

export default router;
