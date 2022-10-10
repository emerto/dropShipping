import React from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import StoreWithProducts from "../components/StoreWithProducts";

import { useAuth } from "../context/AuthContext";

const Home = () => {
  const auth = useAuth();

  console.log(auth);
  return (
    <>
      <div className=" bg-gray-900 h-[100vh]">
        <Navbar />
        <StoreWithProducts />
        <StoreWithProducts />
      </div>
    </>
  );
};

export default Home;
