import { Icon } from "@iconify/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import type { Order } from "../orders";

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: isDropShipper, error } = await supabase
    .from("dropshippers")
    .select()
    .eq("dropshipper_id", session?.user?.id)
    .single();

  if (!isDropShipper) {
    return {
      redirect: {
        destination: "/createStore",
        permanent: false,
      },
    };
  }

  const { data: storeId, error: storeIdError } = await supabase
    .from("stores")
    .select("id")
    .eq("owner", session?.user?.id)
    .single();

  if (storeIdError) {
    console.log(storeIdError);
    return;
  }

  const { data: orders, error: ordersError } = await supabase
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
    .eq("store_id", storeId.id)
    .order("id", { ascending: false });

  if (ordersError) {
    console.log(ordersError);
  }

  let countData;

  if (orders) {
    countData = orders.reduce(
      (acc, order) => {
        if (order.status === "pending") {
          acc.pending++;
        } else if (order.status === "accepted") {
          acc.accepted++;
        } else if (order.status === "rejected") {
          acc.rejected++;
        }
        return acc;
      },
      { pending: 0, accepted: 0, rejected: 0 }
    );
  }

  return {
    props: {
      orders,
      countData,
    },
  };
};

type Props = {
  orders: Order[];
  countData: {
    pending: number;
    accepted: number;
    rejected: number;
  };
};

const RecivedOrders = ({ orders, countData }: Props) => {
  return (
    <main className="min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center">
        <h1 className="text-xl lg:text-3xl font-semibold lg:font-bold text-base-content">
          Orders
        </h1>
        <div className="lg:flex gap-3 hidden">
          <div className="btn btn-warning">
            Pending Count: {countData.pending}
          </div>
          <div className="btn btn-error">
            Rejected Count: {countData.rejected}
          </div>
          <div className="btn btn-success">
            Accepted Count: {countData.accepted}
          </div>
        </div>
      </div>
      <div className="divider h-fit bg-primary" />
      <div className="flex flex-col lg:hidden gap-3">
        <div className="btn btn-warning">
          Pending Count: {countData.pending}
        </div>
        <div className="btn btn-error">
          Rejected Count: {countData.rejected}
        </div>
        <div className="btn btn-success">
          Accepted Count: {countData.accepted}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <section className="flex flex-col lg:w-1/2 w-full mt-5 gap-5">
          {orders.length === 0 && (
            <div className="flex flex-col gap-10 text-center mt-10 ">
              <p className="text-primary text-8xl">\_(ツ)_/¯</p>
              <p className="text-4xl">No orders yet</p>
            </div>
          )}
          {orders.map((order) => {
            return (
              <div
                key={order.id}
                className="flex flex-col p-5 bg-base-300 rounded-xl"
              >
                <div className="flex flex-col">
                  <h1 className="text-xl lg:text-3xl">
                    Order Id: <span className="text-primary">{order.id}</span>
                  </h1>
                  <h1 className="text-xl lg:text-3xl">
                    Order Date:{" "}
                    <span className="text-primary">
                      {new Date(order.order_date).toLocaleDateString()}
                    </span>
                  </h1>
                </div>
                <div className="flex flex-col justify-between mt-2 gap-10">
                  {order.carts.map((cart) => {
                    return (
                      <div
                        className="flex lg:flex-row flex-col"
                        key={cart.product_id}
                      >
                        <Image
                          src={cart.products.supplier_prod_image}
                          width={200}
                          height={200}
                          alt={cart.products.name}
                          className="rounded-xl w-full lg:h-52 lg:w-52 object-cover"
                        />
                        <div className="flex lg:flex-row flex-col justify-between lg:items-center w-full">
                          <span className="text-xl lg:text-2xl ml-2">
                            {cart.products.name}
                          </span>
                          <div className="flex flex-col lg:items-center ml-2">
                            <span className="text-lg lg:text-2xl">
                              ${cart.products.price}
                            </span>
                            <span>
                              <span className="text-base">
                                {cart.products.price}
                                <span className="text-primary">
                                  x{cart.amount}
                                </span>
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="divider h-fit bg-primary" />
                <div className="flex flex-col items-end">
                  <span className="text-2xl">
                    Total: <span className="text-primary">${order.total}</span>
                  </span>
                  {order.status === "pending" ? (
                    <div className="flex mt-3 gap-3">
                      <button className="btn btn-success">Accept</button>
                      <button className="btn btn-error">Reject</button>
                    </div>
                  ) : order.status === "accepted" ? (
                    <div className="flex items-center">
                      <Icon
                        icon="carbon:checkmark-filled"
                        className="text-success w-5 h-5"
                      />
                      <span className="text-xl ml-1">Delivered</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <Icon
                          icon="carbon:close-filled"
                          className="text-error w-5 h-5"
                        />
                        <span className="text-xl ml-1">
                          Rejected By Dropshipper
                        </span>
                      </div>
                      <p className="text-error">
                        Money will be refunded to your account.
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default RecivedOrders;
