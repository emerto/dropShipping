import React from "react";
import { useState, useEffect, useContext } from "react";

import { CartContext } from "../context/CartContext";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const CartProducts = ({ setTotal }) => {
  // const [number, setNumber] = useState(1);
  const [totalLocal, setTotalLocal] = useState(0);
  const GlobalState = useContext(CartContext);
  const dispatch = GlobalState.dispatch;
  const state = GlobalState.state;

  useEffect(() => {
    let total = 0;
    state.forEach((product) => {
      total += product.price * product.quantity;
    });
    setTotal(total);
    setTotalLocal(total);
  }, [state, setTotal]);

  const Increase = (product) => {
    dispatch({ type: "INCREASE", payload: product });
  };
  const Decrease = (product) => {
    dispatch({ type: "DECREASE", payload: product });
  };
  const Remove = (product) => {
    dispatch({ type: "REMOVE", payload: product });
  };

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className="">
      {state.map((product) => {
        return (
          <div className="w-[900px]  h-auto mt-5 max-h-xs">
            <div className="flex justify-between">
              <div className="flex flex-row w-full">
                <img
                  className="p-2 flex justify-start mr-2 object-cover h-48 max-w-[168px] border border-gray-900 rounded-2xl"
                  src={product.supplier_prod_image}
                  alt="product image"
                />
                <div className="flex w-full flex-col items-start justify-center mt-0 text-xl font-semibold tracking-tight  text-white">
                  <h5 className=" text-2xl font-semibold  tracking-tight  text-white">
                    {product.name}
                  </h5>

                  <span className="text-xl font-bold text-start text-white">
                    ${product.price * product.quantity}
                  </span>
                </div>
              </div>

              <div className="">
                <div className="flex ">
                  {product.quantity > 1 ? (
                    <div className="flex mt-2 ">
                      <div
                        className="text-3xl cursor-pointer flex justify-center my-12 text-white -mb-4 pt-3 pl-2 pr-2 duration-300"
                        onClick={() => Remove(product)}
                      >
                        <TrashIcon className="w-9 h-9 text-white justify-center flex mt-2 hover:text-red-500 duration-300" />
                      </div>

                      <div
                        className=" flex flex-col items-center ml-5 text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center
                     -200 m-2"
                      >
                        <div
                          className="text-3xl  cursor-pointer -mb-4 px-2 "
                          onClick={() => Increase(product)}
                        >
                          <PlusCircleIcon className="w-9 h-9 text-white hover:text-primary duration-300" />
                        </div>
                        <h1>{product.quantity}</h1>
                        <div
                          className="text-3xl cursor-pointer -mb-4 pl-2 pr-2"
                          onClick={() => {
                            if (product.quantity > 1) Decrease(product);
                            else Remove(product);
                          }}
                        >
                          <MinusCircleIcon className="w-9 h-9 text-white hover:text-primary duration-300" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex mt-2 ">
                      <div
                        className=" flex flex-col items-center ml-5 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center
                     -200 m-2"
                      >
                        <div
                          className="text-3xl  cursor-pointer -mb-4 px-2 "
                          onClick={() => Increase(product)}
                        >
                          <PlusCircleIcon className="w-9 h-9 text-white hover:text-primary duration-300" />
                        </div>
                        <h1>{product.quantity}</h1>
                        <div
                          className="text-3xl cursor-pointer -mb-4 pl-2 pr-2"
                          onClick={() => Remove(product)}
                        >
                          <TrashIcon className="w-9 h-9 text-white hover:text-primary duration-300 " />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {state.length > 0 && (
        <div className="mt-5 border-t-2 flex justify-between flex-row">
          <span className="mt-8 text-white text-2xl">Total: </span>
          <h1 className="text-white flex text-right">${totalLocal}</h1>
        </div>
      )}
    </div>
  );
};
export default CartProducts;
