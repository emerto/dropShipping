import React, { useEffect, useState } from "react";
import supabase from "../config/supaBaseClient";

import Navbar from "../components/Navbar";
import OrderCard from "../components/OrderCard";
import { useAuth } from "../context/AuthContext";

import {
  ClockIcon,
  CheckBadgeIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { Dropdown } from "semantic-ui-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderBy, setOrderBy] = useState("order_date");
  const auth = useAuth();

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
            id,
            status,
            order_date,
            total,
            carts (
                *,
            products (
                *
                )
            )
        `
      )
      .eq("customer_id", auth.user.id)
      .order(orderBy, { ascending: false });

    if (error) {
      console.log(error);
    }

    if (data) {
      setOrders(data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [orderBy]);

  return (
    <div className="h-[100vh] bg-slate-900">
      <div className="flex flex-col bg-slate-900">
        <Navbar />
        <div className="flex flex-col mt-[130px] ml-[100px] max-w-[90%]">
          <div className="flex justify-between">
            <h1 className="text-5xl text-white tracking-wider">Orders</h1>
          </div>
          <div className="w-full h-1 bg-primary rounded-xl mt-3" />

          <div className="text-lg mt-5 text-white flex gap-2 text-center items-center justify-center">
            <p className="pt-7 mr-5 text-2xl">ORDER BY DESCENDING:</p>
            <div
              className="mr-[10px] py-1 min-w-[120px] border hover:bg-blue-900 duration-300 rounded-xl cursor-pointer text-center justify-center content-center"
              onClick={() => setOrderBy("order_date")}
            >
              Ordered Date
            </div>
            <div
              className="mr-[10px] py-1 border hover:bg-blue-900 duration-300 rounded-xl min-w-[120px] text-center cursor-pointer"
              onClick={() => setOrderBy("total")}
            >
              Total
            </div>
            {/* {orderBy} */}
          </div>

          <div className="flex flex-col justify-center items-center ">
            {orders.map((order) => {
              return (
                <div className="flex flex-col mt-5 bg-slate-700/20 p-2 w-[800px] rounded-xl">
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                      <h1 className="text-3xl text-white tracking-wider">
                        Order ID:{" "}
                        <span className="text-primary">{order.id}</span>
                      </h1>
                    </div>
                    <div className="flex flex-row justify-between">
                      <h1 className="text-3xl text-white tracking-wider">
                        Order Date:{" "}
                        <span className="text-primary">{order.order_date}</span>
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col mt-5">
                    {order.carts.map((cart) => {
                      return <OrderCard cart={cart} key={cart.id} />;
                    })}
                  </div>
                  <div className="w-full h-1 bg-primary rounded-xl mt-3" />
                  <div className="flex flex-col items-end p-3">
                    <div className="flex flex-col items-center">
                      <div className="flex justify-end w-full  text-3xl text-white">
                        <p>
                          Total:
                          <span className="text-primary"> ${order.total}</span>
                        </p>
                      </div>
                      <div className="text-3xl text-white ">
                        {order.status === "accepted" && (
                          <div className="flex flex-row items-center">
                            <CheckBadgeIcon className="h-[24px] w-[24px] text-green-500" />
                            <p>Delivered</p>
                          </div>
                        )}
                        {order.status === "pending" && (
                          <div className="flex items-center">
                            <ClockIcon className="h-[24px] w-[24px] text-primary" />
                            <p>Pending</p>
                          </div>
                        )}
                        {order.status === "rejected" && (
                          <div className="flex flex-col">
                            <div className="flex items-center text-3xl text-white ">
                              <XCircleIcon className="h-[24px] w-[24px] text-red-500" />
                              <p>Rejected by the Dropshipper</p>
                            </div>
                            <span className="text-primary text-base flex justify-end">
                              Money will be refunded
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
