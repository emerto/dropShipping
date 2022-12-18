import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import supabase from "../config/supaBaseClient";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProductPopup = ({ product }) => {
  const [price, setPrice] = useState(product.price);
  const [productName, setProductName] = useState(product.name);
  const [Show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProduct();
    setShow(false);
  };

  const updateProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .update({ name: productName, price: price })
      .eq("id", product.id);

    if (error) {
      toast.error("Updating product information failed.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (data) {
      toast.success(`Product updated successfully!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

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
          <button className="bg-primary py-1 px-2 rounded-2xl text-black">
            Show Modal
          </button>
        }
      >
        <Modal.Header>
          <div className="text-white flex justify-between">
            <span className="mt-1 text-2xl">Edit Product</span>
            <Modal.Actions>
              <div className="flex justify-end">
                <div className="flex bg-primary p-1 rounded-lg">
                  <button
                    className="flex text-white w-7 h-7"
                    onClick={() => setShow(false)}
                  >
                    <XMarkIcon className="text-white" />
                  </button>
                </div>
              </div>
            </Modal.Actions>
          </div>
        </Modal.Header>
        <Modal.Content>
          <form
            className="space-y-4 md:space-y-6"
            action="Submit"
            onSubmit={handleSubmit}
          >
            <div className=" bg-slate-900">
              <label
                htmlFor="productName"
                className="block mb-2 text-start w-auto h-full text-sm font-medium text-white"
              >
                Product name
              </label>
              <input
                type="productName"
                name="fProductName"
                id="fProductName"
                placeholder={product.name}
                className="input-form w-auto bg-secondary focus:bg-neutral-700"
                onChange={(e) => setProductName(e.target.value)}
              />
              <label
                htmlFor="price"
                className="block mb-2 text-start w-auto text-sm font-medium text-white mt-2"
              >
                Price
              </label>
              <input
                type="price"
                name="fPrice"
                id="fPrice"
                placeholder={product.price}
                className="input-form w-auto bg-secondary focus:bg-neutral-700"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <Modal.Actions>
              <div className="flex justify-end">
                <div className="flex bg-primary p-3 rounded-lg">
                  <button className="flex text-white" type="submit">
                    Save Changes
                  </button>
                </div>
              </div>
            </Modal.Actions>
          </form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default EditProductPopup;
