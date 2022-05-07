import { useState } from "react";
import Toast from "react-bootstrap/Toast";

const ToastNotificationBasic = (props: any) => {
  const [show, setShow] = useState(true);
  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={5000}
      autohide
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className="align-items-center position-fixed top-0 end-0 m-4"
      bg={props.variant || `light`}
    >
      <div className="d-flex">
        <Toast.Body>{props.message}</Toast.Body>
        <button
          type="button"
          className="btn-close me-2 m-auto"
          aria-label="Close"
          onClick={() => setShow(false)}
        ></button>
      </div>
    </Toast>
  );
};
export default ToastNotificationBasic;
