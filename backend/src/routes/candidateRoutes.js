import express from "express";
import {
  registerCandidate,
  loginCandidate,
  verifyOTP,
  getCandidate,
} from "../controllers/candidateController.js";

const router = express.Router();

// POST /api/candidate/register
router.post("/register", registerCandidate);

// Verify OTP → mark verified, create profile
router.post("/verify-otp", verifyOTP);

// POST /api/candidate/login
router.post("/login", loginCandidate);

// POST /api/candidate/me
router.get("/me", getCandidate);

export default router;
