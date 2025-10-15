import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes
import candidateRoutes from "./routes/candidateRoutes.js";
import employerRoutes from "./routes/employerRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connection with Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: [process.env.CLIENT_URL], // ✅ local URLs
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};

app.use(cors(corsOptions));

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Workera API Server is running!",
    version: "1.0.0",
    status: "active",
  });
});

// Endpoints
app.use("/api/v1/candidate", candidateRoutes);
app.use("/api/v1/employer", employerRoutes);
app.use("/api/v1/user", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Workera server running on port ${PORT}`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
});
