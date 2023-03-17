import Navbar from "../components/Navbar";
import CartProducts from "../components/CartProducts";
import supabase from "../config/supaBaseClient";
import { useState, useEffect, useContext } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eCart from "../assets/basket.svg";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [total, setTotal] = useState(0);
  const GlobalState = useContext(CartContext);
  const dispatch = GlobalState.dispatch;

  const cart = useContext(CartContext);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.state.length === 0) {
      setIsCartEmpty(true);
    }
  }, [cart.state]);

  const RemoveAll = () => {
    dispatch({ type: "REMOVE_ALL" });
  };

  const createOrder = async () => {
    if (total > auth.user.balance) {
      toast.error("Insufficant Balance", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          customer_id: auth.user.id,
          order_date: new Date(),
          total: total,
          store_id: cart.state[0].store_id,
          delivery_address: address,
        },
      ]);

    if (orderError) {
      toast.error(orderError.message);
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

        const { data, error } = await supabase
          .from("profiles")
          .update({ balance: auth.user.balance - total })
          .eq("id", auth.user.id);

        if (error) {
          toast.error(`${error}`, {
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

        if (data) {
          RemoveAll();

          setTimeout(() => {
            navigate("/orders");
          }, 2500);
        }
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
      <div className="bg-gray-900 min-h-[100vh] mt-24">
        <div>
          <Navbar />
        </div>

        {isCartEmpty ? (
          <div className="flex justify-center h-[80vh] ">
            <div className="flex items-center flex-col justify-center">
              <div>
                <img className="w-24 h-24 " src={eCart} alt />
              </div>
              <h1 className="text-primary text-4xl font-semibold">
                You don't have any product
              </h1>
              <NavLink
                className="bg-primary ml-3 mt-2 text-black  hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-white hover:text-white font-medium-bold rounded-3xl text-xl px-5 py-3 text-center  border border-black"
                to="/"
              >
                Add product
              </NavLink>
            </div>
          </div>
        ) : (
          <>
            {/* {state.map((product) => { */}
            <div className="flex ">
              <div className="flex justify-center bg-gray-900 pb-36 flex-wrap gap-[20px] mt-5">
                <div className="mt-10 w-[70vw]  h-full bg-gray-900">
                  <div className="flex justify-center">
                    <div className="flex flex-col justify-center bg-slate-700/30 rounded-2xl p-3 mt-10 mb-10 h-full gap-10 pb-10 ">
                      <CartProducts setTotal={setTotal} />
                      <div className="flex justify-end gap-10 w-full">
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
              <div className=" pl-6 border-0 mr-2 border-l-2 ml-7 w-full flex-col  h-auto mt-5 max-h-xs bg-gray-900  border-white">
                {/* ITEMS LIST */}
                <div className="flex flex-col items-start mt-20">
                  <div>
                    <h1 className="text-gray-300 text-decoration-line: underline">
                      Order Info
                    </h1>
                    <div className="flex justify-between">
                      <h2></h2>
                    </div>
                  </div>

                  <div className="w-4/5">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-start w-auto text-base font-medium text-gray-300"
                    >
                      Addresss
                    </label>
                    <textarea
                      type="address"
                      name="floating_address"
                      id="floating_address"
                      required
                      placeholder={address}
                      className="input-form p-4 h-[115px] bg-secondary focus:bg-neutral-700 block  w-full text-base rounded-lg border  text-gray-400 focus:outline-none border-primary placeholder-gray-400"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className=" w-4/5">
                    <label
                      htmlFor="telephone"
                      className="block mb-2 text-start w-auto text-base font-medium text-gray-300"
                    >
                      Telephone
                    </label>
                    <input
                      type="telephone"
                      required
                      name="floating_telephone"
                      id="floating_telephone"
                      placeholder={phoneNumber}
                      className="input-form bg-secondary focus:bg-neutral-700"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="mb-5 w-4/5">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-start w-auto text-base font-medium text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      name="floating_email"
                      id="floating_email"
                      placeholder={email}
                      className="input-form focus:bg-neutral-700 block  w-full text-base rounded-lg border text-gray-400 focus:outline-none bg-secondary border-primary placeholder-gray-400"
                    />
                  </div>
                  <div className="flex justify-start ">
                    {auth.user && (
                      <button
                        className={`btn-secondary w-52 text-center text-lg justify-center
                    ${
                      total > auth.user.balance ? "bg-gray-500" : "bg-primary"
                    }`}
                        disabled={total > auth.user.balance}
                        onClick={handleBuy}
                      >
                        {total > auth.user.balance
                          ? "Insufficant Balance"
                          : "Confirm Order"}
                      </button>
                    )}
                    {!auth.user && (
                      <button
                        className="btn-secondary w-52 text-center text-lg justify-center"
                        onClick={() => navigate("/login")}
                      >
                        Sign In to Buy
                      </button>
                    )}
                  </div>
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
