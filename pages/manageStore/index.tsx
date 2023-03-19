import { NextPage } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: isDropShipper, error } = await supabase
    .from("dropshippers")
    .select()
    .eq("dropshipper_id", session?.user?.id);

  if (error) {
    console.log(error);
  }

  if (!isDropShipper) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data: store } = await supabase
    .from("stores")
    .select("*")
    .eq("owner", session?.user?.id)
    .single();

  if (!store) {
    return {
      redirect: {
        destination: "/createStore",
        permanent: false,
      },
    };
  }

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("store_id", store?.id);

  if (productsError) {
    console.log(productsError);
  }

  return {
    props: {
      store,
      products,
    },
  };
};

const ManageStore: NextPage = ({ store, products }) => {
  return (
    <>
      <pre>{JSON.stringify(store, null, 2)}</pre>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </>
  );
};

export default ManageStore;
