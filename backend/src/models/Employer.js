import mongoose from "mongoose";

const employerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: { type: String, required: true },
    companyDescription: { type: String },
    location: { type: String },
    website: { type: String },
    postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  { timestamps: true }
);

export default mongoose.model("Employer", employerSchema);
