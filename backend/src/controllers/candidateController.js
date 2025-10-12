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
  sameSite: "strict", // prevent CSRF
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
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
      role: "user",
      otp,
      otpExpiry,
      isVerified: false,
    });

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Workera OTP Verification",
      text: `Your OTP is ${otp}. It expires in 1 minute.`,
    });

    res.status(201).json({
      message: "OTP sent to email.",
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering candidate", error });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });

    if (!user.otp || user.otpExpiry < Date.now())
      return res
        .status(400)
        .json({ message: "OTP expired. Please register again." });

    if (parseInt(otp) !== user.otp)
      return res.status(400).json({ message: "Invalid OTP" });

    // OTP verified → mark verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // Create Candidate Profile
    const candidate = await Candidate.create({
      user: user._id,
      skills: req.body.skills || [],
    });

    // Generate JWT & set cookie
    const token = generateToken(user._id, user.role);
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      message: "OTP verified successfully. Registration complete.",
      user,
      profile: candidate,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};

// LOGIN candidate
export const loginCandidate = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.role !== "user")
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

export const getCandidate = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const candidate = await Candidate.find({ user: decoded.id })
      .select("-password")
      .populate("user");
    console.log(candidate);
    res.status(200).json(candidate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logoutCandidate = async (req, res) => {
  try {
    res.cookie("token", "", cookieOptions);
    res.status(200).json({ message: "logout successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
