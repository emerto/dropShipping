import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import kazik from "../assets/kazik.png";

import supabase from "../config/supaBaseClient";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (user) {
      navigate("/profile");
    }

    if (error) {
      alert(error.message);
    }
  };

  const togglePasswordVisiblity = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[100vh] md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold  text-white"
        >
          <img
            className="w-[400px] h-[100px] object-cover "
            src={kazik}
            alt="logo"
          />
        </Link>
        <div className="w-full rounded-base shadow border md:mt-0 sm:max-w-md xl:p-0 bg-secondary border-primary">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight tracking-normal text-white">
              Create{" "}
              <span className="text-black bg-primary p-2 rounded-3xl">
                an account
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
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="bingchilling@sheesh.com"
                  className="input-form border-none focus:ring-0"
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
                  placeholder="********"
                  className="input-form border-none focus:ring-0"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="mt-2" onClick={togglePasswordVisiblity}>
                  {showPassword ? (
                    <EyeIcon className="w-[24px] h-[24px] text-primary " />
                  ) : (
                    <EyeSlashIcon className="w-[24px] h-[24px] text-primary" />
                  )}
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border  rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-base">
                  <label htmlFor="terms" className="font-light text-white">
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline text-primary"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button type="submit" className="btn-primary">
                Create an account
              </button>
              <p className="text-base font-light text-white ">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline text-primary"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
