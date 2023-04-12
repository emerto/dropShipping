import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  PreviewData,
} from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { Icon } from "@iconify/react";
import { useState } from "react";

export type Order = {
  id: number;
  status: string;
  order_date: string;
  total: number;
  storeName: {
    store_name: string;
  };
  carts: Array<{
    order_id: number;
    product_id: number;
    amount: number;
    products: {
      id: number;
      supplier_product_id: number;
      name: string;
      price: number;
      supplier_prod_image: string;
      store_id: number;
    };
  }>;
};

type Props = {
  orders: Order[];
};

export const getServerSideProps = async (
  ctx:
    | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    | { req: NextApiRequest; res: NextApiResponse<any> }
) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      status,
      order_date,
      total,
      storeName:store_id(
        store_name
      ),
      carts(
        *,
        products(
          *)
        )
      `
    )
    .eq("customer_id", session?.user?.id)
    .order("order_date", { ascending: false });

  if (error) {
    console.log(error);
  }

  return {
    props: {
      orders,
    },
  };
};

const Orders = ({ orders }: Props) => {
  const [clientOrders, setClientOrders] = useState<Order[]>(orders);

  const orderByDate = () => {
    const newOrders = [...clientOrders].sort(
      (a, b) =>
        new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
    );
    setClientOrders(newOrders);
  };

  const orderByTotal = () => {
    const newOrders = [...clientOrders].sort((a, b) => b.total - a.total);
    setClientOrders(newOrders);
  };

  return (
    <main>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center">
        <h1 className="text-xl lg:text-3xl font-semibold lg:font-bold text-base-content">
          Orders
        </h1>
        <div className="lg:flex gap-3 hidden">
          <button className="btn" onClick={orderByDate}>
            Order by date
          </button>
          <button className="btn btn-primary" onClick={orderByTotal}>
            Order by total
          </button>
        </div>
      </div>
      <div className="divider h-fit bg-primary" />
      <div className="flex lg:hidden gap-3">
        <button className="btn" onClick={orderByDate}>
          Order by date
        </button>
        <button className="btn btn-primary" onClick={orderByTotal}>
          Order by total
        </button>
      </div>
      <div className="flex justify-center items-center">
        <section className="flex flex-col lg:w-1/2 w-full mt-5 gap-5">
          {clientOrders.map((order) => {
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
                  <h1 className="text-xl lg:text-3xl">
                    Seller:{" "}
                    <span className="text-primary">
                      {order.storeName.store_name}
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
                  {order.status === "pending" && (
                    <div className="flex items-center">
                      <Icon
                        icon="material-symbols:clock-loader-10"
                        className="text-primary w-5 h-5"
                      />
                      <span className="text-xl ml-1">Pending</span>
                    </div>
                  )}
                  {order.status === "accepted" && (
                    <div className="flex items-center">
                      <Icon
                        icon="carbon:checkmark-filled"
                        className="text-success w-5 h-5"
                      />
                      <span className="text-xl ml-1">Delivered</span>
                    </div>
                  )}
                  {order.status === "rejected" && (
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

export default Orders;
