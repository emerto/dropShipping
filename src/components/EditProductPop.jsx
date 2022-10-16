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
      <Modal.Header>
        <div>
          Edit Product
          <Modal.Actions>
            <div className="flex justify-end">
              <div className="flex border py-2   rounded-xl bg-primary">
                <button className="flex " onClick={() => setShow(false)}>
                  Close
                </button>
              </div>
            </div>
          </Modal.Actions>
        </div>
      </Modal.Header>

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
              className="input-form w-auto bg-secondary focus:bg-neutral-700"
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
              className="input-form w-auto bg-secondary focus:bg-neutral-700"
            />
          </div>
        </form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
};

export default AddProductPopup;
