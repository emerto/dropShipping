import { useState, useEffect, useRef } from "react";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  BuildingStorefrontIcon,
  ShoppingCartIcon,
  UserIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { Cross as Hamburger } from "hamburger-react";
import Logo from "../assets/kazik.png";
import { useAuth } from "../context/AuthContext";
import Search from "./Search";

const Navbar = ({ setSearchReturn, setIsStoreRet }) => {
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const homeRef = useRef(null);
  const infoRef = useRef(null);
  const serviceRef = useRef(null);
  const contactRef = useRef(null);

  const changeSticky = () => {
    if (window.scrollY > 40) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };
  window.addEventListener("scroll", changeSticky);

  const auth = useAuth();

  return (
    <>
      <div className={`shadow-md z-20 w-full fixed top-0 left-0 active `}>
        <div
          className={`md:flex items-center justify-between h-24 bg-black py-4 duration-500 ${
            isSticky ? "bg-opacity-100" : "opacity-100 "
          }`}
        >
          <div className="font-bold text-2x1 cursor-pointer flex item-center font-[Poppins] text-gray-800">
            <span className="text-3x1  mr-1 pt-0">
              <div className="flex">
                <NavLink
                  to="../slider"
                  className={`text-2x1 ml-10 mt-0 block float-left duration-500 ${
                    open && "rotate-[-360deg]"
                  }`}
                ></NavLink>
                <h1
                  className={` text-black mt-2 ml-3 origin-left font-bold md:text-x1 text-2xl
            duration-500 `}
                >
                  <NavLink
                    className=" hamburger:text-2xl flex text-base"
                    to="/"
                    style={{ color: "inherit", backgroundColor: "inherit" }}
                  >
                    <img
                      src={Logo}
                      className="w-[150px] h[150px] object-cover"
                    />
                  </NavLink>
                </h1>
              </div>
            </span>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="absolute  right-8 top-7 md:top-8 cursor-pointer text-white hamburger:hidden "
          >
            <Hamburger size={30} className={`${open ? "close" : "menu"} `} />
          </div>
          <Search
            setSearchReturn={setSearchReturn}
            setIsStoreRet={setIsStoreRet}
          />
          <ul
            className={`hamburger:flex text-orange-400 mr-0 hamburger:items-center hamburger:pb-0 pb-12 absolute hamburger:static 
           hamburger:z-auto z-[-1] left-0 hamburger:pl-0 pl-0 transition-all flex flex-col hamburger:flex-row
           duration-500 ease-linear items-center ${
             open
               ? "left-0  top-[100px] flex flex-col w-full "
               : "left-[-1250px] top-[100px] "
           } ${isSticky ? "bg-opacity-80 " : "bg-opacity-100"} `}
          >
            {" "}
            <li className="flex hamburger:mr-16 hamburger:mt-2 mt-2">
              <NavLink
                className="italic text-primary hover:text-primary hamburger:not-italic text-lg flex items-center gap-x-4
                cursor-pointer"
                to={auth.user ? "/profile" : "/login"}
              >
                <div
                  className={`flex hamburger:ml-1 ml-0 hamburger:block
                  duration-500`}
                >
                  <div ref={infoRef} />
                  <UserIcon className="w-7 h-7" />
                </div>
              </NavLink>
            </li>
            <li className="flex hamburger:mr-16 hamburger:mt-2 mt-10">
              <NavLink
                className="italic text-primary hover:text-primary hamburger:not-italic text-lg flex items-center gap-x-4
                cursor-pointer"
                to="/StoreForm"
              >
                <div
                  className={`flex hamburger:ml-0 ml-0 hamburger:block
                  duration-500`}
                >
                  <div ref={serviceRef} />
                  <BuildingStorefrontIcon className="w-7 h-7" />
                </div>
              </NavLink>
            </li>
            <li className="flex hamburger:mr-16 hamburger:mt-2 mt-10">
              <NavLink
                className="italic text-primary hover:text-primary hamburger:not-italic text-lg flex items-center gap-x-4
                cursor-pointer"
                to="/cart"
              >
                <div
                  className={`flex hamburger:ml-0 ml-0 hamburger:block
                    duration-500`}
                >
                  <div ref={contactRef} />
                  <ShoppingCartIcon className="w-7 h-7" />
                </div>
              </NavLink>
            </li>
            {/* <li className="flex flex-row hamburger:mr-16 hamburger:mt-2 mt-10"> */}
            <li className="flex hamburger:mr-[50px] hamburger:mt-2 mt-10">
              <CurrencyDollarIcon className="w-7 h-7" />
              <p className="flex justify-center items-center content-center ml-1">
                {!auth.user.balance ? "0" : auth.user.balance}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
