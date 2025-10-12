import express from "express";
import {
  registerCandidate,
  loginCandidate,
  verifyOTP,
  getCandidate,
  logoutCandidate,
} from "../controllers/candidateController.js";

const router = express.Router();

// POST /api/candidate/register
router.post("/register", registerCandidate);

// Verify OTP → mark verified, create profile
router.post("/verify-otp", verifyOTP);

// POST /api/candidate/login
router.post("/login", loginCandidate);

// GET /api/candidate/me
router.get("/me", getCandidate);

// POST /api/candidate/logout
router.post("/logout", logoutCandidate);

export default router;
