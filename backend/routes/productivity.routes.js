import express from "express";
import { getProductivityData } from "../controllers/v2/productivity.controller.js";

const router = express.Router();

router.get("/productivity", getProductivityData);

export default router;
