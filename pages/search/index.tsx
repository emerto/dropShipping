import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../types/supabase";

import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";
import StoreCard from "../../components/StoreCard";

type storeType = Database["public"]["Tables"]["stores"]["Row"];
type productsType = Database["public"]["Tables"]["products"]["Row"];

type Props = {
  stores: storeType[];
  products: productsType[];
};

export async function getServerSideProps(context) {
  const query = context.query.q;
  const category = context.query.category;

  const supabase = createServerSupabaseClient(context);

  if (category === "products") {
    const { data: products, error } = await supabase
      .from("products")
      .select()
      .textSearch("name", query);

    return {
      props: {
        products,
      },
    };
  }

  if (category === "stores") {
    const { data: stores, error } = await supabase
      .from("stores")
      .select()
      .textSearch("store_name", query);

    return {
      props: {
        stores,
      },
    };
  }
}

const SearchPage = ({ stores, products }: Props) => {
  const router = useRouter();

  const query = router.query.q;
  const category = router.query.category;

  return (
    <main>
      <h1 className="text-3xl font-bold">Search Results for {query}</h1>
      {category === "products" ? (
        <>
          <p className="text-gray-500 text-sm">
            Found {products.length} results
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} edit={false} />
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-500 text-sm">Found {stores.length} results</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default SearchPage;
