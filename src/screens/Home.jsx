import React from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import StoreWithProducts from "../components/StoreWithProducts";

import { useAuth } from "../context/AuthContext";

const Home = () => {
  return (
    <>
      <div className="h-[100vh] bg-slate-900">
        <Navbar />
        <div className="mt-24">
          <StoreWithProducts />
          <StoreWithProducts />
        </div>
      </div>
    </>
  );
};

export default Home;
