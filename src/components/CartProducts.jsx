import React from "react";
import { useState, useEffect, useContext } from "react";
import { Item } from "semantic-ui-react";
import { CartContext } from "../context/CartContext";

const CartProducts = () => {
  const [number, setNumber] = useState(1);
  const GlobalState = useContext(CartContext);
  const dispatch = GlobalState.dispatch;
  const state = GlobalState.state;
  console.log(GlobalState.state);
  const total = state.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  return (
    <div className="">
      {state.map((product) => {
        return (
          <div className="w-[700px]  h-auto mt-5 max-h-xs bg-gray-900 border border-white">
            <div className="flex justify-between">
              <div className="flex flex-row">
                <img
                  className="p-2 flex justify-start object-cover h-48 w-full border border-gray-900 rounded-2xl"
                  src={product.supplier_prod_image}
                  alt="product image"
                />
                <h5 className="flex items-center justify-center mt-0 text-xl font-semibold  tracking-tight  text-white">
                  {product.name}
                </h5>
              </div>

              <div className="">
                <div className="flex ">
                  <div className="flex items-center  ">
                    <span className="text-3xl font-bold text-white">
                      ${product.price * product.quantity}
                    </span>
                  </div>
                  <div className="flex mt-2 ">
                    <div
                      className=" flex flex-col items-center ml-5 text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center
                      bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 border border-blue-200"
                    >
                      <button
                        className="text-3xl -mb-4 px-2 "
                        onClick={() =>
                          dispatch({ type: "INCREASE", payload: product })
                        }
                      >
                        +
                      </button>
                      <h1>{product.quantity}</h1>
                      <button
                        className="text-3xl -mb-4 pl-2 pr-2"
                        onClick={() => {
                          if (product.quantity > 1)
                            dispatch({ type: "DECREASE", payload: product });
                          else dispatch({ type: "REMOVE", payload: product });
                        }}
                      >
                        -
                      </button>
                      <div>
                        <button
                          className="text-3xl -mb-4 pt-3 pl-2 pr-2"
                          onClick={() =>
                            dispatch({ type: "REMOVE", payload: product })
                          }
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {state.length > 0 && (
        <div className="mt-5 border-t-2 flex justify-between flex-row">
          <span className="mt-8 text-white text-2xl">Total: </span>
          <h1 className="text-white flex text-right">{total}</h1>
        </div>
      )}
    </div>
  );
};
export default CartProducts;
