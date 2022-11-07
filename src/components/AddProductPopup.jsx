import React, { useEffect, useState } from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Input,
  Dropdown,
} from "semantic-ui-react";
import supabase from "../config/supaBaseClient";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductPopup = ({ storeId }) => {
  const [dropValue, setDropValue] = useState(null);
  const [supplierProducts, setSupplierProducts] = useState([]);
  const [Show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = async () => {
    var imageUrlText;
    const { data: imageData, error: imageError } = await supabase
      .from("supplier_products")
      .select("image")
      .eq("id", dropValue)
      .single();

    if (imageError) {
      console.log(imageError);
    }

    if (imageData) {
      imageUrlText = imageData.image;
    }

    const { data, error } = await supabase.from("products").insert([
      {
        supplier_product_id: dropValue,
        name: productName,
        price: price,
        supplier_prod_image: imageUrlText,
        store_id: storeId.toString(),
      },
    ]);
    if (data) {
      toast.success(`Product added successfully!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addProduct();
    setShow(false);
  };

  const fetchSupplierProducts = async () => {
    const { data, error } = await supabase
      .from("supplier_products")
      .select("*");

    if (error) {
      console.log(error);
    }

    if (data) {
      setSupplierProducts(data);
    }
  };

  const mapToOptions = (product) => {
    return product.map((product) => ({
      key: product.id,
      text: product.name,
      value: product.id,
      content: (
        <div className="flex items-center text-slate-300">
          <img
            className="object-cover h-[100px] w-[100px]"
            src={product.image}
          />
          <div className="ml-3 min-w-[200px] justify-center flex items-center ">
            <span className="flex ml-6 text-3xl font-bold">{product.name}</span>
          </div>
          <div className=" w-full ml-6 flex justify-around ">
            <span className="text-3xl font-bold ">${product.price}</span>
            <span className="text-3xl font-bold ">Stock: {product.stock}</span>
          </div>
        </div>
      ),
    }));
  };

  const productOptions = mapToOptions(supplierProducts);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Modal
        onClose={() => setShow(false)}
        onOpen={() => setShow(true)}
        open={Show}
        trigger={
          <button
            className="btn-primary text-xl"
            onClick={fetchSupplierProducts}
          >
            Add Product
          </button>
        }
        style={{ backgroundColor: "1A1A1A" }}
      >
        <Modal.Header style={{ color: "#FFFFFF" }}>
          <div className="flex justify-between">
            Add product{" "}
            <div className="flex bg-primary p-1 rounded-lg">
              <button
                className="flex text-white w-7 h-7"
                onClick={() => setShow(false)}
              >
                <XMarkIcon className="text-white" />
              </button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Content>
          <form
            className="space-y-4 md:space-y-6"
            action="Submit"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="productName"
                className="block mb-2 text-start w-auto text-sm font-medium text-white"
              >
                Product name
              </label>
              <input
                type="productName"
                name="fProductName"
                id="fProductName"
                placeholder="Enter product name"
                className="input-form bg-secondary focus:bg-neutral-700"
                onChange={(e) => setProductName(e.target.value)}
              />
              <br />
              <label
                htmlFor="price"
                className="block mb-2 text-start w-auto text-sm font-medium text-white"
              >
                Price
              </label>
              <input
                type="price"
                name="fPrice"
                id="fPrice"
                placeholder="Enter price"
                className="input-form bg-secondary focus:bg-neutral-700"
                onChange={(e) => setPrice(e.target.value)}
              />
              <br />
              <label
                htmlFor="product"
                className="block mb-2 text-start w-auto text-sm font-medium text-white"
              >
                Product
              </label>
              <Dropdown
                placeholder="Select product"
                fluid
                search
                selection
                options={productOptions}
                onChange={(e, { value }) => {
                  setDropValue(value);
                }}
              />
            </div>
            <div className="space-x-4 flex justify-end">
              <button className="btn-primary text-xl w-[20%]" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default AddProductPopup;
