import React from "react";
import ProductCard from "./ProductCard";
import kazik from "../assets/kazik.png";
const StoreWithProducts = () => {
  return (
    <div>
      <section className="bg-gray-900 flex justify-center">
        <div className="flex flex-row mt-[150px] w-fill">
          <div className="border-2 flex flex-col gap-5 py-1 px-4 mx-auto w-[800px]  ">
            <div className="justify-start gap-1 my-1">
              <div className="flex-row flex">
                <div className="flex-col border-r-2 flex w-[200px] ">
                  <h1 className="text-2xl font-bold py-2 text-white">Kazik</h1>
                  <img
                    className="w-max max-h-[200px] rounded-lg mb-2 flex flex-col"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                    alt="office content 1"
                  />
                </div>
                <ProductCard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoreWithProducts;
