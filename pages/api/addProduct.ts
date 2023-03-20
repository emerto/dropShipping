import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Database } from "../../types/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });

  if (!body) {
    return res.status(400).json({ error: "Missing body" });
  }

  const { data: insertedProduct, error } = await supabaseServerClient
    .from("products")
    .insert({
      name: body.productName,
      price: body.price,
      store_id: body.storeId,
      supplier_product_id: body.supplierProductId,
      supplier_prod_image: body.supplierProductImage,
    })
    .select("*")
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
    return;
  }

  res.status(200).json({ data: insertedProduct });
}
