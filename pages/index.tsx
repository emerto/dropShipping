import { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import Search from "../components/Search";
import StoreWithProducts from "../components/StoreWithProducts";

import { supabase } from "../utils/supabaseClient";

export async function getServerSideProps() {
  //limit the products to 3
  const { data, error } = await supabase
    .from("stores")
    .select(
      `
    *,
    products (
      *
    )
  `
    )
    .limit(3);

  if (data) {
    const products = data.map((store) => {
      return {
        ...store,
        products: store.products?.slice(0, 3),
      };
    });

    data.map((store, index) => {
      store.products = products[index].products;
    });
  }

  if (error) {
    console.log(error.message);
  }

  return {
    props: {
      stores: data,
    },
  };
}

const Home: NextPage = ({ stores }) => {
  return (
    <>
      <Head>
        <title>DropShoop - Your Ultimate Dropshipping Destination</title>
      </Head>
      <div className="flex lg:hidden w-full">
        <Search />
      </div>
      <Hero />
      <div className="flex flex-col w-full px-4 py-8 gap-5">
        {stores?.map((store) => (
          <div key={store.id}>
            <StoreWithProducts storeWithProducts={store} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
