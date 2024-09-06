const express = require("express");
const generalModule = require("../Database.js");
const router = express.Router();

// CREATE - Log the start of the shift (only creates entry with timeStart)
router.post("/", async (req, res) => {
  try {
    const { employee_id, company_id, timeStart } = req.body;

    // Validate required parameters
    if (!employee_id || !company_id || !timeStart) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const newLog = {
      hours_id: (
        await generalModule.TEMPgenerateID(9000000000000, 9999999999999)
      ).toString(),
      employee_id,
      company_id,
      timeStart,
      shiftCompleted: "false", // Shift is not yet completed
    };

    // Add the new entry to the Hours table
    const result = await generalModule.addToDatabase("Hours", newLog);
    res.status(201).json({ message: "Shift started successfully", result });
  } catch (error) {
    res.status(500).json({
      message: "Error starting shift",
      error: error.message,
    });
  }
});

// READ - Get all shifts for a specific employee and company
router.get("/", async (req, res) => {
  try {
    const { employee_id, company_id } = req.query;

    // Validate required parameters
    if (!employee_id || !company_id) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // KeyConditionExpression for employee_id and company_id
    const keyConditionExpression =
      "employee_id = :EMPLOYEE and company_id = :COMPANY";
    const expressionAttributeValues = {
      ":EMPLOYEE": employee_id,
      ":COMPANY": company_id,
    };

    // Query the Hours table
    const shifts = await generalModule.queryFromDatabase(
      "Hours",
      keyConditionExpression,
      expressionAttributeValues
    );

    // Return the results
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({
      message: "Error querying shift logs",
      error: error.message,
    });
  }
});

// UPDATE - Update the shift based on requestStatus (startBreak, endBreak, endShift)
router.patch("/", async (req, res) => {
  try {
    const { hours_id, requestStatus, requestTime } = req.body; // REMEMBER TO SAVE LOCALLY

    // Validate required parameters
    if (!hours_id || !requestStatus || !requestTime) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    let updateExpression = "";
    const expressionAttributeValues = {
      ":REQUESTTIME": requestTime,
    };

    // Logic to handle different request statuses
    if (requestStatus === "startBreak") {
      updateExpression = "SET breakStart = :REQUESTTIME";
    } else if (requestStatus === "endBreak") {
      updateExpression =
        "SET totalBreakTime = list_append(if_not_exists(totalBreakTime, :EMPTY_LIST), :REQUESTTIME)";
      expressionAttributeValues[":EMPTY_LIST"] = [];
    } else if (requestStatus === "endShift") {
      updateExpression =
        "SET timeEnd = :REQUESTTIME, shiftCompleted = :COMPLETED";
      expressionAttributeValues[":COMPLETED"] = "true";
      // Call a function to calculate totalWorkTime (handled in another module)
    } else {
      return res.status(400).json({ message: "Invalid requestStatus" });
    }

    // Update the Hours table
    const result = await generalModule.updateItemInDatabase(
      "Hours",
      { hours_id: { S: hours_id } },
      updateExpression,
      expressionAttributeValues
    );

    res.status(200).json({ message: "Shift updated successfully", result });
  } catch (error) {
    res.status(500).json({
      message: "Error updating shift",
      error: error.message,
    });
  }
});

// DELETE - Remove a shift log by hours_id
router.delete("/", async (req, res) => {
  try {
    const { hours_id } = req.query;

    // Validate required parameters
    if (!hours_id) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // Delete the shift log from the Hours table
    const result = await generalModule.deleteFromDatabase("Hours", {
      hours_id,
    });

    res.status(204).json({ message: "Shift log deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting shift log",
      error: error.message,
    });
  }
});

module.exports = router;
