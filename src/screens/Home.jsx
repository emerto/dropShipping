import React from "react";
import supabase from "../config/supaBaseClient";
import Navbar from "../components/Navbar";
import StoreForm from "../components/StoreForm";
const Home = () => {
  console.log(supabase);
  return (
    <div>
      {/* <Navbar /> */}
      <StoreForm />
    </div>
  );
};

export default Home;
