import Navbar from "../components/Navbar";
import CartProducts from "../components/CartProducts";
import supabase from "../config/supaBaseClient";
import { useState, useEffect, useContext } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartContext } from "../context/CartContext";

const Cart = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const GlobalState = useContext(CartContext);
  const dispatch = GlobalState.dispatch;

  const cart = useContext(CartContext);
  const auth = useAuth();
  const navigate = useNavigate();
  const [number, setNumber] = useState(1);

  const state = GlobalState.state;
  useEffect(() => {
    if (cart.state.length === 0) {
      setIsCartEmpty(true);
    }
  }, [cart.state]);

  const RemoveAll = () => {
    dispatch({ type: "REMOVE_ALL" });
  };

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
      toast.error(orderError.message);
    } else {
      console.log(orderData);
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
        toast.error(`${cartError}`, {
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
      <div className="bg-gray-900 h-[100vh] mt-24">
        <div>
          <Navbar />
        </div>
        <div className="text-primary pl-8 bg-black text-4xl font-semibold flex">
          <h1 className="">Your Products</h1>
        </div>
        {isCartEmpty ? (
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
          <>
            {/* {state.map((product) => { */}
            <div className="flex">
              <div className="flex justify-center bg-gray-900 pb-36 flex-wrap gap-[20px] mt-5">
                <div className="mt-10 w-[70vw]  h-full bg-gray-900">
                  <div className="flex justify-center">
                    <div className="flex flex-col justify-center mt-10 mb-10 h-full gap-10">
                      <CartProducts />
                      <div className="flex justify-start gap-10 w-full">
                        <button
                          className="btn-primary w-full"
                          onClick={handleBuy}
                        >
                          Buy
                        </button>
                        <button
                          className="btn-primary w-64"
                          onClick={RemoveAll}
                        >
                          Remove All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" pl-6 border-0 mr-2 border-l-2 ml-7 w-[500px] flex-col  h-auto mt-5 max-h-xs bg-gray-900  border-white">
                {/* ITEMS LIST */}

                <div>
                  {/* <div>{product.name}</div> */}
                  <h1 className="text-gray-300 	text-decoration-line: underline">
                    Items in Cart
                  </h1>
                  <div className="flex justify-between">
                    <h2></h2>
                  </div>
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-start w-auto text-base font-medium text-gray-300"
                  >
                    Address
                  </label>
                  <textarea
                    type="address"
                    name="floating_address"
                    id="floating_address"
                    placeholder={address}
                    className="input-form p-4 h-[115px] bg-secondary focus:bg-neutral-700 block  w-full text-base rounded-lg border  text-gray-400 focus:outline-none border-primary placeholder-gray-400"
                    // onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className=" w-1/2">
                  <label
                    htmlFor="telephone"
                    className="block mb-2 text-start w-auto text-base font-medium text-gray-300"
                  >
                    Telephone
                  </label>
                  <input
                    type="telephone"
                    name="floating_telephone"
                    id="floating_telephone"
                    placeholder={phoneNumber}
                    className="input-form bg-secondary focus:bg-neutral-700"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="mb-5 w-1/2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-start w-auto text-base font-medium text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    placeholder={email}
                    className="input-form focus:bg-neutral-700 block  w-full text-base rounded-lg border text-gray-400 focus:outline-none bg-secondary border-primary placeholder-gray-400"
                  />
                </div>
                <div className="flex justify-start pl-2">
                  <button type="submit" className="btn-secondary">
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
            ;{/* })} */}
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
