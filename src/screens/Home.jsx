import React from "react";
import supabase from "../config/supaBaseClient";
import Navbar from "../components/Navbar";

const Home = () => {
  console.log(supabase);
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Home;
