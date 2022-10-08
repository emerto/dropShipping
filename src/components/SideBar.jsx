import { NavLink } from "react-router-dom";

import Logo from "../assets/kazik.png";
import {
  ArrowPathIcon,
  ShoppingCartIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

import React from "react";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserSideBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <div className="h-screen flex fixed">
      <aside className="w-64" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 h-screen w-[25vw] flex-col flex bg-gray-50 rounded dark:bg-gray-800">
          <div className="flex-[4] mt-5 pl-2.5 mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              <NavLink
                className="bg-green-300 md:text-2xl flex text-base"
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
          <div className="flex-[9] flex">
            <ul className="space-y-2">
              <li>
                <div className="flex items-center p-2 ml-5 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span className="ml-3">
                    <img
                      className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                      src={Logo}
                    />
                  </span>
                  <span className="ml-3">Profile</span>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 ml-5 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span className="p-0 rounded-full ring-gray-300 dark:ring-gray-500">
                    <ArrowPathIcon className="w-10 h-10" />
                  </span>
                  <span className="ml-3">Orders</span>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 ml-5 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span className="p-0 rounded-full ring-gray-300 dark:ring-gray-500">
                    <ShoppingCartIcon className="w-10 h-10" />
                  </span>
                  <span className="ml-3">Orders</span>
                </div>
              </li>
              <li>
                <div
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center p-2 ml-5 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="p-0 rounded-full ring-gray-300 dark:ring-gray-500">
                    <ArrowLeftOnRectangleIcon className="w-10 h-10" />
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
