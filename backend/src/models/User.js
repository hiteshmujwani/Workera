import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "employer", "candidate"],
      default: "candidate",
    },
    isVerified: { type: Boolean, default: false },
    otp: Number,
    otpExpiry: Date,
  },
  { timestamps: true }
);

// TTL index: delete unverified users after otpExpiry
userSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("User", userSchema);
