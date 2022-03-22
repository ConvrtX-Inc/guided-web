import "./LoginLayout.scss";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageSection from "./ImageSection";
import { Outlet } from "react-router-dom";

//Login layout/wrapper
function LoginLayout() {
  return (
    <div className="content">
      <Container className="signin-wrapper">
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <ImageSection />
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginLayout;
