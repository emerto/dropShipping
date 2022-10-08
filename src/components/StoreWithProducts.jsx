import React from "react";
import ProductCard from "./ProductCard";
import kazik from "../assets/kazik.png";

const StoreWithProducts = () => {
  return (
    <div>
      <section className="bg-gray-900 flex justify-center">
        <div className="flex flex-row mt-[150px] w-fill">
          <div className="border-2 border-mx flex flex-col gap-5 py-1  mx-auto w-auto   ">
            <div className="flex-row flex ">
              <div className="flex-col border-r-2 flex w-[230px] px-2">
                {/* <h1 className="text-2xl font-bold py-2 text-white">Kazik</h1> */}

                <div className=" bg-gray-800 my-3 rounded-2xl flex justify-center mx-6 py-3 h-fill w-[150px] ">
                  <p className="text-primary  text-sm font-bold mx-4 ">
                    StoreName
                  </p>
                </div>
                <div className="max-w-[230px] h-[280px] flex  ">
                  <img
                    className="rounded-xl mb-2 object-cover px-2 "
                    src="https://cdn.yenicaggazetesi.com.tr/news/2021/02/190220211531532978750.jpg"
                    alt="office content 1"
                  />
                </div>
              </div>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoreWithProducts;
