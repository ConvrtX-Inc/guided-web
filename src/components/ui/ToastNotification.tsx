import { useState } from "react";
import Toast from "react-bootstrap/Toast";

const ToastNotification = () => {
  const [show, setShow] = useState(true);

  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={5000}
      autohide
      role="alert"
      className="position-fixed top-0 end-0 m-4"
    >
      <Toast.Header>
        <strong className="me-auto">Bootstrap 5</strong>
        {/*<small>4 mins ago</small>*/}
      </Toast.Header>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    </Toast>
  );
};

export default ToastNotification;
