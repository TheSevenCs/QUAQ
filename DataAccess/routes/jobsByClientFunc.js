const express = require("express");
const generalModule = require("../Database.js");
const router = express.Router();

// READ (QUERY)
router.get("/", async (req, res) => {
  try {
    const { company_id, client_id, jobStatus = "ACTIVE" } = req.query;

    // Validate required parameters
    if (!company_id || !client_id) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // KeyConditionExpression for company_id and client_id
    const keyConditionExpression =
      "company_id = :COMPANY and client_id = :CLIENT";
    const expressionAttributeValues = {
      ":COMPANY": company_id,
      ":CLIENT": client_id,
      ":STATUS": jobStatus, // Use jobStatus from query, default to "ACTIVE"
    };

    // FilterExpression for jobStatus
    const filterExpression = "jobStatus = :STATUS";

    // Query the Jobs table
    const jobs = await generalModule.queryFromDatabase(
      "Jobs",
      keyConditionExpression,
      expressionAttributeValues,
      filterExpression
    );

    // Return the results
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Error querying Jobs by client",
      error: error.message,
    });
  }
});

module.exports = router;
