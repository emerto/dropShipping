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
import Head from "next/head";

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

    try {
      const { data: dropShipper, error: dropShipperError } =
        await supabaseClient
          .from("dropshippers")
          .select("*")
          .eq("dropshipper_id", user?.id)
          .single();

      if (dropShipperError) {
        throw new Error("Not a dropshipper!");
      }

      if (dropShipper) {
        const { data: storeInfo, error: storeInfoError } = await supabaseClient
          .from("stores")
          .select("*")
          .eq("owner", user?.id)
          .single();

        if (storeInfoError) {
          throw new Error("Something store!");
        }

        if (storeInfo) {
          useAuthStore.setState({
            storeId: storeInfo.id,
          });
        }
      }
    } catch (error) {}
  }

  if (user) {
    fetchUser();
  }

  return (
    <div className="font-exo2">
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
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
          }}
        />
        <Head>
          <link rel="icon" href="/logo.png" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  );
}

export default MyApp;
