import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeUrl: { type: String },
    bio: { type: String, trim: true },

    experience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],

    education: [
      {
        degree: String,
        institution: String,
        year: String,
      },
    ],

    skills: [String],

    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  { timestamps: true }
);

export default mongoose.model("Candidate", candidateSchema);
