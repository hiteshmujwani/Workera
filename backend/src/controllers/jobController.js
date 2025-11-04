import Job from "../models/Job.js";
import Employer from "../models/Employer.js";
import Candidate from "../models/Candidate.js";

// CREATE JOB - Employer only
export const createJob = async (req, res) => {
  try {
    const { id: userId, role } = req.user;

    if (role !== "employer") {
      return res.status(403).json({ message: "Only employers can post jobs" });
    }

    const employer = await Employer.findOne({ user: userId });
    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    const {
      jobTitle,
      company,
      location,
      salary,
      requiredSkills,
      requirements,
      education,
      jobDescription,
      others,
      experience,
      jobType,
    } = req.body;

    // Validation
    if (
      !jobTitle ||
      !company ||
      !location ||
      !requirements ||
      !education ||
      !jobDescription ||
      !jobType
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    if (!salary?.min || !salary?.max || salary.min > salary.max) {
      return res
        .status(400)
        .json({ message: "Please provide valid salary range" });
    }

    if (
      !experience?.min ||
      !experience?.max ||
      experience.min > experience.max
    ) {
      return res
        .status(400)
        .json({ message: "Please provide valid experience range" });
    }

    const job = await Job.create({
      jobTitle,
      company,
      location,
      salary,
      requiredSkills: requiredSkills || [],
      requirements,
      education,
      jobDescription,
      others: others || "",
      experience,
      jobType,
      employer: employer._id,
    });

    // Add job to employer's postedJobs array
    employer.postedJobs.push(job._id);
    await employer.save();

    const populatedJob = await Job.findById(job._id).populate(
      "employer",
      "companyName user"
    );

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job: populatedJob,
    });
  } catch (error) {
    console.error("Create job error:", error);
    res
      .status(500)
      .json({ message: "Error creating job", error: error.message });
  }
};

// GET ALL JOBS - Public
export const getAllJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      location,
      jobType,
      minSalary,
      maxSalary,
    } = req.query;

    const query = { isActive: true };

    // Search filters
    if (search) {
      query.$text = { $search: search };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    if (minSalary || maxSalary) {
      query["salary.min"] = {};
      if (minSalary) query["salary.min"].$gte = parseInt(minSalary);
      if (maxSalary) query["salary.max"] = { $lte: parseInt(maxSalary) };
    }

    const jobs = await Job.find(query)
      .populate("employer", "companyName location website")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      jobs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalJobs: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get jobs error:", error);
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: error.message });
  }
};

// GET SINGLE JOB - Public
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id)
      .populate(
        "employer",
        "companyName companyDescription location website industry user"
      )
      .populate("applicants.candidate", "user bio skills");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Get job error:", error);
    res
      .status(500)
      .json({ message: "Error fetching job", error: error.message });
  }
};

// UPDATE JOB - Employer only (own jobs)
export const updateJob = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const { id: jobId } = req.params;

    if (role !== "employer") {
      return res
        .status(403)
        .json({ message: "Only employers can update jobs" });
    }

    const employer = await Employer.findOne({ user: userId });
    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if job belongs to this employer
    if (job.employer.toString() !== employer._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only update your own jobs" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { ...req.body },
      { new: true, runValidators: true }
    ).populate("employer", "companyName user");

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Update job error:", error);
    res
      .status(500)
      .json({ message: "Error updating job", error: error.message });
  }
};

// DELETE JOB - Employer only (own jobs)
export const deleteJob = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const { id: jobId } = req.params;

    if (role !== "employer") {
      return res
        .status(403)
        .json({ message: "Only employers can delete jobs" });
    }

    const employer = await Employer.findOne({ user: userId });
    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if job belongs to this employer
    if (job.employer.toString() !== employer._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own jobs" });
    }

    await Job.findByIdAndDelete(jobId);

    // Remove job from employer's postedJobs array
    employer.postedJobs = employer.postedJobs.filter(
      (jobRef) => jobRef.toString() !== jobId
    );
    await employer.save();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Delete job error:", error);
    res
      .status(500)
      .json({ message: "Error deleting job", error: error.message });
  }
};

// GET EMPLOYER'S JOBS - Employer only
export const getEmployerJobs = async (req, res) => {
  try {
    const { id: userId, role } = req.user;

    if (role !== "employer") {
      return res
        .status(403)
        .json({ message: "Only employers can access this endpoint" });
    }

    const employer = await Employer.findOne({ user: userId });
    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    const jobs = await Job.find({ employer: employer._id })
      .sort({ createdAt: -1 })
      .populate("applicants.candidate", "user bio skills");

    res.status(200).json({
      success: true,
      jobs,
      totalJobs: jobs.length,
    });
  } catch (error) {
    console.error("Get employer jobs error:", error);
    res
      .status(500)
      .json({ message: "Error fetching employer jobs", error: error.message });
  }
};

// APPLY TO JOB - Candidate only
export const applyToJob = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const { id: jobId } = req.params;

    if (role !== "candidate") {
      return res
        .status(403)
        .json({ message: "Only candidates can apply to jobs" });
    }

    const candidate = await Candidate.findOne({ user: userId });
    if (!candidate) {
      return res.status(404).json({ message: "Candidate profile not found" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (!job.isActive) {
      return res.status(400).json({ message: "This job is no longer active" });
    }

    // Check if already applied
    const alreadyApplied = job.applicants.some(
      (app) => app.candidate.toString() === candidate._id.toString()
    );

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You have already applied to this job" });
    }

    // Add application
    job.applicants.push({
      candidate: candidate._id,
      appliedAt: new Date(),
      status: "pending",
    });

    await job.save();

    // Add to candidate's appliedJobs
    candidate.appliedJobs.push(jobId);
    await candidate.save();

    res.status(200).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Apply to job error:", error);
    res
      .status(500)
      .json({ message: "Error applying to job", error: error.message });
  }
};
