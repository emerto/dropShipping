import React from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import StoreWithProducts from "../components/StoreWithProducts";

const Home = () => {
  return (
    <>
      <div className=" bg-gray-900 h-[100vh]">
        <Navbar />
        <StoreWithProducts />
        <StoreWithProducts />
        <StoreWithProducts />
      </div>
    </>
  );
};

export default Home;
