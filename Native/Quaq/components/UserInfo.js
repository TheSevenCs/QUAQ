import React, { createContext, useState, useContext } from "react";

// Create UserContext
const UserContext = createContext();

// Create a custom hook to use the UserContext
export const userInfo = () => useContext(UserContext);

// Create a provider component
export const UserProvider = ({ children }) => {
  const [employee_id, setEmployeeId] = useState(null);
  const [company_id, setCompanyId] = useState(null);

  return (
    <UserContext.Provider
      value={{ employee_id, setEmployeeId, company_id, setCompanyId }}
    >
      {children}
    </UserContext.Provider>
  );
};
