import camera from "../../assets/admin/camera.png";
import card from "../../assets/admin/credit-card.png";
import post from "../../assets/admin/post.png";
import users from "../../assets/admin/Union.png";
import grid from "../../assets/admin/grid.png";
import clock from "../../assets/admin/clock.png";
import support from "../../assets/admin/Vector.png";
import file from "../../assets/admin/file-text.png";
import help from "../../assets/admin/help.png";

import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

//Admin/dashboard sidebar main navigation
const AdminNavigation = () => {
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <Navbar className="sidebar">
      <ul className="list-unstyled ps-3">
        <li className="mb-1">
          <NavLink to="/dashboard" className="nav-link">
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={grid} alt="" />
              </Col>
              <Col>Dashboard</Col>
            </Row>
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink to="/guides" className="nav-link">
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={users} alt="" />
              </Col>
              <Col>Guides & Outfitters</Col>
            </Row>
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink to="/post" className="nav-link">
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={post} alt="" />
              </Col>
              <Col>Post</Col>
            </Row>
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink to="/payment" className="nav-link">
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={card} alt="" />
              </Col>
              <Col>Pending Payments</Col>
            </Row>
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink to="/transaction" className="nav-link">
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={clock} alt="" />
              </Col>
              <Col>Transaction History</Col>
            </Row>
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink to="/support" className="nav-link">
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={support} alt="" />
              </Col>
              <Col>Support</Col>
            </Row>
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink to="/end-users" className="nav-link">
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={users} alt="" />
              </Col>
              <Col>End Users</Col>
            </Row>
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink to="/become-guide/all" className="nav-link">
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={users} alt="" />
              </Col>
              <Col>Become a Guide</Col>
            </Row>
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink to="/badge" className="nav-link">
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={camera} alt="" />
              </Col>
              <Col>Badge Management</Col>
            </Row>
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink to="/guidelines/faq" className="nav-link">
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={file} alt="" />
              </Col>
              <Col>Guidelines</Col>
            </Row>
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink to="/help" className="nav-link">
            <Row className="mt-2 ps-1">
              <Col className="col-2">
                <Image src={help} alt="" />
              </Col>
              <Col>Help</Col>
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

export default AdminNavigation;
