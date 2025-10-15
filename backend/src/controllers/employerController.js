import User from "../models/User.js";
import Employer from "../models/Employer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// Helper: generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// REGISTER employer
export const registerEmployer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      companyName,
      companyDescription,
      location,
      website,
      industry,
    } = req.body;

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
      role: "employer",
      otp,
      otpExpiry,
      isVerified: false,
    });

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Workera Employer OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to Workera!</h2>
          <p>Hello ${firstName},</p>
          <p>Thank you for registering as an employer on Workera. Your OTP verification code is:</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #000; font-size: 32px; margin: 0;">${otp}</h1>
          </div>
          <p><strong>This OTP expires in 1 minute.</strong></p>
          <p>Company: ${companyName}</p>
          <p>Best regards,<br>Workera Team</p>
        </div>
      `,
    });

    res.status(201).json({
      message: "OTP sent to email.",
      userId: user._id,
      companyName, // Pass back for OTP verification
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering employer", error });
  }
};

// LOGIN employer
export const loginEmployer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.role !== "employer")
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res
        .status(400)
        .json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const employer = await Employer.findOne({
      user: user._id,
    }).populate("user");

    const token = generateToken(user._id, user.role);

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Employer logged in successfully",
      token,
      user,
      profile: employer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error });
  }
};
