import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmModal = (props) => {
  const cancelHandler = () => {
    alert("Cancel is clicked!");
    props.onCancel();
  };
  const confirmHandler = () => {
    alert("Confirm is clicked!");
    props.onConfirm();
  };

  return (
    <Modal show="true" onHide={cancelHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancelHandler}>
          Close
        </Button>
        <Button variant="primary" onClick={confirmHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
