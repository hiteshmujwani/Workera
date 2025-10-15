import express from "express";
import {
  registerCandidate,
  loginCandidate,
} from "../controllers/candidateController.js";

const router = express.Router();

// POST /api/candidate/register
router.post("/register", registerCandidate);

// POST /api/candidate/login
router.post("/login", loginCandidate);

// verify-otp, me, and logout routes moved to universal userRoutes.js

export default router;
