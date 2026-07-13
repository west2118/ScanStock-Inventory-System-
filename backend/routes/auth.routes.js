import express from "express";
import { verifyToken, optionalVerifyToken } from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validations/user.validation.js";
import {
  register,
  login,
  logout,
  refresh,
  me,
} from "../controllers/v2/auth.controller.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", optionalVerifyToken, me);

export default router;
