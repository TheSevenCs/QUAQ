import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// const generalModule = require("/DataAccess/database.js");

const PageEquipmentGroups = () => {
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
            equipmentGroupDescription:
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
            client_id: deleteEquipmentGroup_id.client_id,
            company_id: deleteEquipmentGroup_id.company_id,
          },
        }
      );

      // LOADS NEW DATA THEN RESETS FIELDS
      getEquipmentGroups();
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
      <Link to="/">
        <button>HOME PAGE</button>
      </Link>

      {/* TITLE */}
      <h1>EQUIPMENT GROUPS PAGE</h1>

      {/* ADD EQUIPMENT GROUP */}
      <div>
        <h2>ADD NEW EQUIPMENT GROUP</h2>
        <input
          type="text"
          placeholder="company_id"
          value={newEquipmentGroup.company_id}
          onChange={(e) =>
            setNewEquipmentGroup({
              ...newEquipmentGroup,
              company_id: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="equipmentGroupName"
          value={newEquipmentGroup.equipmentGroupName}
          onChange={(e) =>
            setNewEquipmentGroup({
              ...newEquipmentGroup,
              equipmentGroupName: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="equipmentGroupDescription"
          value={newEquipmentGroup.equipmentGroupDescription}
          onChange={(e) =>
            setNewEquipmentGroup({
              ...newEquipmentGroup,
              equipmentGroupDescription: e.target.value,
            })
          }
        />
        <input
          type="date"
          placeholder="equipmentGroupDate"
          value={newEquipmentGroup.equipmentGroupDate}
          onChange={(e) =>
            setNewEquipmentGroup({
              ...newEquipmentGroup,
              equipmentGroupDate: e.target.value,
            })
          }
        />

        <button onClick={addEquipmentGroup}>ADD EQUIPMENT GROUP</button>
      </div>

      {/* LOAD CLIENT */}
      <div>
        <h2>LOAD BUTTON</h2>
        <button onClick={getEquipmentGroups}>GET EQUIPMENT GROUPS</button>
      </div>

      {/* UPDATE CLIENT */}
      <div>
        <h2>UPDATE EQUIPMENT GROUP</h2>
        <input
          type="text"
          placeholder="client_id"
          value={editEquipmentGroup.equipmentGroup_id}
          onChange={(e) =>
            setEditEquipmentGroup({
              ...editEquipmentGroup,
              equipment_id: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="company_id"
          value={editEquipmentGroup.company_id}
          onChange={(e) =>
            setEditEquipmentGroup({
              ...editEquipmentGroup,
              company_id: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="equipmentGroupName"
          value={editEquipmentGroup.equipmentGroupName}
          onChange={(e) =>
            setEditEquipmentGroup({
              ...editEquipmentGroup,
              equipmentGroupName: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="equipmentGroupDescription"
          value={editEquipmentGroup.equipmentGroupDescription}
          onChange={(e) =>
            setEditEquipmentGroup({
              ...editEquipmentGroup,
              equipmentGroupDescription: e.target.value,
            })
          }
        />
        <input
          type="date"
          placeholder="Date"
          value={editEquipmentGroup.equipmentGroupDate}
          onChange={(e) =>
            setEditEquipmentGroup({
              ...editEquipmentGroup,
              equipmentGroupDate: e.target.value,
            })
          }
        />
        <button onClick={updateEquipmentGroup}>UPDATE EQUIPMENT GROUP</button>
      </div>

      {/* DELETE CLIENT */}
      <div>
        <h2>DELETE BY CLIENT ID</h2>
        <input
          type="text"
          placeholder="DELETE EQUIPMENT GROUP ID"
          value={deleteEquipmentGroup_id.equipmentGroup_id}
          onChange={(e) =>
            setDeleteEquipmentGroup_id({
              ...deleteEquipmentGroup_id,
              client_id: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="DELETE COMPANY ID"
          value={deleteEquipmentGroup_id.company_id}
          onChange={(e) =>
            setDeleteEquipmentGroup_id({
              ...deleteEquipmentGroup_id,
              company_id: e.target.value,
            })
          }
        />
        <button onClick={deleteEquipmentGroup}>DELETE EQUIPMENT GROUPS</button>
      </div>

      <h2>EQUIPMENT GROUPS LIST</h2>
      <ul>
        {equipmentGroups.map((client) => (
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

export default PageEquipmentGroups;
