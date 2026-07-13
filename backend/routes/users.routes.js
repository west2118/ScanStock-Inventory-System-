import express from "express";
import {
    createUser,
    deleteUser,
    disabledUser,
    getUsers,
    getUsersSummaryStats,
    resetPassword,
    updateUser,
} from "../controllers/v2/users.controller.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users-stats", getUsersSummaryStats);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.patch("/users/:id/disable", disabledUser);
router.patch("/users/:id/archive", deleteUser);
router.patch("/users/:id/reset-password", resetPassword);

export default router;
