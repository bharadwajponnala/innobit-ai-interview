import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [queryParams, setQueryParams] = useState({});

  return (
      <AppContext.Provider value={{ queryParams, setQueryParams }}>
        {children}
      </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);