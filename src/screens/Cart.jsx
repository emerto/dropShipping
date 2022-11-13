import Navbar from "../components/Navbar";
import CartProducts from "../components/CartProducts";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const isEmpty = false;
  return (
    <div className="bg-gray-900 h-[100vh] mt-24">
      <div>
        <Navbar />
      </div>
      <div className="text-primary pl-8 bg-black text-4xl font-semibold flex">
        <h1 className="">Your Products</h1>
        {isEmpty ? null : (
          <button className="text-black bg-primary hover:bg-orange-500 focus:ring-4 ml-2 focus:outline-none font-medium rounded-3xl text-sm px-5 py-2 text-center border border-white">
            Buy
          </button>
        )}
      </div>
      {isEmpty ? (
        <div>
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
        <div className="flex justify-center bg-gray-900 pb-36 flex-wrap gap-[20px] mt-5">
          <div className="mt-10 w-[70vw]  h-full bg-gray-900">
            <div className="flex justify-center">
              <div className="flex flex-wrap justify-center mt-10 mb-10 h-full gap-10">
                <CartProducts />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
