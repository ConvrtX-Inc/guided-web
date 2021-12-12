import "./phoneverification.scss"

import { Link } from "react-router-dom"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const PhoneVerification = () => {
  return (
    <div className="phoneverification-form col-sm-12 col-md">
      <Form className="m-5">
        <h4>Verify your phone</h4>
        <p>Verification code sent to your phone +1 234 567 8901</p>
        <Row>
          <Col>
            <Form.Control type="number" disabled></Form.Control>
          </Col>
          <Col>
            <Form.Control type="number" disabled></Form.Control>
          </Col>
          <Col>
            <Form.Control type="number" disabled></Form.Control>
          </Col>
          <Col>
            <Form.Control type="number" disabled></Form.Control>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="p-1">
              Didn’t recive code?{" "}
              <Link to={{ pathname: "/send-otp" }}>Resend OTP</Link>
            </p>
          </Col>
        </Row>
        <Button className="login-btn mt-3" type="submit">
          Verify
        </Button>
      </Form>
    </div>
  );
};

export default PhoneVerification
