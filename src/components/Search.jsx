import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  BuildingStorefrontIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import supabase from "../config/supaBaseClient";
import { ToastContainer, toast } from "react-toastify";

const Search = ({ setSearchReturn, setIsStoreRet }) => {
  const [search, setSearch] = useState("");
  const [isStore, setIsStore] = useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();

    if (!isStore) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${search}%`);

      if (error) {
        toast.error(`${error}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      if (data) {
        if (data.length === 0) {
          toast.error(`No results were found for ${search}`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        setSearchReturn(data);
      }
    }

    if (isStore) {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .ilike("store_name", `%${search}%`);

      if (error) {
        console.log(error);
      }

      if (data) {
        if (data.length === 0) {
          toast.error(`No results were found for ${search}`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        setSearchReturn(data);
      }
    }

    if (search === "") {
      setSearchReturn([]);
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form
        className="flex hamburger:mr-14 h-[41px] hamburger:mb-0 mb-5 hamburger:mt-1 mt-[50px] space-x-2 bg-gray-300 p-2 rounded-xl text-primary"
        onSubmit={formSubmit}
      >
        <MagnifyingGlassIcon className="w-[24px] h-[24px]" />
        <input
          type="search"
          name="search"
          placeholder={`Search for ${isStore ? "stores" : "products"}`}
          className="bg-transparent outline-none w-[200px] hamburger:w-[400px] text-black placeholder-gray-600 border-none focus:ring-0"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex justify-center items-center cursor-pointer">
          {isStore ? (
            <div
              onClick={() => {
                setIsStore(!isStore);
                setIsStoreRet(!isStore);
              }}
            >
              <BuildingStorefrontIcon className="w-[24px] h-[24px]" />
            </div>
          ) : (
            <div
              onClick={() => {
                setIsStore(!isStore);
                setIsStoreRet(!isStore);
              }}
            >
              <ShoppingBagIcon className="w-[24px] h-[24px]" />
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default Search;
