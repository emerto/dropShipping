import React, { useState } from "react";
import { Database } from "../types/supabase";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useCartStore } from "../stores/useCartStore";
import { useAuthStore } from "../stores/useAuthStore";

type product = Database["public"]["Tables"]["products"]["Row"];

type Props = {
  product: product;
  edit: boolean;
};

type Inputs = {
  name: string;
  price: number;
};

const ProductCard = ({ product, edit }: Props) => {
  const [clientProduct, setClientProduct] = useState<product>(product);
  const { addToCart, cart } = useCartStore();
  const { userStore, storeId } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit = async (data: Inputs) => {
    const filterEmpty = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== "") {
        // Convert price value to number, if key is "price"
        if (key === "price") {
          acc[key] = Number(data[key]);
        } else {
          acc[key] = data[key];
        }
      }
      return acc;
    }, {});

    if (Object.keys(filterEmpty).length === 0) {
      toast.error("Please fill in at least one field!");
      return;
    }

    const res = await fetch("/api/editProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: clientProduct.id,
        ...filterEmpty,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      toast.error(json.error);
      return;
    }

    setClientProduct(json.data);

    toast.success("Product updated successfully!");
    reset();
  };

  const deleteProduct = async (id: number) => {
    const res = await fetch("/api/deleteProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      toast.error(json.error.message);
      return;
    }

    toast.success("Product deleted successfully!");
    router.reload();
  };

  const addToCartHandlerUser = () => {
    if (clientProduct.store_id === storeId) {
      toast.error("You can't add your own product to cart");
    } else if (
      cart.length === 0 ||
      cart[0].store_id === clientProduct.store_id
    ) {
      addToCart(clientProduct);
      toast.success("Product added to cart!");
    } else {
      toast.error("You can only add products from one store at a time!");
    }
  };

  const addToCartHandler = () => {
    if (cart.length === 0 || cart[0].store_id === clientProduct.store_id) {
      addToCart(clientProduct);
      toast.success("Product added to cart!");
    } else {
      toast.error("You can only add products from one store at a time!");
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <Image
          src={clientProduct.supplier_prod_image}
          alt={clientProduct.name}
          className="w-full h-64 object-cover"
          width={500}
          height={500}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">{clientProduct.name}</h2>
        <p className="text-primary text-lg">${clientProduct.price}</p>
        {/* {TODO} New Modal Comp or fix the performance*/}
        {edit && (
          <div className="card-actions justify-end">
            <label
              htmlFor={`modal-${clientProduct.id}`}
              className="btn btn-primary"
            >
              Edit Product
            </label>

            <input
              type="checkbox"
              id={`modal-${clientProduct.id}`}
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor={`modal-${clientProduct.id}`}
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                  onClick={() => reset()}
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold">
                  Edit{" "}
                  <span className="text-primary">{clientProduct.name}</span>
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Product Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder={clientProduct.name}
                      {...register("name", {
                        minLength: 2,
                        maxLength: 40,
                      })}
                      className="input input-bordered w-full"
                    />
                    {errors.name?.type === "minLength" && (
                      <span className="mt-1 text-sm text-red-600">
                        This field must be at least 2 characters
                      </span>
                    )}
                    {errors.name?.type === "maxLength" && (
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
                      step={"any"}
                      placeholder={clientProduct.price.toString()}
                      {...register("price", {
                        min: 0.01,
                      })}
                      className="input input-bordered w-full"
                    />
                    {errors.price?.type === "min" && (
                      <span className="mt-1 text-sm text-red-600">
                        Price must be greater than 0
                      </span>
                    )}
                  </div>
                  <div className="modal-action">
                    <button
                      className="btn btn-error"
                      onClick={() => {
                        deleteProduct(clientProduct.id);
                      }}
                      type="button"
                    >
                      Delete
                    </button>
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {!edit && userStore.id && (
          <div
            className="card-actions justify-end"
            onClick={addToCartHandlerUser}
          >
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        )}
        {!edit && !userStore.id && (
          <div className="card-actions justify-end" onClick={addToCartHandler}>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
