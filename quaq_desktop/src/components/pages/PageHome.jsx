import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const PageHome = () => {
  return (
    <div id="mainDiv">
      <h1>Welcome to the Testing Home Page</h1>
      <div>
        <Link to="/pageClients">
          <button>Go to Clients Page</button>
        </Link>
      </div>
      <div>
        <Link to="/pageEquipmentGroups">
          <button>Go to Equipment Groups Page</button>
        </Link>
      </div>
      <div>
        <Link to="/pageEquipment">
          <button>Go to Equipment Page</button>
        </Link>
      </div>
    </div>
  );
};

export default PageHome;
