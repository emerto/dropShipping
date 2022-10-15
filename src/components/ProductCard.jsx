import React from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import EditProductPop from "./EditProductPop";

const ProductCard = () => {
  const auth = useAuth();
  console.log(auth);
  return (
    <section className="bg-gray-900 flex justify-center">
      <div className="flex flex-row ml-5 w-[250px]">
        <div className="border-2 flex flex-col gap-1 py-3 px-4 mx-auto w-[800px] border-gray-900 ">
          <div className="flex justify-end">
            {/* {auth.userData.has_store ? (
              <EditProductPop />
            ) : null} */}
          </div>
          <div className="gap-2 mt-8 flex justify-center ">
            <img
              className="object-cover w-max max-h-[200px] rounded-lg hover:transform  hover:scale-125 hover:-translate-y-5 transition duration-200 ease-in-out"
              src="https://cdn.britannica.com/60/222660-050-064DBA89/Dwayne-Johnson-AKA-The-Rock-2019.jpg"
              alt="office content 1"
            />
          </div>
          <div className=" sm:text-lg justify-center flex  ">
            <h2 className="mb-2 flex text-xl tracking-tight  font-normal text-white  ">
              Demir & Kazik
            </h2>
          </div>

          <div>
            <a
              href="#_"
              class="relative flex items-center justify-center  p-4 px-6 py-3 overflow-hidden font-medium text-primary transition duration-300 ease-out border-2 border-primary rounded-full shadow-md group"
            >
              <span class="absolute inset-0 flex items-center justify-center w-full h-full text-primary duration-300 -translate-x-full bg-gray-900 group-hover:translate-x-0 ease">
                <NavLink to="../cart" className="flex flex-row">
                  <ShoppingCartIcon className="h-[25px] end w-[50px]  text-primary " />
                  <p>Add To Cart</p> {/*BURAYA FİYATI KOYMAK LAZIM*/}
                </NavLink>
              </span>
              <span class="absolute flex flex-row items-center justify-center w-full h-full  transition-all duration-300 transform group-hover:translate-x-full ease">
                <p>12$</p>
              </span>
              <span class="relative invisible">Add To Card</span>
            </a>

            {/* <button className=" bg-gray-800  rounded-2xl flex justify-center py-3 h-fill w-fill hover:bg-gray-700  ">
              <ShoppingCartIcon className="h-[25px] end w-[50px]  text-primary " />
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
