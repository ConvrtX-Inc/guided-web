import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Logs from "./Logs";
import Spinner from "../../ui/Spinner";

import "./WaiverForm.scss";

import api from "../../config/Api";

const WaiverForm = () => {
  const [isExist, setisExist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
      await api.patch(`api/v1/guidelines/${id}`, data);
    } else {
      await api.post(`api/v1/guidelines/${id}`, {
        type_name: "Traveler Release & Waiver Form",
        text_content: text_content,
      });
    }
    loadData();
  };

  const loadData = async () => {
    const result = await api.get(
      "api/v1/guidelines?filter=type_name%7C%7C%24eq%7C%7CTraveler%20Release%20%26%20Waiver%20Form&limit=1"
    );
    if (result.data.length > 0) {
      setData(result.data[0]);
      setisExist(true);
    } else {
      setisExist(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Row className="mt-3">
      <Col className="ms-4 me-4 waiver-content">
        <Row>
          <Col className="col-8 left-col">
            {!isLoading && (
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
            )}
            {isLoading && <Spinner />}
          </Col>

          <Logs />
        </Row>
      </Col>
    </Row>
  );
};

export default WaiverForm;
