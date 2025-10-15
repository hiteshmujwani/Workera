import User from "../models/User.js";
import Candidate from "../models/Candidate.js";
import Employer from "../models/Employer.js";
import jwt from "jsonwebtoken";

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

// Middleware to authenticate token
export const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Universal OTP verification
export const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });
    if (!user.otp || user.otpExpiry < Date.now()) {
      return res
        .status(400)
        .json({ message: "OTP expired. Please register again." });
    }
    if (parseInt(otp) !== user.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP verified → mark verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // Create role-specific profile
    let profile;
    if (user.role === "candidate") {
      profile = await Candidate.create({
        user: user._id,
        skills: req.body.skills || [],
      });
    } else if (user.role === "employer") {
      profile = await Employer.create({
        user: user._id,
        companyName: req.body.companyName || "",
        companyDescription: req.body.companyDescription || "",
        location: req.body.location || "",
        website: req.body.website || "",
        industry: req.body.industry || "",
      });
    }

    // Generate JWT & set cookie
    const token = generateToken(user._id, user.role);
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      message: "OTP verified successfully. Registration complete.",
      user,
      profile,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};

// Universal get user endpoint
export const getUser = async (req, res) => {
  try {
    const { id, role } = req.user; // From JWT token

    if (role === "candidate") {
      const candidate = await Candidate.findOne({ user: id }).populate("user");
      return res.status(200).json([candidate]); // Keep your current array format
    }

    if (role === "employer") {
      const employer = await Employer.findOne({ user: id }).populate("user");
      return res.status(200).json([employer]); // Same array format
    }

    res.status(400).json({ message: "Invalid role" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Universal logout
export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", { ...cookieOptions, maxAge: 0 });
    res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
