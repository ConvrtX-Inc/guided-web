import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

//import "./FAQItems.scss";

const FAQItems = (props: any) => {
  const [open, setOpen] = useState(false);

  const inputHandler = (e: any) => {
    props.inputChange(e);
  };

  return (
    <React.Fragment>
      <Row className="ps-4">
        <Col>
          <h3>Sample question {props.seq + 1}</h3>
        </Col>
        <Col>
          <button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className="btn-collapse float-end"
          >
            {!open && "-"}
            {open && "+"}
          </button>
        </Col>
      </Row>
      <Row>
        <Col>
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
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FAQItems;
