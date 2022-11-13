import React from "react";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartProducts = () => {
  const GlobalState = useContext(CartContext);
  const dispatch = GlobalState.dispatch;
  const state = GlobalState.state;
  console.log(GlobalState.state);
  return (
    <div>
      {state.map((product) => {
        return <div className="z-20 text-white ">{product.name}</div>;
      })}
    </div>
  );
};

export default CartProducts;
