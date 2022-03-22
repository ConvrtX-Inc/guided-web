import search from "../../../assets/admin/search.png";
import down from "../../../assets/admin/down.png";
import filter from "../../../assets/admin/filter.png";

import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const BecomeGuideNavigation = () => {
  return (
    <Navbar>
      <Form className="container-fluid justify-content-start">
        <NavLink
          //exact={true}
          to="/become-guide/all"
          //activeClassName="active"
          className="btn btn-light btn-guide me-2"
        >
          See All
        </NavLink>
        <NavLink
          //exact={true}
          to="/become-guide/approved"
          //activeClassName="active"
          className="btn btn-light btn-guide me-2"
        >
          Approved
        </NavLink>
        <NavLink
          //exact={true}
          to="/become-guide/pending"
          //activeClassName="active"
          className="btn btn-light btn-guide me-2"
        >
          Pending
        </NavLink>
        <NavLink
          //exact={true}
          to="/become-guide/rejected"
          //activeClassName="active"
          className="btn btn-light btn-guide me-2"
        >
          Rejected
        </NavLink>
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
          //activeClassName="active"
          className="btn btn-light btn-filter"
        >
          <Image src={filter} alt="" /> Filter
        </NavLink>
      </Form>
    </Navbar>
  );
};

export default BecomeGuideNavigation;
