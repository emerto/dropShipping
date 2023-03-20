import { useState } from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../../types/supabase";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { supabase } from "../../utils/supabaseClient";
import toast from "react-hot-toast";

import ProductDropdown from "../../components/ProductDropdown";
import {
  GetServerSidePropsContext,
  PreviewData,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { ParsedUrlQuery } from "querystring";

type store = Database["public"]["Tables"]["stores"]["Row"];
type products = Database["public"]["Tables"]["products"]["Row"];
type supplierProducts =
  Database["public"]["Tables"]["supplier_products"]["Row"];

type Props = {
  store: store;
  products: products[];
  supplierProducts: supplierProducts[];
};

type Inputs = {
  productName: string;
  price: number;
  supplierProductImage: string;
  storeId: string;
};

type selectedProduct = {
  value: number;
  label: string;
  data: supplierProducts;
};

export const getServerSideProps = async (
  ctx:
    | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    | { req: NextApiRequest; res: NextApiResponse<any> }
) => {
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

  const { data: supplierProducts, error: supplierProductsError } =
    await supabase.from("supplier_products").select("*");

  if (supplierProductsError) {
    console.log(supplierProductsError);
  }

  return {
    props: {
      store,
      products,
      supplierProducts,
    },
  };
};

const ManageStore = ({ store, products, supplierProducts }: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<selectedProduct>();
  const [clientProducts, setClientProducts] = useState<products[]>(products);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    if (!selectedProduct?.data) {
      toast.error("Please select a product!");
      return;
    }

    const suppId = selectedProduct?.data?.id;
    const suppImage = selectedProduct?.data?.image;

    const res = await fetch("/api/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: data.productName,
        price: data.price,
        storeId: store.id,
        supplierProductId: suppId,
        supplierProductImage: suppImage,
      }),
    });

    if (!res.ok) {
      toast.error("Something went wrong!");
      return;
    }

    const json = await res.json();

    if (!json) {
      toast.error("Something went wrong!");
      return;
    }

    setClientProducts((prev) => [...prev, json.data]);

    toast.success("Product added successfully!");

    reset();
  };

  return (
    <section className="flex flex-col w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl lg:text-3xl font-semibold lg:font-bold text-base-content">
          {store.store_name}
        </h1>
        {/* {Modal} */}
        <label htmlFor="my-modal" className="btn btn-primary">
          Add Product
        </label>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box max-w-5xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Add Product</h3>
              <label htmlFor="my-modal" className="btn">
                <Icon icon="ic:baseline-close" className="w-[16px] h-[16px]" />
              </label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Cool Product"
                  {...register("productName", {
                    required: true,
                    minLength: 2,
                    maxLength: 40,
                  })}
                  className="input input-bordered w-full "
                />
                {errors.productName?.type === "required" && (
                  <span className="mt-1 text-sm text-red-600">
                    This field is required
                  </span>
                )}
                {errors.productName?.type === "minLength" && (
                  <span className="mt-1 text-sm text-red-600">
                    This field must be at least 2 characters
                  </span>
                )}
                {errors.productName?.type === "maxLength" && (
                  <span className="mt-1 text-sm text-red-600">
                    This field must be at most 40 characters
                  </span>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Product Price</span>
                </label>
                <input
                  type="number"
                  placeholder="420.69$"
                  {...register("price", {
                    required: true,
                    min: 0.01,
                  })}
                  className="input input-bordered w-full "
                />
                {errors.price?.type === "required" && (
                  <span className="mt-1 text-sm text-red-600">
                    This field is required
                  </span>
                )}
                {errors.price?.type === "min" && (
                  <span className="mt-1 text-sm text-red-600">
                    Price must be greater than 0
                  </span>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Select Product</span>
                </label>
                <ProductDropdown
                  setSelectedProduct={setSelectedProduct}
                  suppProds={supplierProducts}
                />
              </div>
              <div className="modal-action">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="divider h-fit bg-primary" />
      {/* {Products} */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {clientProducts?.map((product) => (
          <pre key={product.id}>{JSON.stringify(product, null, 2)}</pre>
        ))}
      </div>
    </section>
  );
};

export default ManageStore;
