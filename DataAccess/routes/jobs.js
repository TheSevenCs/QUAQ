const express = require("express");
const generalModule = require("../Database.js");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const {
    company_id,
    client_id,
    jobEmployees,
    jobName,
    jobDate,
    jobTime,
    jobLocation,
    jobDescription,
    jobManagerNotes,
    jobTechNotes,
    jobStatus, //<INACTIVE/ACTIVE/COMPLETED>
    jobArchived, //<TRUE/FALSE>
  } = req.query;

  const newJob = {
    job_id: (
      await generalModule.TEMPgenerateID(9000000000000, 9999999999999)
    ).toString(),
    company_id,
    client_id,
    jobEmployees,
    jobName,
    jobDate,
    jobTime,
    jobLocation,
    jobDescription,
    jobManagerNotes,
    jobTechNotes,
    jobStatus,
    jobArchived,
  };

  try {
    const result = await generalModule.addToDatabase("Jobs", newJob);
    res.status(201).json({ message: "Job created successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const jobs = await generalModule.getFromDatabase("Jobs");
    const formattedJobs = jobs.map((job) => ({
      job_id: job.job_id,
      company_id: job.company_id,
      client_id: job.client_id,
      jobEmployees: job.jobEmployees,
      jobName: job.jobName,
      jobDate: job.jobDate,
      jobTime: job.jobTime,
      jobLocation: job.jobLocation,
      jobDescription: job.jobDescription,
      jobManagerNotes: job.jobManagerNotes,
      jobTechNotes: job.jobTechNotes,
      jobStatus: job.jobStatus,
      jobArchived: job.jobArchived,
    }));

    res.status(200).json(formattedJobs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE
router.patch("/", async (req, res) => {
  const {
    job_id,
    company_id,
    client_id,
    editedEmployees,
    editedName,
    editedDate,
    editedTime,
    editedLocation,
    editedDescription,
    editedManagerNotes,
    editedTechNotes,
    editedStatus,
    editedArchived,
  } = req.query;

  const jobDetails = {
    client_id,
    jobEmployees: editedEmployees,
    jobName: editedName,
    jobDate: editedDate,
    jobTime: editedTime,
    jobLocation: editedLocation,
    jobDescription: editedDescription,
    jobManagerNotes: editedManagerNotes,
    jobTechNotes: editedTechNotes,
    jobStatus: editedStatus,
    jobArchived: editedArchived,
  };

  const updateExpression =
    "SET " +
    Object.keys(jobDetails)
      .map((key) => `${key} = :${key}`)
      .join(", ");

  const expressionAttributeValues = {};
  Object.entries(jobDetails).forEach(([key, value]) => {
    expressionAttributeValues[`:${key}`] = { S: value };
  });

  const primaryKey = {
    job_id: { S: job_id },
    company_id: { S: company_id },
  };

  try {
    const response = await generalModule.updateItemInDatabase(
      "Jobs",
      primaryKey,
      updateExpression,
      expressionAttributeValues
    );

    res.status(200).json({ message: "Job updated successfully", response });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE
router.delete("/", async (req, res) => {
  const { job_id, company_id } = req.query;

  try {
    const response = await generalModule.deleteFromDatabase("Jobs", {
      job_id,
      company_id,
    });
    res.status(204).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
