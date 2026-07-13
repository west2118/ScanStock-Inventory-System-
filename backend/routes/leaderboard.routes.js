import express from "express";
import { getLeaderboardData } from "../controllers/v2/leaderboard.controller.js";

const router = express.Router();

router.get("/leaderboards", getLeaderboardData);

export default router;
