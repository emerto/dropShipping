import React, { useState } from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Input,
  Dropdown,
} from "semantic-ui-react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const AddProductPopup = () => {
  const [Show, setShow] = useState(false);
  return (
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
        <form className="space-y-4 md:space-y-6" action="Submit">
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
              placeholder="Enter product name"
              className="input-form w-auto bg-secondary focus:bg-neutral-700"
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
              placeholder="Enter price"
              className="input-form w-auto bg-secondary focus:bg-neutral-700"
            />
          </div>
        </form>
        <Modal.Actions>
          <div className="flex justify-end">
            <div className="flex bg-primary p-3 rounded-lg">
              <button className="flex text-white">Save Changes</button>
            </div>
          </div>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
};

export default AddProductPopup;
