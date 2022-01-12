import React from "react";

const Container = ({ children }) => {
  return (
    <div className="col-10 right-component">
      <div className="nav-bar p-10 d-flex justify-content-between align-items-center">
        <ul></ul>
        <ul>
          <li>
            <div className="info">
              <img src="/images/user.png" className="user-image" />
            </div>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
};

export default Container;
