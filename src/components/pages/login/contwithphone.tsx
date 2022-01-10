import "./contwithphone.scss";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

const ContWithPhone = () => {
  return (
    <div className="contphone-form col-sm-12 col-md">
      <Form className="m-5">
        <h2>Continue With Phone</h2>
        <p>You’ll receive 4 dgit code to verify next.</p>
        <Form.Group className="mb-3" controlId="formNumber">
          <Form.Label>Enter Phone Number</Form.Label>
          <IntlTelInput preferredCountries={["ph"]} />
        </Form.Group>
        <Button className="login-btn mt-3" type="submit">
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default ContWithPhone;
