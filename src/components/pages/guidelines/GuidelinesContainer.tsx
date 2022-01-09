import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./GuidelinesContainer.scss";

const GuidelinesContainer = (props: any) => {
  return (
    <Container className="guidelines-container">
      <Row className="mt-5">
        <Col>
          <h2>Guidelines</h2>
        </Col>
      </Row>
      <Row>{props.children}</Row>
    </Container>
  );
};

export default GuidelinesContainer;
