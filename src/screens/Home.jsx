import React from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <>
      <div className=" bg-gray-900 h-[100vh]">
        <Navbar />
        <ProductCard />
      </div>
    </>
  );
};

export default Home;
