import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import left from "../../../assets/admin/left.png";

import api from "../../config/Api";

import "./CreateBadge.scss";

const CreateBadge = () => {
  const history = useNavigate();
  const [data, setData] = useState({
    id: "",
    badge_name: "",
    badge_description: "",
    imgBase64: "",
    img_icon: "",
  });

  const { badge_name, badge_description, imgBase64 } = data;

  const onInputChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await api.post(`api/v1/badges`, {
      badge_name: badge_name,
      badge_description: badge_description,
    });
    history("/badge");
  };

  return (
    <Container className="create-badge-container">
      <Navbar>
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <NavLink to="/badge" className="btn btn-light btn-bck me-3">
              <Image className="mb-2" src={left} alt="" />
            </NavLink>
            Create Badge
          </span>
        </div>
      </Navbar>
      <Container className="create-badge-content">
        <Row>
          <Col className="mt-5">
            <div className="title">
              <h3>Preview</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="img-container text-center pt-4">
              <Image src={imgBase64} alt="" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form className="create-badge-form" onSubmit={(e) => onSubmit(e)}>
              <Row className="pt-4">
                <Col className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Badge Name"
                    aria-label="Badge Name"
                    name="badge_name"
                    value={badge_name}
                    onChange={(e) => onInputChange(e)}
                  />
                </Col>
                <Col className="col-4">
                  <input className="form-control" type="file" id="formFile" />
                </Col>
              </Row>
              <Row className="pt-4">
                <Col className="col-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select Color</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </Col>
              </Row>
              <Row className="pt-4">
                <Col className="col-8">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="Description"
                    rows={3}
                    name="badge_description"
                    value={badge_description}
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                </Col>
              </Row>
              <Row className="pt-5">
                <Col className="col-4">
                  <Button type="submit" className="btn-create">
                    Create
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default CreateBadge;
