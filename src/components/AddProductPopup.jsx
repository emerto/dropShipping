import React, { useState } from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Input,
  Dropdown,
} from "semantic-ui-react";

const AddProductPopup = () => {
  const products = [
    { key: 1, text: "Product 1", value: 1 },
    { key: 2, text: "Product 2", value: 2 },
    { key: 3, text: "Product 3", value: 3 },
    { key: 4, text: "Product 4", value: 4 },
    { key: 5, text: "Product 5", value: 5 },
  ];
  const [Show, setShow] = useState(false);
  return (
    <Modal
      onClose={() => setShow(false)}
      onOpen={() => setShow(true)}
      open={Show}
      trigger={
        <button className="bg-primary rounded-2xl text-black">
          Show Modal
        </button>
      }
    >
      <Modal.Header>Add product</Modal.Header>
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
              options={products}
              style={{ backgroundColor: "#1A1A1A", color: "white" }}
            />
          </div>
        </form>
      </Modal.Content>
      <Modal.Actions>
        <button onClick={() => setShow(false)}>Close</button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddProductPopup;
