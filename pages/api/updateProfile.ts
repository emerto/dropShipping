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
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (!user) {
    res.status(401).json({ error: "Not logged in" });
    return;
  }

  const { data: updatedProfile, error } = await supabaseServerClient
    .from("profiles")
    .update(body)
    .eq("id", user?.id)
    .select("*")
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json({ data: updatedProfile });
}
