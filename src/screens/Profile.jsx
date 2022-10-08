import React from "react";

import UserInfo from "../components/UserInfo";
import SideBar from "../components/SideBar";

const FirstAcc = () => {
  return (
    <div className="flex relative flex-row">
      <div className="relative h-[100vh]">
        <SideBar />
      </div>
      <div className="w-full relativea">
        <UserInfo />
      </div>
    </div>
  );
};

export default FirstAcc;
