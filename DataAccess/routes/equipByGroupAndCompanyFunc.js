const express = require("express");
const generalModule = require("../Database.js");
const router = express.Router();

// READ (QUERY) - Get all equipment for a group by equipmentGroup_id and company_id
router.get("/", async (req, res) => {
  try {
    const { equipmentGroup_id, company_id } = req.query;

    // Validate required parameters
    if (!equipmentGroup_id || !company_id) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // KeyConditionExpression for company_id and equipmentGroup_id
    const keyConditionExpression =
      "company_id = :COMPANY and equipmentGroup_id = :GROUP";
    const expressionAttributeValues = {
      ":COMPANY": company_id,
      ":GROUP": equipmentGroup_id,
    };

    // Query the Equipment table
    const equipment = await generalModule.queryFromDatabase(
      "Equipment",
      keyConditionExpression,
      expressionAttributeValues
    );

    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({
      message: "Error querying Equipment by group and company",
      error: error.message,
    });
  }
});

module.exports = router;
