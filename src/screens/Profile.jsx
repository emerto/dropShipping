import React from "react";

import UserInfo from "../components/UserInfo";
import SideBar from "../components/SideBar";

const FirstAcc = () => {
  return (
    <div className="flex flex-row">
      <div className=" h-[100vh]">
        <SideBar />
      </div>
      <div className="flex ml-36 items-center justify-center">
        <UserInfo />
      </div>
    </div>
  );
};

export default FirstAcc;
