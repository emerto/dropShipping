import React from "react";

const OrderCard = ({ cart }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center h-[200px] mb-3">
        <img
          className="p-2 object-cover h-[200px] w-[200px] rounded-xl"
          src={cart.products.supplier_prod_image}
          alt="product image"
        />
        <div className="flex justify-between items-center w-full p-3">
          <div className="flex justify-center items-center ">
            <h1 className="text-3xl text-white ">{cart.products.name}</h1>
          </div>
          <div className="flex flex-col relative justify-center items-center mt-[30px]">
            <p className="text-3xl text-white ">
              ${cart.products.price * cart.amount}
            </p>
            <p className="text-gray-400 absolute top-[30px]">
              {cart.products.price}
              <span className="text-primary font-extrabold">
                {" "}
                x {cart.amount}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
