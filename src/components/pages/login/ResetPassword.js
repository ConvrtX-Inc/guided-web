import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ResetPassword = () => {
  return (
    <div className="login-form col-sm-12 col-md">
      <Form className="m-5">
        <Row>
          <Col>
            <h2>Reset Password</h2>
          </Col>
        </Row>
        <Row>
          <p>
            Enter the email associated with your account and we'll send an email
            with instructions to reset your password.
          </p>
          <Form.Group className="mb-3" controlId="forEmailAdddress">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Email"></Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Button className="login-btn" type="submit">
              Send Instructions
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ResetPassword;
