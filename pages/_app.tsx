import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import Navbar from "../components/Navbar";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { supabaseClient } from "../utils/supabaseBrowserClient";

import { useUser } from "@supabase/auth-helpers-react";
import { useAuthStore } from "../stores/useAuthStore";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();

  async function fetchUser() {
    const { data: userData, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (userData) {
      useAuthStore.setState({
        userStore: userData,
      });
    }
  }

  if (user) {
    fetchUser();
  }

  return (
    <div>
      <Navbar children={children} />
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   const getUser = async () => {
  //     const { data: user } = await supabase.auth.getUser();

  //     const userCreds = user.user;

  //     if (userCreds) {
  //       const { data: userData, error } = await supabase
  //         .from("profiles")
  //         .select("*")
  //         .eq("id", userCreds.id)
  //         .single();

  //       if (userData) {
  //         useAuthStore.setState({
  //           userStore: userData,
  //         });
  //       }
  //     }
  //   };

  //   getUser();
  // }, []);

  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  );
}

export default MyApp;
