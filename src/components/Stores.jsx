import React from "react";
import kazik from "../assets/kazik.png";
const Stores = () => {
  return (
    <section className="bg-gray-900 mt-3">
      <div className="flex flex-col  ">
        <div className="border-2 flex flex-col gap-16 items-center py-8 px-4 mx-auto  ">
          <div className="gap-4 mt-8 flex center">
            <img
              className="max-w-[350px] max-h-[350px] rounded-lg align-middle flex center"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
            />
          </div>
          <div className="font-light text-gray-500 sm:text-lg ">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white ">
              We didn't reinvent the wheel
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stores;
