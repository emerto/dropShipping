import { React, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  product.quantity = 1;
  const GlobalState = useContext(CartContext);
  const dispatch = GlobalState.dispatch;
  const auth = useAuth();

  return (
    <>
      <section className="flex justify-center">
        <div className="flex flex-row ml-5 w-[250px]">
          <div className="flex flex-col gap-1 py-3 px-4 mx-auto w-[800px]">
            <div className="flex justify-end">
              {/* {auth.userData.has_store ? (
              <EditProductPop />
            ) : null} */}
            </div>

            <div className="gap-2 mt-8 flex justify-center ">
              <img
                className="object-cover w-max h-[200px] rounded-lg hover:transform  hover:scale-110 hover:-translate-y-5 transition duration-200 ease-in-out"
                src={product.supplier_prod_image}
                alt="office content 1"
              />
            </div>
            <div className=" sm:text-lg justify-center flex  ">
              <h2 className="mb-2 flex text-xl tracking-tight  font-normal text-white  ">
                {product.name}
              </h2>
            </div>

            <div>
              <div
                className="relative flex items-center justify-center  p-4 px-6 py-3 overflow-hidden font-medium text-primary transition duration-300 ease-out border-2 border-primary
             rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-primary duration-300 -translate-x-full  group-hover:translate-x-0 ease">
                  {auth.user && (
                    <button
                      onClick={() => {
                        if (product.store_id === auth.user.store.id) {
                          toast.error(
                            "You can't add your own product to cart.",
                            {
                              position: "bottom-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                            }
                          );
                        } else if (
                          GlobalState.state.length === 0 ||
                          GlobalState.state[0].store_id === product.store_id
                        ) {
                          dispatch({ type: "ADD", payload: product });
                          toast.success(`Product added to cart!`, {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                          });
                        } else {
                          toast.error(
                            "You can't add products from different stores to cart.",
                            {
                              position: "bottom-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                            }
                          );
                        }
                      }}
                      className="flex flex-row"
                    >
                      <ShoppingCartIcon className="h-[25px] w-[50px] text-primary " />
                      <p className="text-white hover:text-primary duration-500">
                        Add To Cart
                      </p>
                    </button>
                  )}
                  {!auth.user && (
                    <button
                      onClick={() => {
                        if (
                          GlobalState.state.length === 0 ||
                          GlobalState.state[0].store_id === product.store_id
                        ) {
                          dispatch({ type: "ADD", payload: product });
                          toast.success(`Product added to cart!`, {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                          });
                        } else {
                          toast.error(
                            "You can't add products from different stores to cart.",
                            {
                              position: "bottom-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                            }
                          );
                        }
                      }}
                      className="flex flex-row"
                    >
                      <ShoppingCartIcon className="h-[25px] w-[50px] text-primary " />
                      <p className="text-white hover:text-primary duration-500">
                        Add To Cart
                      </p>
                    </button>
                  )}
                </span>
                <span className="absolute flex flex-row items-center justify-center w-full h-full  transition-all duration-300 transform group-hover:translate-x-full ease">
                  <p>${product.price}</p>
                </span>
                <span className="relative invisible text-primary">
                  Add To Card
                </span>
              </div>

              {/* <button className=" bg-gray-800  rounded-2xl flex justify-center py-3 h-fill w-fill hover:bg-gray-700  ">
              <ShoppingCartIcon className="h-[25px] end w-[50px]  text-primary " />
            </button> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCard;
