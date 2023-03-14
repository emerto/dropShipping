import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import supabase from "../config/supaBaseClient";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

import Spinner from "../utils/Spinner";

import Lottie from "lottie-web";

import notFound from "../animations/notFound.json";
import placeHolder from "../assets/shopPlaceholder.png";

const Store = () => {
  const [storeInfo, setStoreInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const animRef = useRef(null);

  let { name } = useParams();

  const getStoreInfo = async () => {
    try {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("store_name", name)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setStoreInfo(data);
        getProducts(data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (id) => {
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
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getStoreInfo();
  }, []);

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

  return (
    <div className="h-[100vh] bg-slate-900">
      <div className="flex flex-col bg-slate-900">
        <Navbar />
        <div className="flex flex-col mt-[130px] ml-[100px] max-w-[90%]">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="border-primary border-[0.25rem] w-[180px] h-[180px] rounded-full">
                <img
                  src={
                    storeInfo.store_image
                      ? `https://tcvbahslxgfxsxqidkyy.supabase.co/storage/v1/object/public/${storeInfo.store_image}`
                      : placeHolder
                  }
                  className="object-cover rounded-full"
                />
              </div>
              <h1 className="text-5xl ml-6 text-white tracking-wider">
                {storeInfo.store_name}
              </h1>
            </div>
            <div className="w-full h-1 bg-primary rounded-xl mt-5" />
          </div>
          <div className="flex justify-start flex-wrap gap-[20px] mt-5">
            {loading ? (
              <Spinner />
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard product={product} key={product.id} />
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

export default Store;
