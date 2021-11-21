import { useState } from "react";
import Button from "react-bootstrap/Button";
import PasswordGenerator from "../helper/PasswordGenerator";
import ConfirmModal from "./ConfirmModal";

const ModalTest = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>Modal test page.</h1>
      <div>
        <Button onClick={openModal}>Show modal</Button>
      </div>
      <div>
        <h2>Random Password</h2>
        <PasswordGenerator />
      </div>
      {modalIsOpen && (
        <ConfirmModal
          onCancel={closeModal}
          onConfirm={closeModal}
          title="Sample title"
          body="Sample body"
        />
      )}
    </div>
  );
};

export default ModalTest;
