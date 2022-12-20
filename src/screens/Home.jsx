import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import StoreWithProducts from "../components/StoreWithProducts";

import supabase from "../config/supaBaseClient";
const Home = () => {
  const [randomStore, setRandomStore] = useState([]);
  const [searchReturn, setSearchReturn] = useState([]);
  const [isStoreRet, setIsStoreRet] = useState(false);

  const getStores = async () => {
    try {
      const { data, error } = await supabase.from("stores").select("*");

      if (error) {
        throw error;
      }

      if (data) {
        const randomStores = data.sort(() => 0.5 - Math.random()).slice(0, 3);
        setRandomStore(randomStores);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  const SearchComp = () => {
    if (isStoreRet) {
      return searchReturn.map((store) => (
        <StoreWithProducts store={store} key={store.id} />
      ));
    }

    return searchReturn.map((product) => (
      <ProductCard product={product} key={product.id} />
    ));
  };

  return (
    <div className="h-[100vh] bg-slate-900">
      <div className="flex flex-col bg-slate-900">
        <Navbar
          setSearchReturn={setSearchReturn}
          setIsStoreRet={setIsStoreRet}
        />
        {searchReturn.length === 0 ? (
          randomStore.map((store) => (
            <StoreWithProducts store={store} key={store.id} />
          ))
        ) : (
          <div className="mt-[100px]">
            {" "}
            <SearchComp />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
