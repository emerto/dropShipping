import React from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import StoreWithProducts from "../components/StoreWithProducts";

import { useAuth } from "../context/AuthContext";

const Home = () => {
  return (
    <>
      <div className=" bg-gray-900">
        <Navbar />
        <StoreWithProducts />
        <StoreWithProducts />
      </div>
    </>
  );
};

export default Home;
