import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authRole.js";
import { createBranch } from "../controllers/branch.controller.js";

const router = express.Router();

router.post("/branches", createBranch);

export default router;
