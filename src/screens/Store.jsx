import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import supabase from "../config/supaBaseClient";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

import Lottie from "lottie-web";

import notFound from "../animations/notFound.json";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const animRef = useRef(null);
  const location = useLocation();
  const storeInfo = location.state;
  const { id, owner, store_name, store_description } = storeInfo;

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
        console.log(data);
        setProducts(data);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
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
            <div className="flex justify-between">
              <h1 className="text-5xl text-white tracking-wider">
                {store_name}
              </h1>
            </div>
            <div className="w-full h-1 bg-primary rounded-xl mt-3" />
          </div>
          <div className="flex justify-start flex-wrap gap-[20px] mt-5">
            {loading ? (
              <h1 className="text-white text-3xl">Loading...</h1>
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
