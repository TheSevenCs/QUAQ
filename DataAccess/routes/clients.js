const express = require("express");
const generalModule = require("../Database.js");
const router = express.Router();

// NOTE: The purpose of these routes/x files is to
//       take the params of the http request
//       form an object to be uploaded/updated to the database
//       then send it over to the general module to post it

// CREATE
router.post("/", async (req, res) => {
  // TAKE THE PARAMS
  const {
    company_id,
    newFirstName,
    newLastName,
    newEmail,
    newPhone,
    newDate,
    newClientActive,
    newWebsite,
    newAddress,
  } = req.query;

  // CREATE NEW OBJECT
  const newClient = {
    client_id: (
      await generalModule.TEMPgenerateID(9000000000000, 9999999999999)
    ).toString(),
    company_id: company_id,
    clientFirstName: newFirstName,
    clientLastName: newLastName,
    clientEmail: newEmail,
    clientPhone: newPhone,
    clientDate: newDate,
    clientActive: newClientActive,
    clientWebsite: newWebsite,
    clientAddress: newAddress,
  };

  // SEND TO GENERAL MODULE
  try {
    const result = await generalModule.addToDatabase("Clients", newClient);

    res.status(200).json({
      message: "FROM clients.js, NEW Client ADDED:",
      data: newClient,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "FROM clients.js, ERROR UPDATING Client:",
      error: error.message,
    });
  }
});
// READ
router.get("/", async (req, res) => {
  try {
    const clients = await generalModule.getFromDatabase("Clients");
    // console.log("FROM clients.js, RESULTS FROM Clients TABLE: ", clients); // TESTING

    const formattedClients = clients.map((client) => {
      return {
        client_id: client.client_id,
        company_id: client.company_id,
        clientFirstName: client.clientFirstName,
        clientLastName: client.clientLastName,
        clientEmail: client.clientEmail,
        clientPhone: client.clientPhone,
        clientDate: client.clientDate,
        clientActive: client.clientActive,
        clientWebsite: client.clientWebsite,
        clientAddress: client.clientAddress,
      };
    });

    res.json(formattedClients);
  } catch (error) {
    res.status(500).json({
      message: "FROM clients.js, ERROR UPDATING Client:",
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
    editedClientActive,
    editedWebsite,
    editedAddress,
  } = req.query;

  // CREATE NEW ENTRY
  const clientDetails = {
    client_id: client_id,
    company_id: company_id,
    clientFirstName: editedFirstName,
    clientLastName: editedLastName,
    clientEmail: editedEmail,
    clientPhone: editedPhone,
    clientDate: editedDate,
    clientActive: editedClientActive,
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
// DELETE
router.delete("/", async (req, res) => {
  // GET PARAMS
  const { client_id, company_id } = req.query;

  // DEFINE PRIMARY AND SORT KEYS
  const key = {
    client_id: client_id,
    company_id: company_id,
  };

  try {
    console.log("Key being sent to DynamoDB:", key);
    const response = await generalModule.deleteFromDatabase("Clients", key);

    res.status(200).json({
      message: "FROM clients.js, SUCCESSFULLY DELETED Client:",
      result: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "FROM clients.js, ERROR DELETING Client:",
      error: error.message,
    });
  }
});

module.exports = router;
