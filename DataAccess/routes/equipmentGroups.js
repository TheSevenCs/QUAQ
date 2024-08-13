const express = require("express");
const generalModule = require("../Database.js");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const {
    company_id,
    groupName,
    groupDescription,
    groupDate, // YYYY-MM-DD
  } = req.query;

  const newGroup = {
    equipmentGroup_id: (
      await generalModule.TEMPgenerateID(9000000000000, 9999999999999)
    ).toString(),
    company_id: company_id,
    equipmentGroupName: groupName,
    equipmentGroupDescription: groupDescription,
    equipmentGroupDate: groupDate,
  };

  try {
    const result = await generalModule.addToDatabase(
      "EquipmentGroups",
      newGroup
    );
    // console.log("FROM equipmentGroups.js, NEW Equipment Group ADDED: ", result);
    res
      .status(201)
      .json({ message: "Equipment Group created successfully", result });
  } catch (error) {
    console.error(
      "FROM equipmentGroups.js, ERROR CREATING NEW Equipment Group: ",
      error
    );
    res.status(500).json({ error: "Internal server error" });
  }
});
// READ
router.get("/", async (req, res) => {
  try {
    const groups = await generalModule.getFromDatabase("EquipmentGroups");
    console.log(
      "FROM equipmentGroups.js, RESULTS FROM EquipmentGroups TABLE: ",
      groups
    );

    const formattedGroups = groups.map((group) => ({
      equipmentGroup_id: group.equipmentGroup_id,
      company_id: group.company_id,
      equipmentGroupName: group.equipmentGroupName,
      equipmentGroupDescription: group.equipmentGroupDescription,
      equipmentGroupDate: group.equipmentGroupDate,
    }));

    res.status(200).json(formattedGroups);
  } catch (error) {
    console.error(
      "FROM equipmentGroups.js, ERROR GETTING Equipment Groups: ",
      error
    );
    res.status(500).json({ error: "Internal server error" });
  }
});
// UPDATE
router.patch("/", async (req, res) => {
  const {
    equipmentGroup_id,
    company_id,
    editedName,
    editedDescription,
    editedDate, // YYYY-MM-DD
  } = req.body;

  const groupDetails = {
    equipmentGroup_id: group_id,
    company_id,
    equipmentGroupName: editedName,
    equipmentGroupDescription: editedDescription,
    equipmentGroupDate: editedDate,
  };

  const updateExpression =
    "SET " +
    Object.keys(groupDetails)
      .map((key) => `${key} = :${key}`)
      .join(", ");

  const expressionAttributeValues = {};
  Object.entries(groupDetails).forEach(([key, value]) => {
    expressionAttributeValues[`:${key}`] = { S: value };
  });

  const primaryKey = {
    equipmentGroup_id: { S: group_id },
  };

  try {
    const response = await generalModule.updateItemInDatabase(
      "EquipmentGroups",
      primaryKey,
      updateExpression,
      expressionAttributeValues
    );

    console.log("FROM equipmentGroups.js, Equipment Group EDITED: ", response);
    res
      .status(200)
      .json({ message: "Equipment Group updated successfully", response });
  } catch (error) {
    console.error(
      "FROM equipmentGroups.js, ERROR EDITING Equipment Group: ",
      error
    );
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE
router.delete("/", async (req, res) => {
  const { group_id } = req.body;

  try {
    const response = await generalModule.deleteFromDatabase(
      "EquipmentGroups",
      group_id
    );
    console.log(
      `FROM equipmentGroups.js, Equipment Group: ${group_id} DELETED: `,
      response
    );
    res.status(204).json({ message: "Equipment Group deleted successfully" });
  } catch (error) {
    console.error(
      "FROM equipmentGroups.js, Equipment Group COULD NOT BE DELETED: ",
      error
    );
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
