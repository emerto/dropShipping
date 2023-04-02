import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res });
  // Check if we have a user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check auth condition
  if (user) {
    return NextResponse.next();
  }

  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/";
  return NextResponse.redirect(redirectUrl);
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/createStore", "/profile","/orders"],
};
