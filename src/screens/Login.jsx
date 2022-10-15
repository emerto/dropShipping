import React, { useState } from "react";

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
      <section className="bg-black">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
          <div className="w-full bg-secondary rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-primary">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Sign in to{" "}
                <span className="text-black bg-primary p-2 rounded-3xl :">
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
                    for="email"
                    className="block mb-2 text-sm font-medium text-primary"
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
                    for="password"
                    className="block mb-2 text-sm font-medium text-primary"
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
                  <div className="mt-1" onClick={togglePasswordVisiblity}>
                    {showPassword ? (
                      <EyeIcon className="w-[24px] h-[24px] text-primary " />
                    ) : (
                      <EyeSlashIcon className="w-[24px] h-[24px] text-primary" />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border  rounded  focus:ring-3 focus:ring-primary-300 bg-gray-700 :border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        for="remember"
                        className="text-primary font-medium"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary hover:underline "
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-black mt-5 bg-primary hover:bg-primary/90 transition-duration-75 ease-in-out focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-white">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary hover:underline "
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
