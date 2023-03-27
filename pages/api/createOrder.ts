import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../types/supabase";

type product = {
  id: number;
  name: string;
  price: number;
  store_id: number;
  supplier_prod_image: string;
  supplier_product_id: number;
  quantity: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (!user) {
    res.status(401).json({ error: "Not logged in" });
    return;
  }

  if (!body) {
    return res.status(400).json({ error: "Missing body" });
  }

  const parsedBody = JSON.parse(body);

  const cart = parsedBody.products;

  const total = parsedBody.total;

  const store_id = parsedBody.products[0].store_id;

  const delivery_address = parsedBody.address;

  console.log(typeof user.id);

  const { data: orderData, error: orderError } = await supabaseServerClient
    .from("orders")
    .insert({
      customer_id: user.id,
      order_date: new Date().toISOString(),
      store_id,
      total,
      delivery_address,
    })
    .select();

  if (orderError) {
    return res.status(400).json({ error: orderError.message });
  }

  const order_id = orderData[0].id;

  const { data: orderProductsData, error: orderProductsError } =
    await supabaseServerClient
      .from("carts")
      .insert(
        cart.map((product: product) => ({
          order_id,
          product_id: product.id,
          amount: product.quantity,
        }))
      )
      .select();

  if (orderProductsError) {
    return res.status(400).json({ error: orderProductsError.message });
  }

  if (orderProductsData) {
    const { data, error } = await supabaseServerClient.rpc(
      "update_customer_balance",
      {
        customer_id: user.id.toString(),
        amount: total,
      }
    );

    if (error) {
      res.status(400).json({ error: error.message });
    }

    if (data) {
      res.status(200).json({ success: true });
    }
  }
}
