import React from "react";
import StoreForm from "../components/StoreForm";
import Navbar from "../components/Navbar";

import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const StoreForm1 = () => {
  const auth = useAuth();
  return (
    <div>
      <Navbar />
      {auth.user ? (
        <StoreForm />
      ) : (
        <div className="w-[100vw] h-[100vh] bg-gray-900 flex justify-center items-center">
          <div className="flex flex-col w-[1000px] justify-center items-center gap-5">
            <img
              src="https://c.tenor.com/C9ptDG1X42YAAAAC/rock-eyebrow.gif"
              className="w-[400px] h-[400px] rounded-lg"
            />
            <p className="text-white">
              Seems like you are not logged in.
              <span className="font-medium text-primary-600 hover:underline text-primary cursor-pointer">
                <Link to="/login"> Please login to continue!</Link>
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreForm1;
