import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getEmployerJobs,
  applyToJob,
} from "../controllers/jobController.js";
import { authenticateToken } from "../controllers/userController.js";

const router = express.Router();

// Employer specific routes (must come before generic routes)
router.get("/employer/my-jobs", authenticateToken, getEmployerJobs); // GET /api/v1/jobs/employer/my-jobs

// Public routes
router.get("/", getAllJobs); // GET /api/v1/jobs
router.get("/:id", getJobById); // GET /api/v1/jobs/:id

// Protected routes (require authentication)
router.post("/", authenticateToken, createJob); // POST /api/v1/jobs
router.put("/:id", authenticateToken, updateJob); // PUT /api/v1/jobs/:id
router.delete("/:id", authenticateToken, deleteJob); // DELETE /api/v1/jobs/:id
router.post("/:id/apply", authenticateToken, applyToJob); // POST /api/v1/jobs/:id/apply

export default router;
