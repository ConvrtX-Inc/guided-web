import "./LoginLayout.scss";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageSection from "./ImageSection";

function LoginLayout(props) {
  return (
    <div className="content">
      <Container className="signin-wrapper">
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <ImageSection />
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            {props.children}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginLayout;
