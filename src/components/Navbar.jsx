import { useState, useEffect, useRef } from "react";
import React from "react";
import { NavLink } from "react-router-dom";

import { Cross as Hamburger } from "hamburger-react";

import { Link } from "react-scroll";

import lottie from "lottie-web";
import Home from "../animations/home.json";
import Info from "../animations/info.json";
import Gear from "../animations/gears.json";
import Contact from "../animations/contact.json";

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

  useEffect(() => {
    lottie.loadAnimation({
      name: "home",
      container: homeRef.current, // the dom element that will contain the animation
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: Home,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

    return () => {
      lottie.destroy();
    };
  }, []);

  useEffect(() => {
    lottie.loadAnimation({
      name: "info",
      container: infoRef.current, // the dom element that will contain the animation
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: Info,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

    return () => {
      lottie.destroy();
    };
  }, []);

  useEffect(() => {
    lottie.loadAnimation({
      name: "services",
      container: serviceRef.current, // the dom element that will contain the animation: ;
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: Gear,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

    return () => {
      lottie.destroy();
    };
  }, []);

  useEffect(() => {
    lottie.loadAnimation({
      name: "contact",
      container: contactRef.current, // the dom element that will contain the animation: ;
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: Contact,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

    return () => {
      lottie.destroy();
    };
  }, []);

  return (
    <>
      <div className={`shadow-md z-20 w-full fixed top-0 left-0 active `}>
        <div
          className={`md:flex items-center justify-between h-24 bg-white py-4 duration-500 ${
            isSticky ? "bg-opacity-80" : "opacity-100"
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
                  className={` text-black ml-3 origin-left font-bold mt-0 md:text-x1 text-2xl
            duration-500 `}
                >
                  <NavLink
                    className=" hamburger:text-2xl text-base"
                    to="/"
                    style={{ color: "inherit", backgroundColor: "inherit" }}
                  >
                    <span>dropSHIT</span>
                  </NavLink>
                </h1>
              </div>
            </span>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="absolute  right-8 top-6 md:top-8 cursor-pointer hamburger:hidden "
          >
            <Hamburger size={30} className={`${open ? "close" : "menu"} `} />
          </div>
          <ul
            className={`hamburger:flex mr-8 hamburger:items-center hamburger:pb-0 pb-12 absolute hamburger:static 
           hamburger:z-auto z-[-1] left-0 w-full hamburger:w-auto hamburger:pl-0 pl-9 transition-all 
          duration-500 ease-linear ${
            open ? "left-0 bg-white top-[100px]" : "left-[-750px] top-[100px]"
          } ${isSticky ? "bg-opacity-80 " : "bg-opacity-100"} `}
          >
            <li
              className="flex mr-5 md:mt-2 mt-10 "
              onMouseEnter={() => {
                lottie.setDirection(1);
                lottie.play("home");
              }}
              onMouseLeave={() => {
                lottie.setDirection(-1);
                lottie.play("home");
              }}
            >
              <NavLink
                className="italic hamburger:not-italic text-lg flex items-center gap-x-4
                cursor-pointer "
                to="/"
                style={{ color: "inherit", backgroundColor: "inherit" }}
              >
                <div
                  className={`flex hamburger:ml-1 ml-0 hamburger:block  
                  duration-500`}
                >
                  <div ref={homeRef} className="w-[35px] h-[35px]" />
                </div>
                Anasayfa
              </NavLink>
            </li>
            <li
              className="flex mr-5 hamburger:mt-2 mt-10"
              onMouseEnter={() => {
                lottie.setDirection(1);
                lottie.play("info");
              }}
              onMouseLeave={() => {
                lottie.stop("info");
              }}
            >
              <Link
                className="italic hamburger:not-italic text-lg flex items-center gap-x-4
                cursor-pointer "
                to="about"
                smooth={true}
                style={{ color: "inherit", backgroundColor: "inherit" }}
              >
                <div
                  className={`flex hamburger:ml-1 ml-0 hamburger:block 
                  duration-500`}
                >
                  <div ref={infoRef} className="w-[35px] h-[35px]" />
                </div>
                Hakkımızda
              </Link>
            </li>
            <li
              className="flex mr-5 hamburger:mt-2 mt-10"
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
                to="/hizmetlerimiz"
                style={{ color: "inherit", backgroundColor: "inherit" }}
              >
                <div
                  className={`flex hamburger:ml-0 ml-0 hamburger:block 
                  duration-500`}
                >
                  <div ref={serviceRef} className="w-[35px] h-[35px]" />
                </div>
                Hizmetlerimiz
              </NavLink>
            </li>
            <li
              className="flex mr-5 hamburger:mt-2 mt-10"
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
                  <div ref={contactRef} className="w-[35px] h-[35px]" />
                </div>
                İletişim
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
