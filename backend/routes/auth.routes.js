import express from "express";
import {
  login,
  logout,
  refresh,
  register,
  me,
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", verifyToken, me);

export default router;
