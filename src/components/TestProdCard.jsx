import React from "react";
// import { useAuth } from "../context/AuthContext";
// import { NavLink } from "react-router-dom";
// import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import EditProductPop from "./EditProductPop";

const TestProdCard = ({ product }) => {
  return (
    <section className="bg-slate-900 flex justify-center">
      <div className="flex flex-row ml-5 w-[250px]">
        <div className="border-2 flex flex-col gap-1 py-3 px-4 mx-auto w-[800px] border-primary rounded-lg">
          <div className="flex justify-end">
            <div className="flex justify-end">
              <EditProductPop product={product} />
            </div>
          </div>

          <div className="gap-2 mt-8 flex justify-center ">
            <img
              className="object-cover w-max min-h-[200px] max-h-[200px] rounded-lg hover:transform  hover:scale-[1.16] hover:-translate-y-5 transition duration-200 ease-in-out"
              src={product.supplier_prod_image}
              alt="office content 1"
            />
          </div>
          <div className="mt-2 sm:text-lg justify-center flex  ">
            <div className="flex justify-between w-full text-xl text-white  ">
              <p>{product.name}</p>
              <p>${product.price}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestProdCard;
