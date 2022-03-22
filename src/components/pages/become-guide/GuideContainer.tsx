import "./Guide.scss";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import BecomeGuideNavigation from "./BecomeGuideNavigation";
import { Outlet } from "react-router-dom";

const GuideContainer = () => {
  return (
    <Container className="guide-container">
      <Row className="mt-5">
        <Col>
          <h2>Become a Guide</h2>
        </Col>
      </Row>
      <Row>
        <BecomeGuideNavigation />
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
};

export default GuideContainer;
