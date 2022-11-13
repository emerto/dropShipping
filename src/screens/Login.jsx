import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import kazik from "../assets/kazik.png";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signIn = await auth.login(email, password);

    if (signIn.error) {
      setMessage(signIn.error.message);
      toast.error(`Hatalı mail ya da şifre!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      navigate("/");
    }
  };

  const togglePasswordVisiblity = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[100vh] base:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            <img
              className="w-[400px] h-[100px] object-cover "
              src={kazik}
              alt="logo"
            />
          </Link>
          <div className="w-full bg-secondary rounded-base shadow md:mt-0 sm:max-w-[400px] xl:p-0 border border-primary">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-2xl font-bold leading-tight tracking-normal text-white ">
                Sign in to{" "}
                <span className="text-black bg-primary p-2 rounded-md">
                  your account
                </span>
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="submit"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-base font-medium text-primary"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input-form border-none focus:ring-0"
                    placeholder="name@company.com"
                    required=""
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-base font-medium text-primary"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="input-form border-none focus:ring-0"
                    required=""
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="max-w-[24px] mt-2 cursor-pointer"
                    onClick={togglePasswordVisiblity}
                  >
                    {showPassword ? (
                      <EyeIcon className="w-[24px] h-[24px] text-primary " />
                    ) : (
                      <EyeSlashIcon className="w-[24px] h-[24px] text-primary" />
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-black mt-5 bg-primary hover:bg-primary/90 transition-duration-75 ease-in-out focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-xl text-lg px-5 py-1.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-base font-light text-white">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary hover:underline hover:text-primary/90"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
