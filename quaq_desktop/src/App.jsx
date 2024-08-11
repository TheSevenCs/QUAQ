import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";

// PAGE COMPONENTS
import {
  PageHome,
  PageClients,
  PageEquipmentGroups,
  PageEquipment,
} from "./components/pages";

const App = () => {
  return (
    <BrowserRouter>
      <div id="mainDiv">
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/pageClients" element={<PageClients />} />
          <Route
            path="/pageEquipmentGroups"
            element={<PageEquipmentGroups />}
          />
          <Route path="/pageEquipment" element={<PageEquipment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
