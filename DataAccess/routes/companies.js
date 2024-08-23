const express = require("express");
const generalModule = require("../Database.js");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const { companyName, billingDate, billingRate, billingFreq } = req.query;

  const newCompany = {
    company_id: (
      await generalModule.TEMPgenerateID(9000000000000, 9999999999999)
    ).toString(),
    companyName,
    billingDate,
    billingRate,
    billingFreq,
  };

  try {
    const result = await generalModule.addToDatabase("Company", newCompany);
    res.status(201).json({ message: "Company created successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const companies = await generalModule.getFromDatabase("Company");
    const formattedCompanies = companies.map((company) => ({
      company_id: company.company_id,
      companyName: company.companyName,
      billingDate: company.billingDate,
      billingRate: company.billingRate,
      billingFreq: company.billingFreq,
    }));

    res.status(200).json(formattedCompanies);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE
router.patch("/", async (req, res) => {
  const {
    company_id,
    editedCompanyName,
    editedBillingDate,
    editedBillingRate,
    editedBillingFreq,
  } = req.query;

  const companyDetails = {
    companyName: editedCompanyName,
    billingDate: editedBillingDate,
    billingRate: editedBillingRate,
    billingFreq: editedBillingFreq,
  };

  const updateExpression =
    "SET " +
    Object.keys(companyDetails)
      .map((key) => `${key} = :${key}`)
      .join(", ");

  const expressionAttributeValues = {};
  Object.entries(companyDetails).forEach(([key, value]) => {
    expressionAttributeValues[`:${key}`] = { S: value };
  });

  const primaryKey = {
    company_id: { S: company_id },
  };

  try {
    const response = await generalModule.updateItemInDatabase(
      "Company",
      primaryKey,
      updateExpression,
      expressionAttributeValues
    );

    res.status(200).json({ message: "Company updated successfully", response });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE
router.delete("/", async (req, res) => {
  const { company_id } = req.query;

  try {
    const response = await generalModule.deleteFromDatabase("Company", {
      company_id,
    });
    res.status(204).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
