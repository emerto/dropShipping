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

  const { orderId } = body;

  if (!orderId) {
    res.status(400).json({ error: "Missing order id" });
    return;
  }

  const { data: order, error } = await supabaseServerClient
    .from("orders")
    .select("total,customer_id")
    .eq("id", orderId)
    .single();

  if (error) {
    res.status(400).json({ error: "Error fetching order" });
    return;
  }

  if (!order) {
    res.status(400).json({ error: "Order not found" });
    return;
  }

  const { data: orderStat, error: orderStatError } =
    await supabaseServerClient.rpc("reject_order", {
      customer_id: order.customer_id,
      amount: order.total,
      order_id: orderId,
    });

  if (orderStatError) {
    console.log(orderStatError);
    res.status(400).json({ error: "Error rejecting order" });
    return;
  }

  if (!orderStat) {
    res.status(400).json({ error: "Error rejecting order" });
    return;
  }

  res.status(200).json({ message: "Order rejected" });
}
