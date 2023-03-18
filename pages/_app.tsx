import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import Navbar from "../components/Navbar";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { supabaseClient } from "../utils/supabaseBrowserClient";

import { useUser } from "@supabase/auth-helpers-react";
import { useAuthStore } from "../stores/useAuthStore";

import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();

  async function fetchUser() {
    const { data: userData, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
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
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
          }}
        />
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  );
}

export default MyApp;
