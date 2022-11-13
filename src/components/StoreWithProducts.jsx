import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import placeHolder from "../assets/indir.jpg";
import supabase from "../config/supaBaseClient";

import { useNavigate } from "react-router-dom";

const StoreWithProducts = ({ store }) => {
  const [products, setProducts] = useState([]);
  const { store_name, store_image } = store;

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("store_id", store.id);

      if (error) {
        throw error;
      }

      if (data) {
        setProducts(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <section className="bg-slate-900 mt-16 flex justify-center">
        <div className="flex flex-row mt-16 w-full">
          <div className="border-2 border-mx flex flex-col gap-5 py-1  mx-auto w-auto   ">
            <div className="flex-row flex ">
              <div
                className="flex-col border-r-2 flex w-[230px] px-2 cursor-pointer"
                onClick={() =>
                  navigate(`/store/${store_name}`, { state: store })
                }
              >
                <div className=" bg-gray-800 my-3 rounded-2xl flex justify-center mx-6 py-3 h-fill w-[150px] ">
                  <p className="text-primary  text-sm font-bold mx-4 ">
                    {store_name}
                  </p>
                </div>
                <div className="max-w-[230px] h-[280px] flex ">
                  <img
                    className="rounded-xl mb-2 object-cover px-2 "
                    src={
                      store_image
                        ? `https://tcvbahslxgfxsxqidkyy.supabase.co/storage/v1/object/public/${store_image}`
                        : placeHolder
                    }
                    alt="office content 1"
                  />
                </div>
              </div>
              {products.slice(0, 4).map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoreWithProducts;
