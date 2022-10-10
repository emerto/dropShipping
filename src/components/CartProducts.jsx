import React from "react";
import { useState, useEffect } from "react";

const CartProducts = () => {
  const price = 599;
  const [number, setNumber] = useState(0);

  return (
    <div className="w-full max-w-xs h-full max-h-xs bg-gray-900 border border-white">
      <img
        className="p-2 object-cover h-48 w-full border border-gray-900 rounded-2xl"
        src="https://i.pinimg.com/originals/35/cb/31/35cb31391be518a21d604ca028db5f04.jpg"
        alt="product image"
      />

      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          Cami
        </h5>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-white">
            ${number * price}
          </span>
          <div className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-200">
            <button onClick={() => setNumber((prevNumber) => prevNumber + 1)}>
              +
            </button>
            <h1>{number}</h1>
            <button
              onClick={() =>
                number > 0
                  ? setNumber((prevNumber) => prevNumber - 1)
                  : setNumber(0)
              }
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
