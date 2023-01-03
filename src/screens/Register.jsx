import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import kazik from "../assets/kazik.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import supabase from "../config/supaBaseClient";

import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Modal } from "semantic-ui-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all the fields!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!re.test(email)) {
      toast.error("Please enter a valid email!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (!checked) {
      toast.error("Please accept the terms and conditions!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (user) {
      navigate("/profile");
    }

    if (error) {
      toast.error(
        { error },
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return;
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
                <span className="text-black bg-primary p-2 rounded-md">
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
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border  rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                      required=""
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-base">
                    <label htmlFor="terms" className="font-light text-white">
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline text-primary hover:text-primary/90 cursor-pointer"
                        onClick={() => setShowModal(true)}
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <Modal
                  onClose={() => setShowModal(false)}
                  onOpen={() => setShowModal(true)}
                  open={showModal}
                >
                  <Modal.Header style={{ color: "#FFFFFF" }}>
                    <div className="flex justify-between">
                      <h1>Terms and Conditions</h1>
                      <div className="flex h-[30px] bg-primary p-1 rounded-lg hover:bg-primary/90">
                        <button
                          className="flex text-white w-7 h-7"
                          onClick={() => setShowModal(false)}
                        >
                          <XMarkIcon className="text-white" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full mt-3 h-1 bg-primary rounded-xl " />
                  </Modal.Header>
                  <Modal.Content>
                    <h2 className="text-primary">Definitely not a scam</h2>
                    <p className="text-white text-base text-justify">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Qui iure error expedita omnis? Fuga magni nihil aliquid
                      deserunt repellat neque obcaecati, enim numquam veniam
                      odio blanditiis, porro eum quod earum. Lorem ipsum dolor,
                      sit amet consectetur adipisicing elit. Corrupti amet magni
                      dignissimos laboriosam sapiente debitis pariatur dolore
                      quia, nihil doloremque laudantium repellendus voluptates
                      possimus facilis delectus, aperiam alias, dolorem ut.
                    </p>
                    <h2 className="text-primary">This is Elon Ma</h2>
                    <p className="text-white text-base text-justify">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Atque, itaque. Numquam dicta ipsa provident tempora
                      exercitationem at natus, temporibus molestiae reiciendis
                      modi, et ducimus sed ad odit eos explicabo quis. Lorem
                      ipsum dolor sit amet consectetur adipisicing elit. Animi
                      distinctio deserunt blanditiis nostrum totam velit
                      excepturi, ad quisquam facere quas adipisci reprehenderit,
                      quasi porro minus maxime error repudiandae iste aliquam.
                    </p>
                    <h2 className="text-primary">
                      Togg otomobilimiz yerli ve milli
                    </h2>
                    <p className="text-white text-base text-justify">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Atque, itaque. Numquam dicta ipsa provident tempora
                      exercitationem at natus, temporibus molestiae reiciendis
                      modi, et ducimus sed ad odit eos explicabo quis.
                    </p>
                    <h2 className="text-primary">Disclaimer</h2>
                    <p className="text-white text-lg text-justify ">
                      This is a project for{" "}
                      <span className="text-primary text-2xl">
                        {" "}
                        CMPE 341 course
                      </span>
                      . We do not take any responsibility for any damages caused
                      by this project.
                    </p>
                  </Modal.Content>
                </Modal>
                <button type="submit" className="btn-primary">
                  Create an account
                </button>
                <p className="text-base font-light text-white ">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline text-primary hover:text-primary/90"
                  >
                    Login here
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

export default Register;
