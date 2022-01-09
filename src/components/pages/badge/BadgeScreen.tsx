import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

import search from "../../../assets/admin/search.png";
import down from "../../../assets/admin/down.png";
import filter from "../../../assets/admin/filter.png";
import hunt from "../../../assets/admin/Hunt.png";
import create_badge from "../../../assets/admin/create-badge.png";

import "./BadgeScreen.scss";

const BadgeScreen = () => {
  return (
    <Container className="badge-container">
      <Row className="mt-5">
        <Col>
          <h2>Badge Management</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Navbar expand="lg">
            <Container fluid>
              <Nav>
                <NavLink
                  to="/badge/create"
                  className="btn btn-light btn-create-badge pt-2"
                >
                  <Image className="pe-2" src={create_badge} alt="" />
                  Create Badge
                </NavLink>
              </Nav>
              <Form className="d-flex">
                <InputGroup className="input-group-1 me-2">
                  <InputGroup.Text>
                    <Image src={search} alt="" />
                  </InputGroup.Text>
                  <Form.Control
                    className="input-search"
                    type="text"
                    placeholder="Search"
                  />
                </InputGroup>
                <InputGroup className="input-group-2 me-2">
                  <Form.Select className="custom-select">
                    <option>Sort by</option>
                  </Form.Select>
                  <InputGroup.Text>
                    <Image src={down} alt="" />
                  </InputGroup.Text>
                </InputGroup>
                <NavLink
                  to="/become-guide/filter"
                  className="btn btn-light btn-filter"
                >
                  <Image src={filter} alt="" /> Filter
                </NavLink>
              </Form>
            </Container>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive borderless className="mt-4">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Badge Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Image src={hunt} alt="alt text here" />
                </td>
                <td className="badge-name">Hunting</td>
                <td>
                  Sample description goes here to explain about the badge.
                  Sample description goes here to explain about the badge{" "}
                </td>
                <td>
                  <Button className="btn-edit">Edit</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default BadgeScreen;
