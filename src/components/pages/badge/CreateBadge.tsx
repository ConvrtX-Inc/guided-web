import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

import left from "../../../assets/admin/left.png";
import img_preview from "../../../assets/admin/img-preview.png";

import "./CreateBadge.scss";

const CreateBadge = () => {
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
              <Image src={img_preview} alt="" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form className="create-badge-form">
              <Row className="pt-4">
                <Col className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Badge Name"
                    aria-label="Badge Name"
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
                    <option selected>Select Color</option>
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
                  ></textarea>
                </Col>
              </Row>
              <Row className="pt-5">
                <Col className="col-4">
                  <Button className="btn-create">Create</Button>
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
