import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";

// PAGE COMPONENTS
import {
  PageHome,
  PageClients,
  PageEquipmentGroups,
  PageEquipment,
  PageCompanies,
  PageEmployees,
  PageHours,
  PageJobs,
  PageLogin,
  PageSchedule,
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
          <Route path="/pageCompanies" element={<PageCompanies />} />
          <Route path="/pageEmployees" element={<PageEmployees />} />
          <Route path="/pageHours" element={<PageHours />} />
          <Route path="/pageJobs" element={<PageJobs />} />
          <Route path="/pageLogin" element={<PageLogin />} />
          <Route path="/pageSchedule" element={<PageSchedule />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
