import React from "react";
import supabase from "../config/supaBaseClient";
import Navbar from "../components/Navbar";
import StoreForm from "../components/StoreForm";
import Slider from "../components/Slider";
const Home = () => {
  console.log(supabase);
  return (
    <div className=" bg-gray-900">
      <Navbar />

      <Slider />
    </div>
  );
};

export default Home;
