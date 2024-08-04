const express = require("express");
const generalModule = require("../Database.js");
const router = express.Router();

// NOTE: The purpose of these routes/x files is to
//       take the params of the http request
//       form an object to be uploaded/updated to the database
//       then send it over to the general module to post it

// CLIENTS PAGE
router.post("/", async (req, res) => {
  const {
    newFirstName,
    newLastName,
    newEmail,
    newPhone,
    newDate,
    newStatus,
    newWebsite,
    newAddress,
  } = req.query;

  const newClient = {
    clientFirstName: newFirstName,
    clientLastName: newLastName,
    clientEmail: newEmail,
    clientPhone: newPhone,
    clientDate: newDate,
    clientStatus: newStatus,
    clientWebsite: newWebsite,
    clientAddress: newAddress,
    client_id: (
      await generalModule.TEMPgenerateID(9000000000000, 9999999999999)
    ).toString(),
  };

  try {
    console.log("SENDING TO GEN MOD");
    await generalModule.addToDatabase("Clients", newClient);
    console.log("FROM clients.js, NEW Client ADDED: ");
  } catch (error) {
    console.error("FROM clients.js, ERROR CREATING NEW Client: ", error);
  }
});

router.patch("/", async (req, res) => {
  const {
    editedName,
    editedDate,
    editedEmail,
    editedPhoneNumber,
    editedWebsite,
    editedAddress,
    editedType,
    editedStatus,
    editedID,
  } = req.query;
  try {
    await generalModule.editClient(
      editedName,
      editedDate,
      editedEmail,
      editedPhoneNumber,
      editedWebsite,
      editedAddress,
      editedType,
      editedStatus,
      editedID
    );
    console.log("FROM clients.js, Client EDITED.");
  } catch (error) {
    console.error("FROM clients.js, ERROR EDITING Client: ", error);
  }
});
router.get("/", async (req, res) => {
  console.log("LINK ACCESSED");
  try {
    const clients = await clientsModule.getClients();
    const formattedClients = clients.map((client) => {
      return {
        clientName: client.clientName,
        clientDate: client.clientDate,
        clientEmail: client.clientEmail,
        clientPhoneNumber: client.clientPhoneNumber,
        clientWebsite: client.clientWebsite,
        clientAddress: client.clientAddress,
        clientType: client.clientType,
        clientStatus: client.clientStatus,
        // eventDesc: event.eventDesc || "",
        // eventsDA gives 'event_id' which is processed here and given to axios call
        clientID: client.client_id,
      };
    });

    res.json(formattedClients);
  } catch (error) {
    console.error("FROM clients.js, ERROR GETTING Clients: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/", async (req, res) => {
  const { clientID } = req.query;
  //   console.log("FROM clients.js: ", clientID);
  try {
    await clientsModule.deleteClient(clientID);
    console.log("FROM clients.js, Client: ${clientID} DELETED.");
  } catch (error) {
    console.error("FROM clients.js, Client COULD NOT BE DELETED: ", error);
  }
});

module.exports = router;
