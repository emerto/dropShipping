import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import supabase from "../config/supaBaseClient";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import AddProductPopup from "../components/AddProductPopup";

const ManageStore = () => {
  const [products, setProducts] = useState(null);
  const location = useLocation();
  const storeInfo = location.state;

  const { id, owner, store_name, store_description, store_image } = storeInfo;
  const user = supabase.auth.user();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (user.id != owner) {
      navigate("/");
    }
  }, []);

  const ProductPopup = () => {
    return (
      <div className="mt-5">
        <AddProductPopup storeId={id} />
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-gray-900">
      <Navbar />
      <div className="flex flex-col mt-[130px] ml-[100px] max-w-[90%]">
        <div className="flex flex-col justify-start ">
          <h1 className="text-5xl text-white tracking-wider">{store_name}</h1>
          <div className="w-full h-1 bg-primary rounded-xl " />
        </div>
        <div className="flex justify-start flex-wrap gap-[20px] ">
          {products ? <ProductCard /> : <ProductPopup />}
        </div>
      </div>
    </div>
  );
};

export default ManageStore;
