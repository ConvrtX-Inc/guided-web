import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//import "./Logs.scss";
//import { useEffect, useState } from "react";

const Logs = () => {
  return (
    <Col className="ps-4 pe-4 col-logs">
      <Row className="mt-5">
        <Col>
          <h2>September 12, 2021</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>Update Logs</h6>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="p-dates">06/19/2021</p>
          <p className="p-desc">FAQ</p>

          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="p-dates">07/20/2021</p>
          <p className="p-desc">Terms & Conditions</p>

          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="p-dates">07/30/2021</p>
          <p className="p-desc">Traveler release & Waiver Form </p>

          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="p-dates">08/11/2021</p>
          <p className="p-desc">Cancellation Policy</p>

          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="p-dates">09/3/2021</p>
          <p className="p-desc">GuidED Payment & Payout Terms</p>

          <hr />
        </Col>
      </Row>
    </Col>
  );
};

export default Logs;
