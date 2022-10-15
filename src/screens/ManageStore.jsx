import React from "react";

import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const ManageStore = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <>
      <Navbar />
    </>
  );
};

export default ManageStore;
