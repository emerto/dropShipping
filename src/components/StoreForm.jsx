import React from "react";
import kazik from "../assets/kazik.png";
const StoreForm = () => {
  return (
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
            <h1 className="text-xl flex flex-col font-bold leading-tight tracking-tight text-white md:text-2xl">
              Create{" "}
              <span className="text-black bg-primary p-2 rounded-3xl ">
                Your Store
              </span>
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div className="items-stretch md:flex-row flex-col flex">
                <div className="w-full mr-5">
                  <label
                    for="text"
                    className="block mb-2 text-sm font-medium text-primary"
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
                  />
                </div>

                <div className="w-full mr-5">
                  <label
                    for="telno"
                    className="block mb-2 md:mt-0 mt-4 text-sm font-medium text-primary  "
                  >
                    Telephone Number
                  </label>
                  <input
                    type="number "
                    name="number"
                    id="phone-number"
                    placeholder="+90 531 31 31"
                    className="input-form w-full  "
                    required=""
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
                  for="telno"
                  className="block mb-2 text-sm font-medium text-primary "
                >
                  Adress
                </label>
                <input
                  type="number "
                  name="number"
                  id="phone-number"
                  placeholder="Atilim University"
                  className="input-form h-20"
                  required=""
                />
              </div>
              <div>
                <label
                  for="confirm-password"
                  className="block mb-2 text-sm font-medium text-primary"
                >
                  Please type your password to confirm
                </label>
                <input
                  type="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="input-form"
                  required=""
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
  );
};

export default StoreForm;
