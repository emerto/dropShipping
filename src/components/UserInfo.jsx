import React, { useEffect, useState } from "react";
import supabase from "../config/supaBaseClient";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Test from "../assets/kazik.png";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  //! Avatar
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const getProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", auth.user.id)
      .single();

    setAvatarUrl(data.avatar_url);
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

  const uploadAvatar = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (file) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${Date.now()}_${file.name}`, file);

      if (error) {
        console.log(error);
      }

      if (data) {
        setAvatarUrl(data.Key);
      }
    }
  };

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

    const user = supabase.auth.user();
    try {
      const updates = {
        id: user.id,
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        username: username,
        address: address,
        phone_number: phoneNumber,
        avatar_url: avatarUrl,
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

    try {
      const { error } = await supabase.from("customers").insert({
        customer_id: user.id,
      });

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
      <div className="">
        <div className="flex flex-col items-end w-[85vw] mt-0 px-6 py-8 mx-auto lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 max-w-[60vw] xl:p-0 bg-secondary border-primary">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-secondary border-primary">
              <h1 className="font-bold leading-tight tracking-tight text-2xl text-white">
                USER
                <span className="text-black bg-primary ml-1 p-2 py-[2px] rounded-3xl :">
                  PROFILE
                </span>
              </h1>
              {avatarUrl ? (
                <img
                  src={`https://tcvbahslxgfxsxqidkyy.supabase.co/storage/v1/object/public/${avatarUrl}`}
                  className="w-[60px] h-[60px] object-cover rounded-full"
                />
              ) : (
                <img
                  src={Test}
                  className="w-[60px] h-[60px] object-cover rounded-full"
                />
              )}
              <form
                className="space-y-4 md:space-y-6"
                action="submit"
                onSubmit={updateProfile}
              >
                <div className="flex flex-row">
                  <div className="mr-5 w-full">
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-start w-auto text-base font-medium text-gray-300"
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
                      className="block mb-2 text-start w-auto text-base font-medium text-gray-300"
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
                      className="block mb-2 text-start w-auto text-base font-medium text-gray-300"
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
                      className="block mb-2 text-start w-auto text-base font-medium text-gray-300"
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
                        className="block mb-2 text-start w-auto text-base font-medium text-gray-300"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        placeholder={email}
                        className="input-form focus:bg-neutral-700 block  w-full text-base rounded-lg border text-gray-400 focus:outline-none bg-secondary border-primary placeholder-gray-400"
                        disabled
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className="block mb-2 text-start w-auto text-base font-medium text-gray-300"
                        for="user_avatar"
                      >
                        Upload an image
                      </label>
                      <input
                        className="block w-full text-base rounded-lg border  text-gray-400 focus:outline-none bg-secondary border-primary placeholder-gray-400"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        type="file"
                        accept={"image/jpeg image/png"}
                        onChange={(e) => uploadAvatar(e)}
                        disabled={uploading}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-start w-auto text-base font-medium text-gray-300"
                    >
                      Address
                    </label>
                    <textarea
                      type="address"
                      name="floating_address"
                      id="floating_address"
                      placeholder={address}
                      className="input-form p-4 h-[115px] bg-secondary focus:bg-neutral-700 block  w-full text-base rounded-lg border  text-gray-400 focus:outline-none border-primary placeholder-gray-400"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
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
