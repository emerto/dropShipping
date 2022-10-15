import { useState, useEffect, useRef } from "react";
import React from "react";
import { NavLink } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Cross as Hamburger } from "hamburger-react";

import { Link } from "react-scroll";
import Logo from "../assets/kazik.png";

import { useAuth } from "../context/AuthContext";

import lottie from "lottie-web";

const Navbar = () => {
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
            <span className="text-3x1 text-indigo-600 mr-1 pt-0">
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
                      className="w-[125px] h[125px] object-cover"
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
            <div className="flex hamburger:mr-16 h-[41px] hamburger:mb-0 mb-5 hamburger:mt-1 mt-[50px] space-x-2 bg-gray-300 p-2 rounded-xl ">
              <MagnifyingGlassIcon className="w-[24px] h-[24px]" />
              <input
                type="search"
                name="search"
                placeholder="Search"
                className="bg-transparent outline-none w-[200px] hamburger:w-[400px] text-black placeholder-gray-600 border-none focus:ring-0"
              />
            </div>
            <li
              className="flex hamburger:mr-16 hamburger:mt-2 mt-2"
              onMouseEnter={() => {
                lottie.setDirection(1);
                lottie.play("info");
              }}
              onMouseLeave={() => {
                lottie.stop("info");
              }}
            >
              <NavLink
                className="italic hamburger:not-italic text-lg flex items-center gap-x-4
                  cursor-pointer "
                to={auth.user ? "/profile" : "/login"}
                style={{ color: "inherit", backgroundColor: "inherit" }}
              >
                <div
                  className={`flex hamburger:ml-1 ml-0 hamburger:block
                    duration-500`}
                >
                  <div ref={infoRef} />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
              </NavLink>
            </li>
            <li
              className="flex hamburger:mr-16 hamburger:mt-2 mt-10"
              onMouseEnter={() => {
                lottie.play("services");
              }}
              onMouseLeave={() => {
                lottie.stop("services");
              }}
            >
              <NavLink
                className="italic hamburger:not-italic text-lg flex items-center gap-x-4
                  cursor-pointer "
                to="/StoreForm"
                style={{ color: "inherit", backgroundColor: "inherit" }}
              >
                <div
                  className={`flex hamburger:ml-0 ml-0 hamburger:block
                    duration-500`}
                >
                  <div ref={serviceRef} />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                    />
                  </svg>
                </div>
              </NavLink>
            </li>
            <li
              className="flex hamburger:mr-[100px] hamburger:mt-2 mt-10"
              onMouseEnter={() => {
                lottie.setDirection(1);
                lottie.play("contact");
              }}
              onMouseLeave={() => {
                lottie.stop("contact");
              }}
            >
              <Link
                className="italic hamburger:not-italic text-lg flex items-center gap-x-4
                  cursor-pointer "
                to="contact"
                smooth={true}
                style={{ color: "inherit", backgroundColor: "inherit" }}
              >
                <div
                  className={`flex ml-0 hamburger:ml-0 hamburger:block
                    duration-500`}
                >
                  <div ref={contactRef} />
                  <NavLink to={auth.user ? "/Cart" : "/login"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </NavLink>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
