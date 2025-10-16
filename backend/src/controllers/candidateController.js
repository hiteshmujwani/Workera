import User from "../models/User.js";
import Candidate from "../models/Candidate.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // applied here because it was not working in index.js for this file

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// Helper: generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Cookie options
const cookieOptions = {
  httpOnly: true, // JS cannot access cookie
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // prevent CSRF
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  path: "/",
};

// generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// REGISTER candidate
export const registerCandidate = async (req, res) => {
  try {
    const { firstName, lastName, email, password, skills } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();
    // Set OTP expiry for 1 minute in India timezone (IST)
    const indiaTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    const otpExpiry = indiaTime.getTime() + 1 * 60 * 1000; // 1 min

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "candidate",
      otp,
      otpExpiry,
      isVerified: false,
    });
    console.log("before otp sent");
    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Workera OTP Verification",
      text: `Your OTP is ${otp}. It expires in 1 minute.`,
    });
    console.log("OTP SENT");
    res.status(201).json({
      message: "OTP sent to email.",
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering candidate", error });
  }
};

// verifyOTP moved to userController.js for universal use

// LOGIN candidate
export const loginCandidate = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.role !== "candidate")
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const candidate = await Candidate.findOne({
      user: user._id,
    });

    const token = generateToken(user._id, user.role);

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Candidate logged in successfully",
      token,
      user,
      profile: candidate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

// getCandidate and logoutCandidate moved to userController.js for universal use
