import React from "react";
import { Link } from "react-router-dom";

const PageEmployees = () => {
  return (
    <div>
      <Link to="/">
        <button>HOME PAGE</button>
      </Link>
      <h1>EMPLOYEES PAGE</h1>
    </div>
  );
};

export default PageEmployees;
