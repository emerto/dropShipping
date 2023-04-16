import { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import Search from "../components/Search";
import StoreWithProducts from "../components/StoreWithProducts";

import { supabase } from "../utils/supabaseClient";

export async function getServerSideProps() {
  const { data, error } = await supabase.from("stores").select(
    `
      *,
      products (
        *
      )
      `
  );

  if (data) {
    // Shuffle the array of stores using a randomizer function
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    const shuffledStores = shuffleArray(data);

    // Select the first 3 stores from the shuffled array
    const randomStores = shuffledStores.slice(0, 3);

    const products = randomStores.map((store) => {
      return {
        ...store,
        products: store.products?.slice(0, 3),
      };
    });

    randomStores.map((store, index) => {
      store.products = products[index].products;
    });

    return {
      props: {
        stores: randomStores,
      },
    };
  }

  if (error) {
    console.log(error.message);
  }
}

const Home: NextPage = ({ stores }) => {
  return (
    <div>
      <Head>
        <title>DropShoop - Your Ultimate Dropshipping Destination</title>
      </Head>
      <div className="flex lg:hidden w-full">
        <Search />
      </div>
      <Hero />
      <div className="h-full flex flex-col w-full px-4 py-8 gap-5">
        {stores?.map((store) => (
          <div key={store.id}>
            <StoreWithProducts storeWithProducts={store} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
