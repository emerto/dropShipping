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
    {
      key: 1,
      text: "Mobile",
      value: 1,
      content: <div className="bg-gray-800 w-full h-20">adasdas</div>,
    },
    {
      key: 2,
      text: "Tablet",
      value: 2,
      content: (
        <Header
          icon="tablet"
          content="Tablet"
          subheader="The size in the middle"
        />
      ),
    },
    {
      key: 3,
      text: "Desktop",
      value: 3,
      content: (
        <Header icon="desktop" content="Desktop" subheader="The largest size" />
      ),
    },
  ];
  const [Show, setShow] = useState(false);
  return (
    <Modal
      onClose={() => setShow(false)}
      onOpen={() => setShow(true)}
      open={Show}
      trigger={<button className="btn-primary text-xl">Add Product</button>}
      style={{ backgroundColor: "1A1A1A" }}
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
