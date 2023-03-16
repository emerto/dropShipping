import "../styles/globals.css";
import type { AppProps } from "next/app";
import { supabase } from "../utils/supabaseClient";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../stores/useAuthStore";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar children={children} />
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const getUser = async () => {
      const { data: user } = await supabase.auth.getUser();

      const userCreds = user.user;

      if (userCreds) {
        const { data: userData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userCreds.id)
          .single();

        if (userData) {
          useAuthStore.setState({
            userStore: userData,
          });
        }
      }
    };

    getUser();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
