import React from "react";
import StoreForm from "../components/StoreForm";
import Navbar from "../components/Navbar";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import supabase from "../config/supaBaseClient";

const StoreForm1 = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.user) {
    return (
      <div>
        <Navbar />
        <div className="w-[100vw] h-[100vh] bg-gray-900 flex justify-center items-center">
          <div className="flex flex-col w-[1000px] justify-center items-center gap-5">
            <img
              src="https://c.tenor.com/C9ptDG1X42YAAAAC/rock-eyebrow.gif"
              className="w-[400px] h-[400px] rounded-lg"
            />
            <p className="text-white">
              Seems like you are not logged in.{" "}
              <span className="font-medium text-primary-600 hover:underline text-primary cursor-pointer">
                <Link to="/login"> Please login to continue!</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const hasStore = async () => {
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .eq("owner", auth.user.id);

    navigate("/stores/" + data[0].store_name, { state: data[0] });
  };

  if (auth.user) {
    if (auth.userData.has_store) {
      hasStore();
    }
  }

  return (
    <div>
      <Navbar />
      <StoreForm />
    </div>
  );
};

export default StoreForm1;
