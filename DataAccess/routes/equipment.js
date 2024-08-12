const express = require("express");
const generalModule = require("../database.js");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const {
    equipmentGroup_id,
    job_id = "0", // default value 0
    equipmentName,
    equipmentSerialNumber,
    equipmentLocation,
    equipmentStatus, // available/in_use/maintenance
    purchaseDate, // YYYY-MM-DD
    lastServiceDate, // YYYY-MM-DD
  } = req.body;

  const newEquipment = {
    equipment_id: (
      await generalModule.TEMPgenerateID(9000000000000, 9999999999999)
    ).toString(),
    equipmentGroup_id,
    job_id,
    equipmentName,
    equipmentSerialNumber,
    equipmentLocation,
    equipmentStatus,
    equipmentPurchaseDate: purchaseDate,
    equipmentLastServiceDate: lastServiceDate,
  };

  try {
    // Ensure equipmentName is unique
    const existingEquipment = await generalModule.getItemByField(
      "Equipment",
      "equipmentName",
      equipmentName
    );
    if (existingEquipment) {
      return res.status(400).json({ error: "Equipment name must be unique" });
    }

    const result = await generalModule.addToDatabase("Equipment", newEquipment);
    console.log("FROM equipment.js, NEW Equipment ADDED: ", result);
    res.status(201).json({ message: "Equipment created successfully", result });
  } catch (error) {
    console.error("FROM equipment.js, ERROR CREATING NEW Equipment: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const equipment = await generalModule.getFromDatabase("Equipment");
    console.log("FROM equipment.js, RESULTS FROM Equipment TABLE: ", equipment);

    const formattedEquipment = equipment.map((item) => ({
      equipment_id: item.equipment_id,
      equipmentGroup_id: item.equipmentGroup_id,
      job_id: item.job_id,
      equipmentName: item.equipmentName,
      equipmentSerialNumber: item.equipmentSerialNumber,
      equipmentLocation: item.equipmentLocation,
      equipmentStatus: item.equipmentStatus,
      equipmentPurchaseDate: item.equipmentPurchaseDate,
      equipmentLastServiceDate: item.equipmentLastServiceDate,
    }));

    res.status(200).json(formattedEquipment);
  } catch (error) {
    console.error("FROM equipment.js, ERROR GETTING Equipment: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE
router.patch("/", async (req, res) => {
  const {
    equipment_id,
    equipmentGroup_id,
    editedJobId = "0", // default value 0
    editedName,
    editedSerialNumber,
    editedLocation,
    editedStatus,
    editedPurchaseDate, // YYYY-MM-DD
    editedLastServiceDate, // YYYY-MM-DD
  } = req.body;

  const equipmentDetails = {
    equipment_id,
    equipmentGroup_id,
    job_id: editedJobId,
    equipmentName: editedName,
    equipmentSerialNumber: editedSerialNumber,
    equipmentLocation: editedLocation,
    equipmentStatus: editedStatus,
    equipmentPurchaseDate: editedPurchaseDate,
    equipmentLastServiceDate: editedLastServiceDate,
  };

  const updateExpression =
    "SET " +
    Object.keys(equipmentDetails)
      .map((key) => `${key} = :${key}`)
      .join(", ");

  const expressionAttributeValues = {};
  Object.entries(equipmentDetails).forEach(([key, value]) => {
    expressionAttributeValues[`:${key}`] = { S: value };
  });

  const primaryKey = {
    equipment_id: { S: equipment_id },
  };

  try {
    // Ensure equipmentName is unique
    const existingEquipment = await generalModule.getItemByField(
      "Equipment",
      "equipmentName",
      editedName
    );
    if (existingEquipment && existingEquipment.equipment_id !== equipment_id) {
      return res.status(400).json({ error: "Equipment name must be unique" });
    }

    const response = await generalModule.updateItemInDatabase(
      "Equipment",
      primaryKey,
      updateExpression,
      expressionAttributeValues
    );

    console.log("FROM equipment.js, Equipment EDITED: ", response);
    res
      .status(200)
      .json({ message: "Equipment updated successfully", response });
  } catch (error) {
    console.error("FROM equipment.js, ERROR EDITING Equipment: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE
router.delete("/", async (req, res) => {
  const { equipment_id } = req.body;

  try {
    const response = await generalModule.deleteFromDatabase(
      "Equipment",
      equipment_id
    );
    console.log(
      `FROM equipment.js, Equipment: ${equipment_id} DELETED: `,
      response
    );
    res.status(204).json({ message: "Equipment deleted successfully" });
  } catch (error) {
    console.error("FROM equipment.js, Equipment COULD NOT BE DELETED: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
