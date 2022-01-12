import React from "react";

const User = () => {
  return (
    <div className="user-panel border-b p-10 d-flex">
      <div className="info">
        <img src="/images/user.png" className="user-image" />
      </div>
      <div className="pl-10 font16">
        <p className="t-white w-600">Mạc Trung Tình</p>
      </div>
    </div>
  );
};

export default User;
