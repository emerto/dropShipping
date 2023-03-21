import { NextPage } from "next";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

import { supabase } from "../utils/supabaseClient";

export async function getServerSideProps() {
  let { data } = await supabase.from("products").select().limit(5);

  return {
    props: {
      products: data,
    },
  };
}

const Home: NextPage = ({ products }) => {
  return (
    <>
      <Hero />
      {products.map((product) => (
        <ProductCard product={product} key={product.id} edit={false} />
      ))}
    </>
  );
};

export default Home;
