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

  if (!body) {
    return res.status(400).json({ error: "Missing body" });
  }

  const { error } = await supabaseServerClient
    .from("products")
    .delete()
    .eq("id", body.id);

  if (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
    return;
  }

  res.status(200).json({ data: "success" });
}
