const express = require("express");
const generalModule = require("../Database.js");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const {
    company_id,
    team_id,
    employeeUsername,
    employeePassword,
    employeeFirstName,
    employeeLastName,
    employeeRole,
    employeeEmail,
    employeePhone, //<XXX-XXX-XXXX>
  } = req.query;

  const newEmployee = {
    employee_id: (
      await generalModule.TEMPgenerateID(9000000000000, 9999999999999)
    ).toString(),
    company_id,
    team_id,
    employeeUsername,
    employeePassword,
    employeeFirstName,
    employeeLastName,
    employeeRole,
    employeeEmail,
    employeePhone,
  };

  try {
    const result = await generalModule.addToDatabase("Employees", newEmployee);
    res.status(201).json({ message: "Employee created successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const employees = await generalModule.getFromDatabase("Employees");
    const formattedEmployees = employees.map((employee) => ({
      employee_id: employee.employee_id,
      company_id: employee.company_id,
      team_id: employee.team_id,
      employeeUsername: employee.employeeUsername,
      employeePassword: employee.employeePassword,
      employeeFirstName: employee.employeeFirstName,
      employeeLastName: employee.employeeLastName,
      employeeRole: employee.employeeRole,
      employeeEmail: employee.employeeEmail,
      employeePhone: employee.employeePhone,
    }));

    res.status(200).json(formattedEmployees);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE
router.patch("/", async (req, res) => {
  const {
    employee_id,
    company_id,
    editedTeamId,
    editedUsername,
    editedPassword,
    editedFirstName,
    editedLastName,
    editedRole,
    editedEmail,
    editedPhone,
  } = req.query;

  const employeeDetails = {
    team_id: editedTeamId,
    employeeUsername: editedUsername,
    employeePassword: editedPassword,
    employeeFirstName: editedFirstName,
    employeeLastName: editedLastName,
    employeeRole: editedRole,
    employeeEmail: editedEmail,
    employeePhone: editedPhone,
  };

  const updateExpression =
    "SET " +
    Object.keys(employeeDetails)
      .map((key) => `${key} = :${key}`)
      .join(", ");

  const expressionAttributeValues = {};
  Object.entries(employeeDetails).forEach(([key, value]) => {
    expressionAttributeValues[`:${key}`] = { S: value };
  });

  const primaryKey = {
    employee_id: { S: employee_id },
    company_id: { S: company_id },
  };

  try {
    const response = await generalModule.updateItemInDatabase(
      "Employees",
      primaryKey,
      updateExpression,
      expressionAttributeValues
    );

    res
      .status(200)
      .json({ message: "Employee updated successfully", response });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE
router.delete("/", async (req, res) => {
  const { employee_id, company_id } = req.query;

  try {
    const response = await generalModule.deleteFromDatabase("Employees", {
      employee_id,
      company_id,
    });
    res.status(204).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
