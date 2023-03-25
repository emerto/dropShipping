import React from "react";
import { useCartStore } from "../../stores/useCartStore";

type Props = {};

const Cart = (props: Props) => {
  const { cart, total, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCartStore();
  return (
    <div>
      <p>Total: {total}</p>
      {cart.map((product) => (
        <div key={product.id} className="flex justify-between max-w-6xl">
          <div className="flex gap-3">
            <p>{product.name}</p>
            <p>${product.price}</p>
          </div>
          <p>{product.quantity}</p>
          <button
            onClick={() => {
              increaseQuantity(product);
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              decreaseQuantity(product);
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              removeFromCart(product);
            }}
          >
            Remove The Item
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
