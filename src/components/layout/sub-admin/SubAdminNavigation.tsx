import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

import grid from "../../../assets/admin/grid.png";
import support from "../../../assets/admin/Vector.png";
import post from "../../../assets/admin/post.png";
import card from "../../../assets/admin/credit-card.png";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

const SubAdminNavigation = () => {
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <Navbar className="sidebar">
      <ul className="list-unstyled ps-3">
        <li className="mb-1">
          <NavLink to="sub-admin/dashboard" className="nav-link">
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={grid} alt="" />
              </Col>
              <Col>Dashboard</Col>
            </Row>
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink to="sub-admin/post" className="nav-link">
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={post} alt="" />
              </Col>
              <Col>Post</Col>
            </Row>
          </NavLink>
        </li>
        <li className="mb-5">
          <NavLink
            to="sub-admin/payment"
            className="nav-link transaction-history"
          >
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={card} alt="" />
              </Col>
              <Col>Payments & Transaction History</Col>
            </Row>
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink to="sub-admin/support" className="nav-link">
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={support} alt="" />
              </Col>
              <Col>Support</Col>
            </Row>
          </NavLink>
        </li>

        <li className="mb-3">
          <Row>
            <Col className="col-2"></Col>
            <Col>
              <Button variant="link" type="button" onClick={logoutHandler}>
                Log-out
              </Button>
            </Col>
          </Row>
        </li>
      </ul>
    </Navbar>
  );
};

export default SubAdminNavigation;
