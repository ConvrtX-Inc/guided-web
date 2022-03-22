import "./signin.scss";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useContext, useState } from "react";
import AuthService from "../../../services/Auth.Service";
import AuthContext from "../../../context/AuthContext";

interface LocationState {
  status: boolean;
  message: string;
}

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;

  const authCtx = useContext(AuthContext);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setIsPending(true);
    setIsError(false);

    try {
      await AuthService.login(email, password).then(
        (res) => {
          setIsPending(false);
          authCtx.login(res, "0");
          navigate("../dashboard", { replace: true });
        },
        (error) => {
          var err = "";
          if (error.response.data.errors.email !== undefined) {
            err = error.response.data.errors.email;
          }
          if (error.response.data.errors.password !== undefined) {
            err = error.response.data.errors.password;
          }
          setErrMessage(err);
          setIsError(true);
          setIsPending(false);
        }
      );
    } catch (err) {
      console.log(err);
      setIsPending(false);
    }
  };

  return (
    <div className="login-form col-sm-12 col-md">
      <Form className="m-5" onSubmit={handleLogin}>
        <h2>Sign in</h2>

        {isError && (
          <Alert
            className="mt-1 signin-alert"
            variant="danger"
            onClose={() => setIsError(false)}
            dismissible
          >
            <p>{errMessage}</p>
          </Alert>
        )}
        {locationState?.status && (
          <Alert
            className="mt-1 signin-alert"
            variant="success"
            onClose={() => setIsError(false)}
            dismissible
          >
            <p>{locationState.message}</p>
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
            type="email"
            placeholder="Username"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          ></Form.Control>
        </Form.Group>
        <Link
          to={{
            pathname: "/change-pwd",
          }}
        >
          Forget password?
        </Link>
        {!isPending && (
          <Button className="login-btn mt-3" type="submit">
            Login
          </Button>
        )}
        {isPending && (
          <Button className="login-btn mt-3" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm me-1"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </Button>
        )}
      </Form>
    </div>
  );
};

export default SignInForm;
