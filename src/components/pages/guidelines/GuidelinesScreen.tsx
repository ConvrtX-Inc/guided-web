import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Outlet } from "react-router-dom";
import GuidelinesNav from "./GuidelinesNav";

import "./GuidelinesScreen.scss";

const GuidelinesScreen = () => {
  return (
    <Container className="guidelines-container">
      <Row className="mt-5">
        <Col>
          <h2>Guidelines</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <GuidelinesNav />
      </Row>
      <Outlet />
    </Container>
  );
};

export default GuidelinesScreen;
