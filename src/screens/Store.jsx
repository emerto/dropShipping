import React from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const Store = () => {
  return (
    <div className="bg-black mt-24">
      <div>
        <Navbar />
      </div>
      <div className="text-primary ml-8 text-4xl font-semibold">
        <div></div>
        <h1>Store Name</h1>
      </div>
      <div className="grid grid-cols-4 bg-gray-900">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default Store;
