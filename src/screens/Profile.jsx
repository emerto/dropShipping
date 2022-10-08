import React, { useEffect } from "react";

import UserInfo from "../components/UserInfo";
import SideBar from "../components/SideBar";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-row">
      <div className=" h-[100vh]">
        <SideBar />
      </div>
      <div className="flex bg-black w-full items-center justify-center">
        <UserInfo />
      </div>
    </div>
  );
};

export default Profile;
