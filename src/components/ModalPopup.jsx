import React from "react";
import { useState } from "react";
import ReactModal from "react-modal";

const ModalPopup = () => {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }
  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="bg-red-600">
      <button onClick={openModal}>Click Me</button>
      <ReactModal
        isOpen={showModal}
        contentLabel="This is a pop up"
        className="mx-20 mt-40 bg-gray-900 border border-white"
      >
        <div className="m-5"></div>
        <form>
          <label className="block mb-2 text-start w-auto text-sm font-medium text-gray-300">
            Name
          </label>
          <input />
          <label className="block mb-2 text-start w-auto text-sm font-medium text-gray-300">
            Price
          </label>
          <input />
          <label className="block mb-2 text-start w-auto text-sm font-medium text-gray-300">
            Product
          </label>
        </form>
        <button className="bg-orange-400" onClick={closeModal}>
          Close
        </button>
      </ReactModal>
    </div>
  );
};

export default ModalPopup;
