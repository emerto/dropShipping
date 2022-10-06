import React from "react";
import Navbar from "../components/Navbar";
import StoreForm from "../components/StoreForm";
import Stores from "../components/Stores";

const Home = () => {
  return (
    <div className=" bg-gray-900 h-[100vh]">
      <Navbar />
      <Stores />
    </div>
  );
};

export default Home;
