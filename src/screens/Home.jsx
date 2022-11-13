import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import StoreWithProducts from "../components/StoreWithProducts";

import supabase from "../config/supaBaseClient";
const Home = () => {
  const [randomStore, setRandomStore] = useState([]);

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

  return (
    <>
      <div className="h-[100vh] bg-slate-900">
        <Navbar />
        {randomStore.map((store) => (
          <StoreWithProducts store={store} key={store.id} />
        ))}
      </div>
    </>
  );
};

export default Home;
