import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./style.scss";

type Props = {
  headerTitle: string;
  children: any;
};

const ContentWrapper = ({ headerTitle, children }: Props) => {
  return (
    <Container className="custom-container">
      <Row className="mt-5">
        <Col>
          <h2>{headerTitle}</h2>
        </Col>
      </Row>
      {children}
    </Container>
  );
};

export default ContentWrapper;
