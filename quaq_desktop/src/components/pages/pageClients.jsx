import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// const generalModule = require("/DataAccess/database.js");

const PageClients = () => {
  const network_ip = "http://localhost";
  const router_port = ":5500";

  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    company_id: "",
    clientFirstName: "",
    clientLastName: "",
    clientEmail: "",
    clientPhone: "",
    clientDate: "",
    clientActive: "true",
    clientWebsite: "",
    clientAddress: "",
  });
  const [editClient, setEditClient] = useState({
    client_id: "",
    company_id: "",
    clientFirstName: "",
    clientLastName: "",
    clientEmail: "",
    clientPhone: "",
    clientDate: "",
    clientActive: "",
    clientWebsite: "",
    clientAddress: "",
  });
  const [deleteClient_id, setDeleteClient_id] = useState({
    client_id: "",
    company_id: "",
  });

  const [clientIdForJobSearch, setClientIdForJobSearch] = useState("");
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    getClients();
  }, []);

  // CREATE
  const addClient = async () => {
    console.log("ENTERING addClient().");
    try {
      const response = await axios.post(
        network_ip + router_port + "/clients",
        {},
        {
          params: {
            client_id: Math.random().toString(36).substr(2, 9), // Temporary ID for testing
            company_id: newClient.company_id,
            newFirstName: newClient.clientFirstName,
            newLastName: newClient.clientLastName,
            newEmail: newClient.clientEmail,
            newPhone: newClient.clientPhone,
            newDate: newClient.clientDate,
            newClientActive: newClient.clientActive,
            newWebsite: newClient.clientWebsite,
            newAddress: newClient.clientAddress,
          },
        }
      );

      // LOADS NEW DATA THEN RESETS ADD FIELDS
      getClients();
      setNewClient({
        company_id: "",
        clientFirstName: "",
        clientLastName: "",
        clientEmail: "",
        clientPhone: "",
        clientDate: "",
        clientActive: "true",
        clientWebsite: "",
        clientAddress: "",
      });
      console.log("FROM pageClients.jsx, Client ADDED SUCCESSFULLY:", response);
    } catch (error) {
      console.error("FROM pageCLients.jsx, ERROR ADDING Client:", error);
    }
  };
  // READ
  const getClients = async () => {
    console.log("FROM getClients."); // TESTING
    try {
      const response = await axios.get(network_ip + router_port + "/clients");
      setClients(response.data);
      // console.log("response.data: ", response.data); // TESTING
      // console.log("response: ", response); // TESTING
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };
  // UPDATE
  const updateClient = async () => {
    console.log("FROM pageClients.jsx, editClient STATE:", editClient);
    try {
      const response = await axios.patch(
        network_ip + router_port + "/clients",
        {},
        {
          params: {
            // SEND THESE FROM THE req.params AS CONFIGURED IN route.js
            client_id: editClient.client_id,
            company_id: editClient.company_id,
            editedFirstName: editClient.clientFirstName,
            editedLastName: editClient.clientLastName,
            editedEmail: editClient.clientEmail,
            editedPhone: editClient.clientPhone,
            editedDate: editClient.clientDate,
            editedActive: editClient.clientActive,
            editedWebsite: editClient.clientWebsite,
            editedAddress: editClient.clientAddress,
          },
        }
      );

      // LOADS NEW DATA THEN RESETS FIELDS
      getClients();
      setEditClient({
        client_id: "",
        company_id: "",
        clientFirstName: "",
        clientLastName: "",
        clientEmail: "",
        clientPhone: "",
        clientDate: "",
        clientActive: "", // Setting this to null causes error with toString()
        clientWebsite: "",
        clientAddress: "",
      });

      console.log("FROM pageClients.jsx, Client EDITED:", response);
    } catch (error) {
      console.log("FROM pageClients.jsx, ERROR EDITING Client:", error);
    }
  };
  // DELETE
  const deleteClient = async () => {
    try {
      const response = await axios.delete(
        network_ip + router_port + "/clients",
        {
          params: {
            client_id: deleteClient_id.client_id,
            company_id: deleteClient_id.company_id,
          },
        }
      );

      // LOADS NEW DATA THEN RESETS FIELDS
      getClients();
      setDeleteClient_id({
        client_id: "",
        company_id: "",
        clientFirstName: "",
        clientLastName: "",
        clientEmail: "",
        clientPhone: "",
        clientDate: "",
        clientActive: "",
        clientWebsite: "",
        clientAddress: "",
      });
      console.log("FROM pageClients.jsx, Client DELETED: ", response);
    } catch (error) {
      console.log("FROM pageClients.jsx, ERROR DELETING Client: ", error);
    }
  };
  // JOB SEARCH BY CLIENT ID
  const searchJobByClientId = async () => {
    try {
      const response = await axios.get(
        network_ip + router_port + "/jobsByClientFunc"
      );
      setJobData(response.data);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  return (
    // COMPONENT DIV
    <div>
      <Link to="/">
        <button>HOME PAGE</button>
      </Link>
      {/* TITLE */}
      <h1>CLIENTS PAGE</h1>

      {/* ADD CLIENT */}
      <div>
        <h2>ADD NEW CLIENT</h2>
        <input
          type="text"
          placeholder="company_id"
          value={newClient.company_id}
          onChange={(e) =>
            setNewClient({ ...newClient, company_id: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="First Name"
          value={newClient.clientFirstName}
          onChange={(e) =>
            setNewClient({ ...newClient, clientFirstName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newClient.clientLastName}
          onChange={(e) =>
            setNewClient({ ...newClient, clientLastName: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={newClient.clientEmail}
          onChange={(e) =>
            setNewClient({ ...newClient, clientEmail: e.target.value })
          }
        />
        <input
          type="tel"
          placeholder="Phone"
          value={newClient.clientPhone}
          onChange={(e) =>
            setNewClient({ ...newClient, clientPhone: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Date"
          value={newClient.clientDate}
          onChange={(e) =>
            setNewClient({ ...newClient, clientDate: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Website"
          value={newClient.clientWebsite}
          onChange={(e) =>
            setNewClient({ ...newClient, clientWebsite: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Address"
          value={newClient.clientAddress}
          onChange={(e) =>
            setNewClient({ ...newClient, clientAddress: e.target.value })
          }
        />
        <button onClick={addClient}>ADD CLIENT</button>
      </div>

      {/* LOAD CLIENT */}
      <div>
        <h2>LOAD BUTTON</h2>
        <button onClick={getClients}>GET CLIENTS</button>
      </div>

      {/* UPDATE CLIENT */}
      <div>
        <h2>UPDATE CLIENT</h2>
        <input
          type="text"
          placeholder="client_id"
          value={editClient.client_id}
          onChange={(e) =>
            setEditClient({ ...editClient, client_id: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="company_id"
          value={editClient.company_id}
          onChange={(e) =>
            setEditClient({ ...editClient, company_id: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="First Name"
          value={editClient.clientFirstName}
          onChange={(e) =>
            setEditClient({ ...editClient, clientFirstName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          value={editClient.clientLastName}
          onChange={(e) =>
            setEditClient({ ...editClient, clientLastName: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={editClient.clientEmail}
          onChange={(e) =>
            setEditClient({ ...editClient, clientEmail: e.target.value })
          }
        />
        <input
          type="tel"
          placeholder="Phone"
          value={editClient.clientPhone}
          onChange={(e) =>
            setEditClient({ ...editClient, clientPhone: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Date"
          value={editClient.clientDate}
          onChange={(e) =>
            setEditClient({ ...editClient, clientDate: e.target.value })
          }
        />
        <select
          name="clientActive"
          value={editClient.clientActive.toString()}
          onChange={(e) =>
            setEditClient({ ...editClient, clientActive: e.target.value })
          }
        >
          <option value={"true"}>Active/True</option>
          <option value={"false"}>Inactive/False</option>
        </select>
        <input
          type="text"
          placeholder="Website"
          value={editClient.clientWebsite}
          onChange={(e) =>
            setEditClient({ ...editClient, clientWebsite: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Address"
          value={editClient.clientAddress}
          onChange={(e) =>
            setEditClient({ ...editClient, clientAddress: e.target.value })
          }
        />
        <button onClick={updateClient}>UPDATE CLIENT</button>
      </div>

      {/* DELETE CLIENT */}
      <div>
        <h2>DELETE BY CLIENT ID</h2>
        <input
          type="text"
          placeholder="DELETE CLIENT ID"
          value={deleteClient_id.client_id}
          onChange={(e) =>
            setDeleteClient_id({
              ...deleteClient_id,
              client_id: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="DELETE COMPANY ID"
          value={deleteClient_id.company_id}
          onChange={(e) =>
            setDeleteClient_id({
              ...deleteClient_id,
              company_id: e.target.value,
            })
          }
        />
        <button onClick={deleteClient}>DELETE CLIENT</button>
      </div>

      <h2>Client List</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.client_id}>
            {Object.entries(client).map(([key, value]) => (
              <span key={key}>
                {key}: {value}{" "}
              </span>
            ))}
          </li>
        ))}
      </ul>

      {/* JOB SEARCH BY CLIENT ID */}
      <div>
        <h2>JOB SEARCH BY CLIENT ID</h2>
        <input
          type="text"
          placeholder="Enter Client ID"
          value={clientIdForJobSearch}
          onChange={(e) => setClientIdForJobSearch(e.target.value)}
        />
        <button onClick={searchJobByClientId}>SEARCH JOBS</button>
        {jobData && (
          <div>
            <h3>Job Data:</h3>
            <pre>{JSON.stringify(jobData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div> // MAIN DIV END
  );
};

export default PageClients;
