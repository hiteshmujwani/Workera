import express from "express";
import {
  getUser,
  logoutUser,
  verifyOTP,
  authenticateToken,
} from "../controllers/userController.js";

const router = express.Router();

// POST /api/v1/user/verify-otp - Universal OTP verification
router.post("/verify-otp", verifyOTP);

// GET /api/v1/user/me - Universal user data
router.get("/me", authenticateToken, getUser);

// POST /api/v1/user/logout - Universal logout
router.post("/logout", authenticateToken, logoutUser);

export default router;
