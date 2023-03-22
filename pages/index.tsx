import { NextPage } from "next";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

import { supabase } from "../utils/supabaseClient";

export async function getServerSideProps() {
  let { data } = await supabase.from("products").select("*");

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} edit={false} />
        ))}
      </div>
    </>
  );
};

export default Home;
