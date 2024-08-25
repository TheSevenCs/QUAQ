// This file is meant to hold the function that will be used in the personal schedule function.
// This function takes the employee_id, company_id, as well two dates that will be used for a range,
// and then returns all jobs for that employee between those two dates.
// We may also want to write a function that automatically calculates the date range dates
// depending on the current date.

const express = require("express");
const generalModule = require("../Database.js");
const router = express.Router();

// Should consider a new route for this function

// READ (QUERY TESTER)
router.get("/", async (req, res) => {
  try {
    // GET PARAMS FROM REQ
    const { company_id, employee_id, startDate, endDate } = req.query;

    if (!company_id || !employee_id || !startDate || !endDate) {
      res.status(400).json({ message: "FROM TESTER.js FILE, PARAM MISSING" });
    }

    // FORM THE PARAMS TO SEND TO GENERAL FUNCTIONS
    const keyConditionExpression = "company_id = :COMPANY";
    const expressionAttributeValues = {
      ":COMPANY": company_id,
      ":START": startDate,
      ":END": endDate,
      ":EMPLOYEE": employee_id,
    };
    const filterExpression =
      "jobDate BETWEEN :START AND :END AND contains(jobEmployees, :EMPLOYEE)";

    const results = await generalModule.queryFromDatabase(
      "Jobs",
      keyConditionExpression,
      expressionAttributeValues,
      filterExpression
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({
      message: "FROM personalScheduleFunc.js, ERROR QUERYING FROM Jobs:",
      error: error.message,
    });
  }
});

module.exports = router;
