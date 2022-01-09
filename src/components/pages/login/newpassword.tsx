import "./newpassword.scss";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NewPassword = () => {
  return (
    <div className="np-form col-sm-12 col-md">
      <Form className="m-5">
        <h2>Create New Password</h2>
        <p>Your password must be different from previous used password.</p>
        <Form.Group className="mb-3" controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
          ></Form.Control>
        </Form.Group>
        <Button className="login-btn mt-3" type="submit">
          Set Password
        </Button>
      </Form>
    </div>
  );
};

export default NewPassword;
