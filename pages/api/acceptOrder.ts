import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../types/supabase";

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
    .select(
      `
    id,
    customer_id,
    status,
    order_date,
    store_id,
    total,
    carts (
        *,
    products (
        *
        )
    )
`
    )
    .eq("id", orderId)
    .single();

  if (error) {
    res.status(400).json({ error: "Error fetching order" });
    return;
  }

  if (order === null) {
    res.status(400).json({ error: "Order not found" });
    return;
  }

  let productArr = [];

  const calculateProfit = async () => {
    order.carts.forEach((cart) => {
      productArr.push({
        product_id: cart.product_id,
        supplier_product_id: cart.products.supplier_product_id,
        amount: cart.amount,
      });
    });

    let profitArr = [];

    for (let i = 0; i < productArr.length; i++) {
      const product = productArr[i];

      const { data: price } = await supabaseServerClient
        .from("products")
        .select("price")
        .eq("id", product.product_id)
        .single();

      const { data: suppPrice } = await supabaseServerClient
        .from("supplier_products")
        .select("price")
        .eq("id", product.supplier_product_id)
        .single();

      if (price && suppPrice) {
        profitArr.push({
          profit: (price.price - suppPrice.price) * product.amount,
        });
      }
    }

    let totalProfit = 0;

    profitArr.forEach((item) => {
      totalProfit += item.profit;
    });

    return totalProfit;
  };

  const confirmOrder = async () => {
    let stockArr = [];

    for (let i = 0; i < productArr.length; i++) {
      const product = productArr[i];

      const { data: stock } = await supabaseServerClient
        .from("supplier_products")
        .select("stock")
        .eq("id", product.supplier_product_id)
        .single();

      if (stock) {
        stockArr.push({
          supplierStock: stock.stock,
          amount: product.amount,
          supplierProductId: product.supplier_product_id,
        });
      }
    }

    for (let i = 0; i < stockArr.length; i++) {
      const stock = stockArr[i];

      const calculatedStock = stock.supplierStock - stock.amount;

      if (calculatedStock < 0) {
        await supabaseServerClient.rpc("reject_order", {
          customer_id: order.customer_id,
          amount: order.total,
          order_id: orderId,
        });

        res.status(400).json({ error: "Not enough stock" });
        return;
      }

      const { data: updatedStock, error: updateStockError } =
        await supabaseServerClient
          .from("supplier_products")
          .update({ stock: calculatedStock })
          .eq("id", stock.supplierProductId)
          .select();

      if (updateStockError) {
        res.status(400).json({ error: "Error updating stock" });
        return;
      }

      const profit = await calculateProfit();

      if (updatedStock) {
        const { data, error } = await supabaseServerClient.rpc("accept_order", {
          store_id: order.store_id,
          amount: profit,
          order_id: orderId,
        });

        if (error) {
          res.status(400).json({ error: "Error updating order" });
          return;
        }

        if (data) {
          res.status(200).json({ message: "Order accepted" });
        }
      }
    }
  };

  await confirmOrder();
}
