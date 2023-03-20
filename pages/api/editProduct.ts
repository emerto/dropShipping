import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Database } from "../../types/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const id = body.id;

  //id removed from body
  delete body.id;

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

  const { data: updatedProduct, error } = await supabaseServerClient
    .from("products")
    .update(body)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
    return;
  }

  res.status(200).json({ data: updatedProduct });
}
