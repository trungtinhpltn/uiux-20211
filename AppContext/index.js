import React, { createContext, useContext, useMemo, useState } from "react";

const MyAppContext = createContext();

export const useAppContext = () => useContext(MyAppContext);

const AppContext = ({ children }) => {
  const [user, setUser] = useState();
  const value = useMemo(() => ({ user, setUser }), [user]);
  return <MyAppContext.Provider value={value}>{children}</MyAppContext.Provider>;
};

export default AppContext;
