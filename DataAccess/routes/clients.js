const express = require("express");
const generalModule = require("../database.js");
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
    console.log("FROM clients.js, NEW Client ADDED: ", result);
  } catch (error) {
    console.error("FROM clients.js, ERROR CREATING NEW Client: ", error);
  }
});
// READ
router.get("/", async (req, res) => {
  try {
    const clients = await generalModule.getClients();
    console.log("FROM clients.js, RESULTS FROM Clients TABLE: ", dbResults);

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
    console.error("FROM clients.js, ERROR GETTING Clients: ", error);
    res.status(500).json({ error: "Internal server error" });
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
  };

  try {
    const response = await generalModule.updateItemInDatabase(
      "Clients",
      primaryKey,
      updateExpression,
      expressionAttributeValues
    );

    console.log("FROM clients.js, Client EDITED: ", response);
  } catch (error) {
    console.error("FROM clients.js, ERROR EDITING Client: ", error);
  }
});
// DELETE
router.delete("/", async (req, res) => {
  const { client_id } = req.query;

  try {
    const response = await generalModule.deleteFromDatabase(client_id);
    console.log(`FROM clients.js, Client: ${clientID} DELETED: `, response);
  } catch (error) {
    console.error("FROM clients.js, Client COULD NOT BE DELETED: ", error);
  }
});

module.exports = router;
