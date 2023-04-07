import Select from "react-select";
import Image from "next/image";
import type { Database } from "../types/supabase";

type supplierProducts =
  Database["public"]["Tables"]["supplier_products"]["Row"];

import React from "react";

type Props = {
  setSelectedProduct: (e: any) => void;
  suppProds: supplierProducts[];
};

type Option = {
  innerRef: any;
  innerProps: any;
  data: supplierProducts;
};

const Dropdown = ({ setSelectedProduct, suppProds }: Props) => {
  const mapped = suppProds.map((prod) => ({
    value: prod.id,
    label: prod.name,
    data: prod,
  }));

  const CustomOption = ({ innerRef, innerProps, data }) => {
    const product = data.data as supplierProducts;
    return (
      <div
        {...innerProps}
        ref={innerRef}
        className="flex items-center lg:justify-between bg-base-100 hover:cursor-pointer hover:bg-base-200"
      >
        <div className="flex items-center">
          <Image
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
            className="w-20 h-20"
          />
          <div className="ml-2 flex flex-col lg:flex-row">
            <span className="text-lg">{product.name}</span>
            <div className="flex lg:hidden gap-2 text-sm">
              <p>
                Price: ${product.price} <span className="text-primary">|</span>{" "}
                Stock: {product.stock}
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex gap-2">
          <p>
            Price: ${product.price} <span className="text-primary">|</span>{" "}
            Stock: {product.stock}
          </p>
        </div>
      </div>
    );
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "0.5rem",
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "transparent",
      zIndex: 9999,
    }),
    option: (provided: any) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "0.5rem",
    }),
  };

  return (
    <Select
      id="addProduct"
      instanceId="addProduct"
      options={mapped}
      className="border-2 border-primary rounded-md"
      isSearchable
      placeholder="Select a product"
      styles={customStyles}
      filterOption={(option, rawInput) => {
        const input = rawInput.toLowerCase();
        const name = option.label.toLowerCase();
        return name.includes(input);
      }}
      onChange={(e) => setSelectedProduct(e)}
      menuPortalTarget={typeof document !== "undefined" ? document.body : null}
      components={{ Option: CustomOption }}
      menuPlacement="bottom"
    />
  );
};

export default Dropdown;
