import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../types/supabase";

export const supabaseServerClient = useSupabaseClient<Database>();
