import React, { useState, useEffect } from "react";
import axios from "axios";
// const generalModule = require("/DataAccess/database.js");

const EquipmentGroups = () => {
  // NETWORK CONSTANTS
  const network_ip = "http://localhost";
  const router_port = ":5500";

  // STATE VARIABLES
  const [equipmentGroups, setEquipmentGroups] = useState([]);
  const [newEquipmentGroup, setNewEquipmentGroup] = useState({
    company_id: "",
    equipmentGroupName: "",
    equipmentGroupDescription: "",
    equipmentGroupDate: "", // <YYYY-MM-DD>
  });
  const [editEquipmentGroup, setEditEquipmentGroup] = useState({
    equipmentGroup_id: "",
    company_id: "",
    equipmentGroupName: "",
    equipmentGroupDescription: "",
    equipmentGroupDate: "", // <YYYY-MM-DD>
  });
  const [deleteEquipmentGroup_id, setDeleteEquipmentGroup_id] = useState({
    equipmentGroup_id: "",
    company_id: "",
  });

  useEffect(() => {
    getEquipmentGroups();
  }, []);

  // CREATE
  const addEquipmentGroup = async () => {
    console.log("ENTERING addEquipmentGroup()."); // TESTING
    try {
      const response = await axios.post(
        network_ip + router_port + "/equipmentGroups",
        {},
        {
          params: {
            equipment_id: Math.random().toString(36).substr(2, 9), // Temporary ID for testing
            company_id: newEquipmentGroup.company_id,
            equipmentGroupName: newEquipmentGroup.equipmentGroupName,
            equipmntGroupDescription:
              newEquipmentGroup.equipmentGroupDescription,
            equipmentGroupDate: newEquipmentGroup.equipmentGroupDate, // <YYYY-MM-DD>
          },
        }
      );

      // LOADS NEW DATA THEN RESETS ADD FIELDS
      getEquipmentGroups();
      setNewEquipmentGroup({
        company_id: "",
        equipmentGroupName: "",
        equipmentGroupDescription: "",
        equipmentGroupDate: "", // <YYYY-MM-DD>
      });
      console.log(
        "FROM pageEquipmentGroups.jsx, Equipment Group ADDED SUCCESSFULLY:",
        response
      );
    } catch (error) {
      console.error(
        "FROM pageEquipmentGroups.jsx, ERROR ADDING Equipment Group:",
        error
      );
    }
  };
  // READ
  const getEquipmentGroups = async () => {
    console.log("FROM getEquipmentGroups()."); // TESTING
    try {
      const response = await axios.get(
        network_ip + router_port + "/equipmentGroups"
      );
      setEquipmentGroups(response.data);
      // console.log("response.data: ", response.data); // TESTING
      // console.log("response: ", response); // TESTING
    } catch (error) {
      console.error(
        "FROM pageEquipmentGroups.jsx, ERROR GETTING Equipment Groups:",
        error
      );
    }
  };
  // UPDATE
  const updateEquipmentGroup = async () => {
    console.log(
      "FROM pageEquipmentGroups.jsx, editEquipmentGroup STATE:",
      editEquipmentGroup
    ); // TETING
    try {
      const response = await axios.patch(
        network_ip + router_port + "/equipmentGroups",
        {},
        {
          params: {
            // SEND THESE FROM THE req.params AS CONFIGURED IN route.js
            // THIS NEEDS TO BE UPDATED WITH VINHS BACKEND
            equipmentGroup_id: editEquipmentGroup.equipmentGroup_id,
            company_id: editEquipmentGroup.company_id,
            editedGroupName: editEquipmentGroup.equipmentGroupName,
            editedGroupDescription:
              editEquipmentGroup.equipmentGroupDescription,
            editedGroupDate: editEquipmentGroup.equipmentGroupDate,
          },
        }
      );

      // LOADS NEW DATA THEN RESETS FIELDS
      getEquipmentGroups();
      setEditEquipmentGroup({
        equipmentGroup_id: "",
        company_id: "",
        equipmentGroupName: "",
        equipmentGroupDescription: "",
        equipmentGroupDate: "", // <YYYY-MM-DD>
      });

      console.log(
        "FROM pageEquipmentGroups.jsx, Equipment Group EDITED:",
        response
      );
    } catch (error) {
      console.log(
        "FROM pageEquipmentGroups.jsx, ERROR EDITING Equipment Group:",
        error
      );
    }
  };
  // DELETE
  const deleteEquipmentGroup = async () => {
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
      setDeleteEquipmentGroup_id({
        equipmentGroup_id: "",
        company_id: "",
      });
      console.log(
        "FROM pageEquipmentGroups.jsx, Equipment Group DELETED: ",
        response
      );
    } catch (error) {
      console.log(
        "FROM pageEquipmentGroups.jsx, ERROR DELETING Equipment Group: ",
        error
      );
    }
  };

  // EDIT THE REST OF THE COMPONENT RETURN
  // ALL OF THE FUNCTIONS ABOVE HAVE BEEN ADJUSTED
  return (
    // COMPONENT DIV
    <div>
      {/* TITLE */}
      <h1>EQUIPMENT GROUPS PAGE</h1>

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
    </div>
  );
};

export default Clients;
