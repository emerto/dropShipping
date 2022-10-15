import React from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import AddProductPopup from "../components/AddProductPopup";

const Store = () => {
  // const { state } = useLocation();
  // const { store_name, store_address, store_phone } = state;

  return (
    <div className="bg-slate-900  mt-[95px]">
      <div>
        <Navbar />
        <div className="text-primary  flex bg-slate-900  justify-center w-full  text-4xl font-semibold">
          <h1 className=" ml-8 pt-5 mt-5 border-b-2 w-[250px] flex justify-center">
            Store
          </h1>
          <AddProductPopup />
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
        </div>
      </div>
    </div>
  );
};

export default Store;
