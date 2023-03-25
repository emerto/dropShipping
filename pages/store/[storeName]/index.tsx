import { supabaseClient } from "../../../utils/supabaseBrowserClient";
import { Database } from "../../../types/supabase";
import Image from "next/image";
import { Icon } from "@iconify/react";
import ProductCard from "../../../components/ProductCard";

type store = Database["public"]["Tables"]["stores"]["Row"];
type products = Database["public"]["Tables"]["products"]["Row"];

export async function getServerSideProps(context: {
  query: { storeName: any };
}) {
  const { storeName } = context.query;

  const { data: store, error } = await supabaseClient
    .from("stores")
    .select("*")
    .eq("store_name", storeName)
    .single();

  if (error) {
    return {
      notFound: true,
    };
  }

  const { data: products, error: productsError } = await supabaseClient
    .from("products")
    .select("*")
    .eq("store_id", store.id);

  if (productsError) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      store: store,
      products: products,
    },
  };
}

type Props = {
  store: store;
  products: products[];
};

const index = ({ store, products }: Props) => {
  return (
    <main className="flex flex-col">
      <div className="flex flex-col lg:flex-row items-center w-full p-8 bg-gray-300/10 rounded-xl">
        <Image
          src={`${store.store_image}`}
          alt="Profile Avatar"
          width={300}
          height={300}
          className="lg:w-32 w-30 rounded-xl"
        />
        <div className="divider divider-horizontal w-fit bg-primary" />
        <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full mt-5 lg:mt-0">
          <h1 className="lg:text-3xl text-2xl font-bold text-base-content capitalize">
            {store.store_name}
          </h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-end gap-2">
              <p className="capitalize text-lg">{store.store_address}</p>
              <Icon
                icon="mdi:address-marker"
                className="text-primary w-6 h-6"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="capitalize text-lg">{store.store_phone}</p>
              <Icon icon="mdi:phone" className="text-primary w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3 mt-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} edit={false} />
        ))}
      </section>
    </main>
  );
};

export default index;
