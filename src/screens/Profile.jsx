import React from "react";

import UserInfo from "../components/UserInfo";
import SideBar from "../components/SideBar";

const FirstAcc = () => {
  return (
    <div className="flex flex-col">
      <SideBar />
      <UserInfo />
    </div>
  );
};

export default FirstAcc;
