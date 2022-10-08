import React from "react";
import StoreForm from "../components/StoreForm";
import Navbar from "../components/Navbar";

import { useAuth } from "../context/AuthContext";

const StoreForm1 = () => {
  const auth = useAuth();
  return (
    <div>
      <Navbar />
      {auth.user ? <StoreForm></StoreForm> : <h1>you are not logged in</h1>}
    </div>
  );
};

export default StoreForm1;
