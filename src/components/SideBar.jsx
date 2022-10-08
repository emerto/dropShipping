import { NavLink } from "react-router-dom";
import Logo from "../assets/kazik.png";
import {
  ArrowPathIcon,
  ShoppingCartIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

import React, { useEffect, useState } from "react";
import supabase from "../config/supaBaseClient";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserSideBar = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        username: username,
        address: address,
        avatar_url: "https://kazik.com",
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <div>
      <aside className="w-64" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 h-[100vh] w-[23vw]  justify-center flex-col flex bg-gray-50 rounded dark:bg-gray-800">
          <div className="flex items-center pl-2.5 mb-5">
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
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 ml-5 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span classNameName="ml-3">
                  <img
                    className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src={Logo}
                  />
                </span>
                <span className="ml-3">Profile</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 ml-5 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="p-0 rounded-full ring-gray-300 dark:ring-gray-500">
                  <ArrowPathIcon className="w-10 h-10" />
                </span>
                <span className="ml-3">Orders</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 ml-5 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="p-0 rounded-full ring-gray-300 dark:ring-gray-500">
                  <ShoppingCartIcon className="w-10 h-10" />
                </span>
                <span className="ml-3">Orders</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 ml-5 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="p-0 rounded-full ring-gray-300 dark:ring-gray-500">
                  <ArrowRightOnRectangleIcon className="w-10 h-10" />
                </span>
                <span className="ml-3">Sign In</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 ml-5 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="p-0 rounded-full ring-gray-300 dark:ring-gray-500">
                  <ArrowLeftOnRectangleIcon className="w-10 h-10" />
                </span>
                <span className="ml-3">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default UserSideBar;
