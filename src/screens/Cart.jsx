import Navbar from "../components/Navbar";
import CartProducts from "../components/CartProducts";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const isEmpty = false;
  return (
    <div className="bg-black mt-24">
      <div>
        <Navbar />
      </div>
      <div className="text-primary ml-8 text-4xl font-semibold">
        <h1>Your Products</h1>
      </div>
      {isEmpty ? (
        <div>
          <br />
          <div className="flex">
            <h1 className="text-primary ml-12 text-4xl font-semibold">
              You don't have any product
            </h1>
            <NavLink
              className="bg-primary hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-3xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-200"
              to="/store"
            >
              Add product
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 bg-gray-900">
          <CartProducts />
          <CartProducts />
          <CartProducts />
          <CartProducts />
          <CartProducts />
        </div>
      )}
    </div>
  );
};

export default Cart;
