import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      currency: { type: String, default: "USD" },
    },
    requiredSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    requirements: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    others: {
      type: String,
      default: "",
    },
    experience: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      required: true,
    },

    // Relations
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },

    // Job status
    isActive: {
      type: Boolean,
      default: true,
    },

    // Applications
    applicants: [
      {
        candidate: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Candidate",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["pending", "reviewed", "shortlisted", "rejected", "hired"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true }
);

// Index for better search performance
jobSchema.index({ jobTitle: "text", company: "text", location: "text" });
jobSchema.index({ isActive: 1, createdAt: -1 });

export default mongoose.model("Job", jobSchema);
