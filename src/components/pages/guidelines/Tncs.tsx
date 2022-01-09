import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Tncs.scss";

import api from "./api/Guidelines";
import Logs from "./Logs";

import { useEffect, useState } from "react";

const Tncs = () => {
  const [isExist, setisExist] = useState(false);
  const [data, setData] = useState({
    id: "",
    type_name: "",
    text_content: "",
  });

  const { id, text_content } = data;

  const onInputChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (isExist === true) {
      await api.patch(`guidelines/${id}`, data);
    } else {
      await api.post(`guidelines/${id}`, {
        type_name: "Terms & Conditions",
        text_content: text_content,
      });
    }
    loadData();
  };

  const loadData = async () => {
    const result = await api.get(
      "guidelines?filter=type_name%7C%7C%24eq%7C%7CTerms%20%26%20Conditions&limit=1"
      //"guidelines?filter=type_name||$eq||Terms & Conditions&limit=1"
    );
    if (result.data.length > 0) {
      setData(result.data[0]);
      setisExist(true);
    } else {
      setisExist(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Row className="mt-3">
      <Col className="ms-4 me-4 tncs-content">
        <Row>
          <Col className="col-8 left-col">
            <Form onSubmit={(e) => onSubmit(e)}>
              <Row className="ms-3 me-2 mt-5">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={12}
                    name="text_content"
                    value={text_content}
                    onChange={(e) => onInputChange(e)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Col className="ms-4 mt-4 col-4">
                  <Button type="submit" className="btn btn-save">
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

export default Tncs;
