import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PageEquipment = () => {
  return (
    <div>
      <Link to="/">
        <button>HOME PAGE</button>
      </Link>
      <h1>EQUIPMENT PAGE</h1>
    </div>
  );
};

export default PageEquipment;
