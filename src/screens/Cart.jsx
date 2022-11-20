import Navbar from "../components/Navbar";
import CartProducts from "../components/CartProducts";
import supabase from "../config/supaBaseClient";
import { useState, useEffect, useContext, useRef } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartContext } from "../context/CartContext";

import lottie from "lottie-web";
import shoppingCart from "../animations/shoppingCart.json";

const Cart = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  const shoppingCartRef = useRef(null);
  const cart = useContext(CartContext);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const instance = lottie.loadAnimation({
      name: "shoppingCart",
      container: shoppingCartRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: shoppingCart,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

    return () => instance.destroy();
  }, [shoppingCartRef]);

  useEffect(() => {
    if (cart.state.length === 0) {
      setIsCartEmpty(true);
    }
  }, [cart.state]);

  const createOrder = async () => {
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          customer_id: auth.user.id,
          order_date: new Date(),
        },
      ]);

    if (orderError) {
      toast.error(`${orderError.message}`, {
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
      const { data: orderItemsData, error: cartError } = await supabase
        .from("carts")
        .insert(
          cart.state.map((item) => {
            return {
              order_id: orderData[0].id,
              product_id: item.id,
              amount: item.quantity,
            };
          })
        );

      if (cartError) {
        toast.error(`${cartError.message}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      if (orderItemsData) {
        toast.success(` Order created successfully!`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          navigate("/orders");
        }, 2500);
      }
    }
  };

  const handleBuy = () => {
    createOrder();
  };

  return (
    <>
      <div className="h-[100vh] bg-slate-900">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="flex flex-col bg-slate-900">
          <Navbar />
          <div className="flex flex-col mt-[130px]  ml-[100px] max-w-[90%]">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h1 className="text-5xl text-white tracking-wider">Cart</h1>
              </div>
              <div className="w-full h-1 bg-primary rounded-xl mt-3" />
            </div>
            {isCartEmpty ? (
              <div className="flex items-center justify-center w-full ">
                <div className="flex flex-col items-center justify-center">
                  <div ref={shoppingCartRef} className="w-[350px] h-[350px]" />
                  <h1 className="text-white text-3xl">
                    No products found in this store
                  </h1>
                </div>
              </div>
            ) : (
              <div className="flex justify-center bg-gray-900 pb-36 flex-wrap gap-[20px] mt-5">
                <div className="mt-10 w-[70vw]  h-full bg-gray-900">
                  <div className="flex justify-center">
                    <div className="flex flex-wrap justify-center mt-10 mb-10 h-full gap-10">
                      <CartProducts />
                      <button className="btn-primary" onClick={handleBuy}>
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
