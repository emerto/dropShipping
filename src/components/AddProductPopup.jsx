import React, { useState } from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Input,
  Dropdown,
} from "semantic-ui-react";
import supabase from "../config/supaBaseClient";

const AddProductPopup = () => {
  const [supplierProducts, setSupplierProducts] = useState([]);

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
        <div className="flex text-white">
          <img className="object-cover h-16 w-[20%]" src={product.image} />
          <div className="flex items-center">
            <span className="flex ml-6 text-3xl font-bold">{product.name}</span>
          </div>
          <div className="flex items-center">
            <span className="flex ml-6 text-3xl font-bold">
              {product.price}$
            </span>
          </div>
        </div>
      ),
    }));
  };

  const productOptions = mapToOptions(supplierProducts);

  const [Show, setShow] = useState(false);
  return (
    <Modal
      onClose={() => setShow(false)}
      onOpen={() => setShow(true)}
      open={Show}
      trigger={
        <button className="btn-primary text-xl" onClick={fetchSupplierProducts}>
          Add Product
        </button>
      }
      style={{ backgroundColor: "1A1A1A" }}
    >
      <Modal.Header style={{ color: "#FFFFFF" }}>Add product</Modal.Header>
      <Modal.Content>
        <form className="space-y-4 md:space-y-6" action="Submit">
          <div>
            <label
              htmlFor="productName"
              className="block mb-2 text-start w-auto text-sm font-medium text-gray-800"
            >
              Product name
            </label>
            <input
              type="productName"
              name="fProductName"
              id="fProductName"
              placeholder="Enter product name"
              className="input-form bg-secondary focus:bg-neutral-700"
            />
            <label
              htmlFor="price"
              className="block mb-2 text-start w-auto text-sm font-medium text-gray-800"
            >
              Price
            </label>
            <input
              type="price"
              name="fPrice"
              id="fPrice"
              placeholder="Enter price"
              className="input-form bg-secondary focus:bg-neutral-700"
            />
            <label
              htmlFor="product"
              className="block mb-2 text-start w-auto text-sm font-medium text-gray-800"
            >
              Product
            </label>
            <Dropdown
              placeholder="Select product"
              fluid
              search
              selection
              options={productOptions}
            />
          </div>
        </form>
      </Modal.Content>
      <Modal.Actions>
        <button
          className="bg-primary text-white rounded-2xl"
          onClick={() => setShow(false)}
        >
          Close
        </button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddProductPopup;
