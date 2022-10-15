import supabase from "../config/supaBaseClient";
import { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isDropshipper, setIsDropshipper] = useState(false);

  const login = async (email, password) => {
    const { error, user } = await supabase.auth.signIn({ email, password });

    if (error) {
      console.log(error);
    }

    return { error, user };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }

    setUser(null);
  };

  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user);

    const getUserProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.log(error);
        }

        setUserData(data);
      }
    };

    const isDropShipper = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("dropshippers")
          .select("*")
          .eq("dropshipper_id", user.id)
          .single();

        if (error) {
          console.log(error);
        }

        if (data) {
          setIsDropshipper(true);
        }
      }
    };

    getUserProfile();
    isDropShipper();

    const auth = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        getUserProfile();
        isDropShipper();
      }

      if (event === "SIGNED_OUT") {
        setUser(null);
        setUserData(null);
        setIsDropshipper(false);
      }
    });

    return () => auth.data.unsubscribe();
  }, []);

  return {
    user,
    userData,
    isDropshipper,
    login,
    logout,
  };
}
