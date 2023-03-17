import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Logo from "../assets/kazik.png";
import {
  ArrowPathIcon,
  ShoppingCartIcon,
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";

import { useAuth } from "../context/AuthContext";
import supabase from "../config/supaBaseClient";
import { useNavigate } from "react-router-dom";

const UserSideBar = () => {
  const [storeInfo, setStoreInfo] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  const getStoreInfo = async () => {
    const { data: storeInfo, error } = await supabase
      .from("stores")
      .select("*")
      .eq("owner", auth.user.id)
      .single();

    if (storeInfo) {
      setStoreInfo(storeInfo);
    }
  };

  const navToStore = () => {
    navigate(`/store/${storeInfo.store_name}`, { state: storeInfo });
  };

  useEffect(() => {
    if (auth.isDropShipper) {
      getStoreInfo();
    }
  }, []);

  return (
    <div className="h-screen flex fixed">
      <aside className="w-64" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 h-screen w-[20vw] flex-col flex bg-black rounded ">
          <div className="flex-[6] mt-5 pl-2.5 mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              <NavLink
                className="bg-green-300 md:text-2xl flex text-2xl"
                to="/"
                style={{ color: "inherit", backgroundColor: "inherit" }}
              >
                <img
                  src={Logo}
                  className="ml-5 relative mr-5 max-w-[200px]  max-h-[60px] object-fit"
                />
              </NavLink>
            </span>
          </div>
          <div className="flex-[9] flex ">
            <ul className="space-y-2 w-full">
              {auth.isDropShipper ? (
                <li onClick={() => navigate("/receivedorders")}>
                  <div className="flex pr-[50px] cursor-pointer items-center p-2 ml-5 text-2xl font-normal  rounded-lg text-white hover:bg-gray-700">
                    <span className="p-0 rounded-full ring-gray-500">
                      <ClipboardDocumentListIcon className="w-12 h-12" />
                    </span>
                    <span className="ml-3">Received Orders</span>
                  </div>
                </li>
              ) : null}
              <li onClick={() => navigate("/orders")}>
                <div className="flex pr-[50px] cursor-pointer items-center p-2 ml-5 text-2xl font-normal  rounded-lg text-white hover:bg-gray-700">
                  <span className="p-0 rounded-full ring-gray-500">
                    <ArrowPathIcon className="w-12 h-12" />
                  </span>
                  <span className="ml-3">Orders</span>
                </div>
              </li>
              {auth.isDropShipper ? (
                <li onClick={navToStore}>
                  <div className="flex pr-[50px] cursor-pointer items-center p-2 ml-5 text-2xl font-normal  rounded-lg text-white hover:bg-gray-700">
                    <span className="p-0 rounded-full ring-gray-500">
                      <ShoppingCartIcon className="w-12 h-12" />
                    </span>
                    <span className="ml-3">View Store</span>
                  </div>
                </li>
              ) : null}
              <li>
                <div
                  onClick={handleLogout}
                  className="flex pr-[50px] cursor-pointer items-center p-2 ml-5 text-2xl font-normal  rounded-lg text-white hover:bg-gray-700"
                >
                  <span className="p-0 rounded-full ring-gray-500">
                    <ArrowLeftOnRectangleIcon className="w-12 h-12" />
                  </span>
                  <span className="ml-3">Sign Out</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default UserSideBar;
