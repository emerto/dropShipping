import React, { useState } from "react";
import supabase from "../config/supaBaseClient";

import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  const auth = useAuth();

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

  return (
    <section className="">
      <div className="flex flex-col items-end mr-[100px] justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 max-w-[50vw] xl:p-0 bg-green-300 border-green-400">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl dark:text-white">
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
                    className="block mb-2 text-start w-auto text-sm font-medium text-black"
                  >
                    First Name
                  </label>
                  <input
                    type="first_name"
                    name="floating_first_name"
                    id="floating_first_name"
                    placeholder="First Name"
                    className="input-form bg-white"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-start w-auto text-sm font-medium text-black"
                  >
                    Last Name
                  </label>
                  <input
                    type="last_name"
                    name="floating_last_name"
                    id="floating_last_name"
                    placeholder="Last Name"
                    className="input-form bg-white"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <div className="mr-5 w-full">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-start text-sm font-medium text-black"
                  >
                    Username
                  </label>
                  <input
                    type="username"
                    name="floating_username"
                    id="floating_username"
                    placeholder="Username"
                    className="input-form bg-white"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className=" w-full">
                  <label
                    htmlFor="telephone"
                    className="block mb-2 text-start text-sm font-medium text-black"
                  >
                    Telephone
                  </label>
                  <input
                    type="telephone"
                    name="floating_telephone"
                    id="floating_telephone"
                    placeholder="Telephone"
                    className="input-form bg-white"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-start text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  placeholder="Email"
                  className="input-form bg-white"
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-start text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="floating_password"
                  id="floating_password"
                  placeholder="********"
                  className="input-form bg-white"
                  disabled
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5"></div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="py-4 px-10 bg-black text-white rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
            <button
              onClick={auth.logout}
              className="py-4 px-10 bg-black text-white rounded-lg"
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
