import React, { useEffect } from "react";

import Navbar from "../components/Navbar";

import supabase from "../config/supaBaseClient";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ManageStore = () => {
  const location = useLocation();
  const storeInfo = location.state;

  const { owner, store_name, store_description, store_image } = storeInfo;

  const user = supabase.auth.user();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (user.id != owner) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
};

export default ManageStore;
