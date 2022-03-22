import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import Logs from "./Logs";

import "./Tncs.scss";

import GuidelinesService from "../../../services/guidelines/Guidelines.Service";

const Tncs = () => {
  const [isExist, setisExist] = useState(false);
  const [isPending, setisPending] = useState(false);
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
    setisPending(true);
    if (isExist === true) {
      try {
        await GuidelinesService.patchData(id, data).then(
          (res) => {
            console.log(res);
            setisPending(false);
          },
          (err) => {
            console.log(err);
            setisPending(false);
          }
        );
      } catch (err) {
        console.log(err);
        setisPending(false);
      }
    } else {
      try {
        await GuidelinesService.postData(id, {
          type_name: "Terms & Conditions",
          text_content: text_content,
        }).then(
          (res) => {
            console.log(res);
            setisPending(false);
          },
          (err) => {
            console.log(err);
            setisPending(false);
          }
        );
      } catch (err) {
        console.log(err);
        setisPending(false);
      }
    }
    loadData();
  };

  const loadData = async () => {
    try {
      setisPending(true);
      await GuidelinesService.loadTncs().then(
        (res) => {
          if (res.length > 0) {
            setData(res[0]);
            setisExist(true);
          } else {
            setisExist(false);
          }
          setisPending(false);
        },
        (error) => {
          setisPending(false);
        }
      );
    } catch (err) {
      console.log(err);
      setisPending(false);
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
            {!isPending && (
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
                    {!isPending && (
                      <Button type="submit" className="btn btn-save">
                        Save
                      </Button>
                    )}
                    {isPending && (
                      <Button className="btn btn-save" type="button" disabled>
                        <span
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Loading...
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            )}
            {isPending && <Spinner />}
          </Col>
          <Logs />
        </Row>
      </Col>
    </Row>
  );
};

export default Tncs;
