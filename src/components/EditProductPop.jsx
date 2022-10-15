import React from "react";
import { useState } from "react";
import ReactModal from "react-modal";

const EditProductPop = () => {
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
          <div className="w-full">
            <label
              className="block mb-2 text-start text-sm font-medium text-gray-300"
              for="user_avatar"
            >
              Upload an image
            </label>
            <input
              className="block  w-full text-sm  rounded-lg border  cursor-pointer text-gray-400 focus:outline-none bg-secondary border-primary placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
              accept={"image/jpeg image/png"}
            />
          </div>
        </form>
        <button className="bg-orange-400" onClick={closeModal}>
          Close
        </button>
      </ReactModal>
    </div>
  );
};

export default EditProductPop;
