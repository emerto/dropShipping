import React, { useEffect, useState } from "react";
import supabase from "../config/supaBaseClient";
import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/solid";
import OrderCard from "../components/OrderCard";

import Spinner from "../utils/Spinner";

const ReceivedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [stock, setStock] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();

  const getOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
          id,
          customer_id,
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
      .eq("store_id", auth.user.store.id);

    if (error) {
      console.log(error);
    }

    if (data) {
      setOrders(data);
      setIsLoading(false);
    }
  };

  const calculateProfit = async (id) => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
          id,
          customer_id,
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
      .eq("id", id);

    if (error) {
      console.log(error);
    }

    let productArr = [];

    if (data) {
      data.forEach((order) => {
        order.carts.forEach((cart) => {
          productArr.push({
            supplierProdId: cart.products.supplier_product_id,
            productId: cart.product_id,
            amount: cart.amount,
          });
        });
      });

      let profitArr = [];

      for (let i = 0; i < productArr.length; i++) {
        const product = productArr[i];
        const { data: prodPrice, error: prodErr } = await supabase
          .from("products")
          .select("price")
          .eq("id", product.productId)
          .single();

        const { data: suppPrice, error: suppErr } = await supabase
          .from("supplier_products")
          .select("price")
          .eq("id", product.supplierProdId)
          .single();

        if (error) {
          console.log(error);
        }

        if (prodPrice && suppPrice) {
          profitArr.push({
            profit: (prodPrice.price - suppPrice.price) * product.amount,
          });
        }
      }

      let totalProfit = 0;

      profitArr.forEach((profit) => {
        totalProfit += profit.profit;
      });

      return totalProfit;
    }
  };

  const acceptOrder = async (id) => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
          id,
          customer_id,
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
      .eq("id", id);

    if (error) {
      console.log(error);
    }

    if (data) {
      setStock(data);
    }

    let productArr = [];

    data.forEach((order) => {
      order.carts.forEach((cart) => {
        productArr.push({
          product: cart.products.supplier_product_id,
          amount: cart.amount,
        });
      });
    });

    let stockArr = [];

    for (let i = 0; i < productArr.length; i++) {
      const product = productArr[i];
      const { data, error } = await supabase
        .from("supplier_products")
        .select("stock")
        .eq("id", product.product)
        .single();

      if (error) {
        console.log(error);
      }

      if (data) {
        stockArr.push({
          supplierProductId: product.product,
          supplierStock: data.stock,
          boughtQty: product.amount,
        });
      }
    }

    setStock(stockArr);

    const updatePromises = [];

    for (let i = 0; i < stockArr.length; i++) {
      const stock = stockArr[i];
      const calculatedStock = stock.supplierStock - stock.boughtQty;
      updatePromises.push(
        supabase
          .from("supplier_products")
          .update({ stock: calculatedStock })
          .eq("id", stock.supplierProductId)
      );
    }

    await Promise.all(updatePromises);
    updateOrderStatus(id, "accepted");

    const profit = await calculateProfit(id);

    const { data: balance, error: balanceErr } = await supabase
      .from("profiles")
      .update({ balance: auth.user.balance + profit })
      .eq("id", auth.user.id);

    if (balanceErr) {
      console.log(balanceErr);
    }
  };

  const rejectOrder = async (id) => {
    const { data, error } = await supabase
      .from("orders")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
    }

    if (data) {
      const { data: balance, error } = await supabase
        .from("profiles")
        .select("balance")
        .eq("id", data.customer_id)
        .single();

      if (error) {
        console.log(error);
      }

      if (balance) {
        let newBalance = balance.balance + data.total;
        console.log(newBalance);
        const { data: update, error } = await supabase
          .from("profiles")
          .update({ balance: newBalance })
          .eq("id", data.customer_id);

        if (error) {
          console.log(error);
        }

        if (update) {
          updateOrderStatus(id, "rejected");
        }
      }
    }
  };

  const updateOrderStatus = async (id, status) => {
    const { data, error } = await supabase
      .from("orders")
      .update({ status: status })
      .eq("id", id);

    if (error) {
      console.log(error);
    }

    if (data) {
      getOrders();
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="h-[100vh] bg-slate-900">
      <div className="flex flex-col bg-slate-900">
        <Navbar />
        <section className="flex flex-col mt-[130px] ml-[100px] max-w-[90%]">
          <header className="flex justify-between">
            <h1 className="text-5xl text-white tracking-wider">
              Recived Orders
            </h1>
          </header>
          <div className="w-full h-1 bg-primary rounded-xl mt-3" />
          {!isLoading ? (
            <section className="flex flex-col justify-center items-center ">
              {orders.map((order) => {
                return (
                  <div
                    className="flex flex-col mt-5 bg-slate-700/20 p-2 w-[800px] rounded-xl"
                    key={order.id}
                  >
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
                          <span className="text-primary">
                            {order.order_date}
                          </span>
                        </h1>
                      </div>
                    </div>
                    <div className="flex flex-col mt-5" key={order.id}>
                      {order.carts.map((cart) => {
                        return <OrderCard cart={cart} />;
                      })}
                    </div>
                    <div className="w-full h-1 bg-primary rounded-xl mt-3" />
                    <div className="flex flex-col items-end p-3">
                      <div className="flex flex-col items-center">
                        <div className="flex justify-end w-full  text-3xl text-white">
                          <p>
                            Total:
                            <span className="text-primary">
                              {" "}
                              ${order.total}
                            </span>
                          </p>
                        </div>
                        {order.status === "pending" ? (
                          <div className="flex mt-3 gap-3">
                            <button
                              className="btn-primary"
                              onClick={() => {
                                acceptOrder(order.id);
                              }}
                            >
                              Accept
                            </button>
                            <button
                              className="btn-primary"
                              onClick={() => {
                                rejectOrder(order.id);
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        ) : order.status === "accepted" ? (
                          <div className="flex flex-row items-center text-3xl text-white ">
                            <CheckBadgeIcon className="h-[24px] w-[24px] text-green-500" />
                            <p>Accepted</p>
                          </div>
                        ) : (
                          <div className="flex items-center text-3xl text-white ">
                            <XCircleIcon className="h-[24px] w-[24px] text-red-500" />
                            <p>Rejected, money will be refunded</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          ) : (
            <Spinner />
          )}
        </section>
      </div>
    </div>
  );
};

export default ReceivedOrders;
