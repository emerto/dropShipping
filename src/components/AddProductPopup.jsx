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
      <Modal.Header>Add product</Modal.Header>
      <Modal.Content>
        <h1>dasdasd</h1>
      </Modal.Content>
      <Modal.Actions>
        <button onClick={() => setShow(false)}>Close</button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddProductPopup;
