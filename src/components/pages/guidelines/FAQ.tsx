import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Logs from "./Logs";
import FAQItems from "./FAQItems";

import api from "../../config/Api";

import "./FAQ.scss";

const FAQ = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const result = await api.get(
      "api/v1/guidelines?filter=type_name%7C%7C%24eq%7C%7CFAQ"
    );
    setData(result.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
  };

  const onInputChange = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <Row className="mt-3">
      <Col className="ms-4 me-4 faq-content">
        <Row>
          <Col className="col-8 left-col">
            <Form className="mt-5" onSubmit={(e) => onSubmit(e)}>
              {data.map((faqItem: any, index) => (
                <Row key={faqItem.id}>
                  <Col>
                    <FAQItems
                      inputChange={onInputChange}
                      seq={index}
                      items={faqItem}
                    />
                  </Col>
                </Row>
              ))}
              <Row className="ps-4">
                <Col className="mt-4">
                  <Button type="submit" className="btn btn-primary btn-save">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Logs />
        </Row>
      </Col>
    </Row>
  );
};

export default FAQ;
