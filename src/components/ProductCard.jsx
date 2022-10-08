import React from "react";
import kazik from "../assets/kazik.png";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const ProductCard = () => {
  return (
    <section className="bg-gray-900 flex justify-center">
      <div className="flex flex-row ml-5 w-[250px]">
        <div className="border-2 flex flex-col gap-1 py-3 px-4 mx-auto w-[800px] border-gray-900 ">
          <div className="gap-2 mt-8 flex justify-center ">
            <img
              className="object-cover w-max max-h-[200px] rounded-lg hover:transform  hover:scale-125 hover:-translate-y-5 transition duration-200 ease-in-out"
              src="https://cdn.britannica.com/60/222660-050-064DBA89/Dwayne-Johnson-AKA-The-Rock-2019.jpg"
              alt="office content 1"
            />
          </div>
          <div className=" sm:text-lg justify-center flex  ">
            <h2 className="mb-2 flex text-xl tracking-tight  font-normal text-white  ">
              Erol's Kayganlastirici
            </h2>
          </div>

          <div className="flex justify-center">
            <div className="border-1 flex  bg-primary rounded-2xl w-[200px] h-max justify-center ">
              <p className="text-black  text-sm font-bold ">12$</p>
            </div>
          </div>
          <button className=" bg-gray-800  rounded-2xl flex justify-center py-3 h-fill w-fill hover:bg-gray-700  ">
            <ShoppingCartIcon className="h-[25px] end w-[50px]  text-primary " />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
