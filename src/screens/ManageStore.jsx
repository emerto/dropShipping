import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import supabase from "../config/supaBaseClient";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import TestProdCard from "../components/TestProdCard";
import AddProductPopup from "../components/AddProductPopup";
import ProductCard from "../components/ProductCard";

const ManageStore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const storeInfo = location.state;

  const { id, owner, store_name, store_description, store_image } = storeInfo;
  const user = supabase.auth.user();
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("store_id", id);

      if (error) {
        throw error;
      }

      if (data) {
        setProducts(data);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [products]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (user.id != owner) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-[100vh] bg-slate-900">
      <div className="flex flex-col bg-gray-900">
        <Navbar />
        <div className="flex flex-col mt-[130px] ml-[100px] max-w-[90%]">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h1 className="text-5xl text-white tracking-wider">
                {store_name}
              </h1>
              <div className="mt-5 w-[200px]">
                <AddProductPopup storeId={id} />
              </div>
            </div>
            <div className="w-full h-1 bg-primary rounded-xl mt-3" />
          </div>
          <div className="flex justify-start flex-wrap gap-[20px] mt-5">
            {loading ? (
              <h1 className="text-white text-3xl">Loading...</h1>
            ) : products.length > 0 ? (
              products.map((product) => (
                <TestProdCard product={product} key={product.id} />
              ))
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStore;
