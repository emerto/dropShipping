import React, { useEffect, useState, useRef } from "react";

import Navbar from "../components/Navbar";

import supabase from "../config/supaBaseClient";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import TestProdCard from "../components/TestProdCard";
import AddProductPopup from "../components/AddProductPopup";
import ProductCard from "../components/ProductCard";
import Spinner from "../utils/Spinner";

import Lottie from "lottie-web";

import notFound from "../animations/notFound.json";

const ManageStore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const animRef = useRef(null);
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
        setProducts([...data]);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    Lottie.loadAnimation({
      name: "notFound",
      container: animRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: notFound,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });
  }, [loading]);

  useEffect(() => {
    getProducts();
  }, []);

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
      <div className="flex flex-col bg-slate-900">
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
              <Spinner />
            ) : products.length > 0 ? (
              products.map((product) => (
                <TestProdCard product={product} key={product.id} />
              ))
            ) : (
              <div className="flex items-center justify-center w-full ">
                <div className="flex flex-col items-center justify-center">
                  <div ref={animRef} className="w-[350px] h-[350px]" />
                  <h1 className="text-white text-3xl">
                    No products found in this store
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStore;
