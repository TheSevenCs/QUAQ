import React from "react";
import { Link } from "react-router-dom";

const PageHome = () => {
  return (
    <div id="mainDiv">
      <h1>HOME PAGE</h1>
      <div>
        <Link to="/pageClients">
          <button>CLIENTS</button>
        </Link>
      </div>
      <div>
        <Link to="/pageEquipmentGroups">
          <button>EQUIPMENT GROUPS</button>
        </Link>
      </div>
      <div>
        <Link to="/pageEquipment">
          <button>EQUIPMENT</button>
        </Link>
      </div>
      <div>
        <Link to="/pageCompanies">
          <button>COMPANIES</button>
        </Link>
      </div>
      <div>
        <Link to="/pageEmployees">
          <button>EMPLOYEES</button>
        </Link>
      </div>
      <div>
        <Link to="/pageHours">
          <button>HOURS</button>
        </Link>
      </div>
      <div>
        <Link to="/pageJobs">
          <button>JOBS (PERSONAL SCHEDULE)</button>
        </Link>
      </div>
      <div>
        <Link to="/pageLogin">
          <button>LOGIN</button>
        </Link>
      </div>
      <div>
        <Link to="/pageSchedule">
          <button>SCHEDULE (COMPANY SCHEDULE)</button>
        </Link>
      </div>
      <div>
        <Link to="/pageJobSearch">
          <button>JOB SEARCH</button>
        </Link>
      </div>
    </div>
  );
};

export default PageHome;
