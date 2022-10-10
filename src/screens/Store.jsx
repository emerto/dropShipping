import React from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Store = () => {
  return (
    <div className="bg-slate-900  mt-[95px]">
      <div>
        <Navbar />
        <div className="text-primary  flex bg-slate-900  justify-center w-full  text-4xl font-semibold">
          <h1 className=" ml-8 pt-5 mt-5 border-b-2 w-[250px] flex justify-center">
            Store Name
          </h1>
        </div>
        <div className="mx-36 grid xl:grid-cols-3 grid-cols-2 bg-gray-900">
          <div className="ml-4 mr-4 mt-10 border-2 border-primary rounded-lg ">
            <ProductCard />
          </div>
          <div className="ml-4 mr-4 mt-10 border-2 border-primary rounded-lg ">
            <ProductCard />
          </div>
          <div className="ml-4 mr-4 mt-10 border-2 border-primary rounded-lg ">
            <ProductCard />
          </div>
          <div className="ml-4 mr-4 mt-10 border-2 border-primary rounded-lg ">
            <ProductCard />
          </div>
          <div className="ml-4 mr-4 mt-10 border-2 border-primary rounded-lg ">
            <ProductCard />
          </div>
          <div className="ml-4 mr-4 mt-10 border-2 border-primary rounded-lg ">
            <ProductCard />
          </div>
          <div className="ml-4 mr-4 mt-10 border-2 border-primary rounded-lg ">
            <ProductCard />
          </div>{" "}
          <div className="ml-4 mr-4 mt-10 border-2 border-primary rounded-lg ">
            <ProductCard />
          </div>
          <div className="ml-4 mr-4 mt-10 border-2 border-primary rounded-lg ">
            <ProductCard />
          </div>
          <div className="ml-4 mr-4 mt-10 border-2 border-primary rounded-lg ">
            <ProductCard />
          </div>
          <div className="ml-4 mr-4 mt-10 border-2 border-primary rounded-lg ">
            <ProductCard />
          </div>
          <div className="ml-4 mr-4 mt-10 border-2 border-primary rounded-lg ">
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
