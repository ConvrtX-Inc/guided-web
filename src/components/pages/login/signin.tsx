import "./signin.scss";

import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SignInForm = () => {
  return (
    <div className="login-form col-sm-12 col-md">
      <Form className="m-5">
        <h2>Sign in</h2>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Control type="email" placeholder="Username"></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control type="password" placeholder="Password"></Form.Control>
        </Form.Group>
        <Link
          to={{
            pathname: "/change-pwd",
          }}
        >
          Forget password?
        </Link>
        <Button className="login-btn mt-3" type="submit">
          Sign In
        </Button>
      </Form>
    </div>
  );
};

export default SignInForm;
