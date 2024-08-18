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
// UPDATE
router.patch("/", async (req, res) => {
  // PARAMS
  const {
    client_id,
    company_id,
    editedFirstName,
    editedLastName,
    editedEmail,
    editedPhone,
    editedDate,
    editedActive,
    editedWebsite,
    editedAddress,
  } = req.query;

  // CREATE NEW ENTRY
  const clientDetails = {
    // THESE KEYS ARE USED AS IDENTIFIERS, AND ARE NOT UPDATED
    // client_id: client_id,
    // company_id: company_id,
    clientFirstName: editedFirstName,
    clientLastName: editedLastName,
    clientEmail: editedEmail,
    clientPhone: editedPhone,
    clientDate: editedDate,
    clientActive: editedActive,
    clientWebsite: editedWebsite,
    clientAddress: editedAddress,
  };

  // UPDATE EXPRESSION: Specifies which attributes will be updated, with a placeholder value
  const updateExpression =
    "SET " +
    Object.keys(clientDetails)
      .map((key) => `${key} = :${key}`)
      .join(", ");

  // EXPRESSION ATTRIBUTE VALUES: Specifies the type and value of the placeholder values
  const expressionAttributeValues = {};
  Object.entries(clientDetails).forEach(([key, value]) => {
    expressionAttributeValues[`:${key}`] = { S: value };
  });

  // DEFINE PRIMARY KEY
  const primaryKey = {
    client_id: { S: client_id },
    company_id: { S: company_id },
  };

  try {
    // console.log(
    //   "FROM clients.js, expressionAttributeValues:",
    //   expressionAttributeValues
    // ); // TESTER
    const response = await generalModule.updateItemInDatabase(
      "Clients",
      primaryKey,
      updateExpression,
      expressionAttributeValues
    );

    res.status(200).json({
      message: "FROM clients.js, SUCCESSFULLY UPDATED Client:",
      // data: clientDetails,
      result: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "FROM clients.js, ERROR UPDATING Client:",
      error: error.message,
    });
  }
});

module.exports = router;
