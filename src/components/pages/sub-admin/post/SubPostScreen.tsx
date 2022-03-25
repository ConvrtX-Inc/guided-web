import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

import search from "../../../../assets/admin/search.png";
import down from "../../../../assets/admin/down.png";
import filter from "../../../../assets/admin/filter.png";
import create_badge from "../../../../assets/admin/create-badge.png";

import "./SubPostScreen.scss";

const SubPostScreen = () => {
  return (
    <Container className="sub-post-container">
      <Row className="mt-5">
        <Col>
          <h2>Post</h2>
        </Col>
      </Row>
      <Row className="mt-4">
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
              <Form
                className="d-flex"
                //onSubmit={(e) => onSubmit(e)}
              >
                <InputGroup className="input-group-1 me-2">
                  <InputGroup.Text>
                    <Image src={search} alt="" />
                  </InputGroup.Text>
                  <Form.Control
                    className="input-search"
                    type="text"
                    placeholder="Search"
                    //onChange={(e) => onSearchChange(e)}
                  />
                </InputGroup>
                <InputGroup className="input-group-2 me-2">
                  <Form.Select className="custom-select">
                    <option>Sort by</option>
                  </Form.Select>
                  {/*<InputGroup.Text>
                    <Image src={down} alt="" />
  </InputGroup.Text>*/}
                </InputGroup>
                <Button
                  className="btn btn-light btn-filter"
                  //onClick={(e) => onClickFilter(e)}
                >
                  <Image src={filter} alt="" /> Filter
                </Button>
              </Form>
            </Container>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};
export default SubPostScreen;
