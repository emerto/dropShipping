import React, { useState } from "react";
import { Database } from "../types/supabase";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

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

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img
          src={clientProduct.supplier_prod_image}
          alt={clientProduct.name}
          className="w-full h-64 object-cover"
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
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {!edit && (
          <div className="card-actions justify-end">
            <button className="btn btn-primary">A Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
