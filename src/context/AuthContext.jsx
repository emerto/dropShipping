import supabase from "../config/supaBaseClient";
import { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(supabase.auth.user());
  const [isDropShipper, setIsDropShipper] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();

      if (sessionUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", sessionUser.id)
          .single();

        const { data: dropshipper, error: dropError } = await supabase
          .from("dropshippers")
          .select("*")
          .eq("dropshipper_id", sessionUser.id)
          .single();

        const { data: store, error: storeError } = await supabase
          .from("stores")
          .select("id")
          .eq("owner", sessionUser.id)
          .single();

        if (dropshipper) {
          setIsDropShipper(true);
        }

        setUser({ ...sessionUser, ...profile, store });
      }
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  const login = async (email, password) => {
    const { error, user } = await supabase.auth.signIn({ email, password });

    if (error) {
      console.log(error);
    }

    return { error, user };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsDropShipper(false);
  };

  const exposed = {
    user,
    isDropShipper,
    login,
    logout,
  };

  return (
    <authContext.Provider value={exposed}>{children}</authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

export default AuthProvider;
