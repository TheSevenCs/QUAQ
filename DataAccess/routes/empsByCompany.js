const express = require("express");
const generalModule = require("../Database.js");
const router = express.Router();

// READ (QUERY) - Get all employees for a company by company_id
router.get("/", async (req, res) => {
  try {
    const { company_id } = req.query;

    // Validate required parameters
    if (!company_id) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // KeyConditionExpression for company_id
    const keyConditionExpression = "company_id = :COMPANY";
    const expressionAttributeValues = {
      ":COMPANY": company_id,
    };

    // Query the Employees table
    const employees = await generalModule.queryFromDatabase(
      "Employees",
      keyConditionExpression,
      expressionAttributeValues
    );

    // Return the results
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: "Error querying Employees by company",
      error: error.message,
    });
  }
});

module.exports = router;
