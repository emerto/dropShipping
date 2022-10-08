import React, { useEffect, useState } from "react";
import supabase from "../config/supaBaseClient";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const getProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", auth.user.id)
      .single();

    setFirstName(data.first_name);
    setLastName(data.last_name);
    setUsername(data.username);
    setAddress(data.address);
    setPhoneNumber(data.phone_number);
    setEmail(data.email);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !username || !address || !phoneNumber) {
      toast.error(`Please fill all fields correctly!`, {
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

    try {
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        username: username,
        address: address,
        phone_number: phoneNumber,
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

  return (
    <section>
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
      <div className=" ">
        <div className="flex flex-col items-end w-[80vw] mt-0 px-6 py-8 mx-auto lg:py-0">
          <div className="w-full rounded-lg shadow dark:border md:mt-0 max-w-[50vw] xl:p-0 bg-secondary border-primary">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-secondary border-primary">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                USER PROFILE
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="submit"
                onSubmit={updateProfile}
              >
                <div className="flex flex-row">
                  <div className="mr-5 w-full">
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-start w-auto text-sm font-medium text-gray-300"
                    >
                      First Name
                    </label>
                    <input
                      type="first_name"
                      name="floating_first_name"
                      id="floating_first_name"
                      placeholder={firstName}
                      className="input-form bg-secondary focus:bg-neutral-700"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-start w-auto text-sm font-medium text-gray-300"
                    >
                      Last Name
                    </label>
                    <input
                      type="last_name"
                      name="floating_last_name"
                      id="floating_last_name"
                      placeholder={lastName}
                      className="input-form bg-secondary focus:bg-neutral-700"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className="mr-5 w-full">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-start text-sm font-medium text-gray-300"
                    >
                      Username
                    </label>
                    <input
                      type="username"
                      name="floating_username"
                      id="floating_username"
                      placeholder={username}
                      className="input-form bg-secondary focus:bg-neutral-700"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className=" w-full">
                    <label
                      htmlFor="telephone"
                      className="block mb-2 text-start text-sm font-medium text-gray-300"
                    >
                      Telephone
                    </label>
                    <input
                      type="telephone"
                      name="floating_telephone"
                      id="floating_telephone"
                      placeholder={phoneNumber}
                      className="input-form bg-secondary focus:bg-neutral-700"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-row w-full">
                  <div className="flex mr-5 flex-col w-full">
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-start text-sm font-medium text-gray-300"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        placeholder={email}
                        className="input-form bg-secondary focus:bg-neutral-700"
                        disabled
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className="block mb-2 text-start text-sm font-medium text-gray-300"
                        for="user_avatar"
                      >
                        Upload an image
                      </label>
                      <input
                        className="block  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-primary cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-secondary dark:border-primary dark:placeholder-gray-400"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        type="file"
                      />
                    </div>
                    {/* <div>
                      <label
                        htmlFor="address"
                        className="block mb-2 text-start text-sm font-medium text-gray-300"
                      >
                        Address
                      </label>
                      <input
                        type="address"
                        name="floating_address"
                        id="floating_address"
                        placeholder={address}
                        className="input-form p-7 bg-secondary focus:bg-neutral-700"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div> */}
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Address
                    </label>
                    <input
                      type="address"
                      name="floating_address"
                      id="floating_address"
                      placeholder={address}
                      className="input-form p-4 flex h-[115px] bg-secondary focus:bg-neutral-700"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  {/* <div className="w-full">
                    <label
                      className="block mb-2 text-start text-sm font-medium text-gray-300"
                      for="user_avatar"
                    >
                      Upload an image
                    </label>
                    <input
                      className="block h-[165px] w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-primary cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-secondary dark:border-primary dark:placeholder-gray-400"
                      aria-describedby="user_avatar_help"
                      id="user_avatar"
                      type="file"
                    />
                  </div> */}
                </div>
                <div className="flex items-start"></div>
                <div className="flex justify-end">
                  <button type="submit" className="btn-secondary">
                    Submit
                  </button>
                </div>
              </form>
              {/* <button
              onClick={handleLogout}
              className="py-4 px-10 bg-black  text-white rounded-lg"
            >
              logout
            </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
