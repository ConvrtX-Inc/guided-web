import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

import "./FAQItems.scss";

import plus from "../../../assets/admin/plus.png";
import minus from "../../../assets/admin/minus.png";

const FAQItems = (props: any) => {
  const [open, setOpen] = useState(false);

  const inputHandler = (e: any) => {
    props.inputChange(e);
  };

  return (
    <React.Fragment>
      <Row className="ps-4 pe-3">
        <Col>
          <h3>Sample question {props.seq + 1}</h3>
        </Col>
        <Col>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className="btn-collapse float-end btn-light bg-white"
          >
            {!open && <Image src={minus} alt="minus img" />}
            {open && <Image src={plus} alt="plus img" />}
          </Button>
        </Col>
      </Row>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Form.Control
            className="faq-desc-textarea"
            as="textarea"
            rows={6}
            defaultValue={props.items.text_content}
            onChange={(e) => inputHandler(e)}
          />
        </div>
      </Collapse>
    </React.Fragment>
  );
};

export default FAQItems;
