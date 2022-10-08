import React, { useState } from "react";
import kazik from "../assets/kazik.png";

import supabase from "../config/supaBaseClient";
import { useAuth } from "../context/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StoreForm = () => {
  const [storename, setStorename] = useState("");
  const [storeaddress, setStoreaddress] = useState("");
  const [storephone, setStorephone] = useState("");

  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storename || !storeaddress || !storephone) {
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

    const { data, error } = await supabase.from("stores").insert([
      {
        owner: auth.user.id,
        store_name: storename,
        store_address: storeaddress,
        store_phone: storephone,
      },
    ]);

    if (error) {
      toast.error(`${error.message}!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    if (data) {
      toast.success(`Store added successfully!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
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
      <section id="StoreForm" className="bg-black mt-24">
        <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            <img
              className="w-[420px] h-[100px] object-cover"
              src={kazik}
              alt="logo"
            />
          </a>
          <div className="w-1/2 bg-secondary rounded-lg shadow md:mt-0 xl:p-0 border border-primary">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <h1 className="text-xl  font-bold leading-tight tracking-tight text-white md:text-2xl">
                Create{" "}
                <span className="text-black bg-primary p-2 rounded-3xl ">
                  Your Store
                </span>
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="submit"
                onSubmit={handleSubmit}
              >
                <div className="items-stretch md:flex-row flex-col flex">
                  <div className="mr-2 w-full">
                    <label
                      for="text"
                      className="block mb-2 md:mt-0 mt-4 text-sm font-medium text-primary"
                    >
                      Store Name
                    </label>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      className="input-form w-full"
                      placeholder="Erol's Store"
                      required=""
                      onChange={(e) => setStorename(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      for="telephone"
                      className="block mb-2 md:mt-0 mt-4 text-sm font-medium text-primary  "
                    >
                      Telephone Number
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      placeholder="+90 531 31 31"
                      className="input-form w-full "
                      required=""
                      onChange={(e) => setStorephone(e.target.value)}
                    />
                  </div>
                  {/* <div>
                    <label
                      for="text"
                      className="block mb-2 text-sm font-medium text-primary"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      className="input-form"
                      placeholder="Turkey"
                      required=""
                    />
                  </div> */}
                </div>
                <div>
                  <label
                    for="address"
                    className="block mb-2 text-sm font-medium text-primary "
                  >
                    Adress
                  </label>
                  <input
                    type="address"
                    name="address"
                    id="address"
                    placeholder="Atilim University"
                    className="input-form h-20"
                    required=""
                    onChange={(e) => setStoreaddress(e.target.value)}
                  />
                </div>
                <div className="max-w-[250px]">
                  <button
                    type="submit"
                    className="w-full  text-black mt-5 bg-primary hover:bg-primary/90 transition-duration-75 ease-in-out focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
                  >
                    Create Store
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StoreForm;
