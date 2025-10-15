import express from "express";
import {
  registerEmployer,
  loginEmployer,
} from "../controllers/employerController.js";

const router = express.Router();

// POST /api/v1/employer/register
router.post("/register", registerEmployer);

// POST /api/v1/employer/login
router.post("/login", loginEmployer);

// verify-otp, me, and logout routes are handled by universal userRoutes.js

export default router;
