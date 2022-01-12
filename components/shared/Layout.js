import React, { createContext, useContext, useMemo, useState } from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import User from "./User";

export const LayoutContext = createContext();
export const useLayoutContext = () => useContext(LayoutContext);

const Layout = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(-1);
  const value = useMemo(
    () => ({
      activeMenu,
      setActiveMenu,
    }),
    [activeMenu]
  );
  return (
    <LayoutContext.Provider value={value}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 left-component">
            <Logo />
            <User />
            <Menu />
          </div>
          {children}
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
