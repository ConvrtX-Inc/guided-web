import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SubAdminNavigation = () => {
  return (
    <Navbar>
      <ul className="">
        <li>
          <NavLink to="" className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="" className="nav-link">
            Post
          </NavLink>
          <NavLink to="" className="nav-link">
            Payments & Transaction History
          </NavLink>
          <NavLink to="" className="nav-link">
            SUpport
          </NavLink>
        </li>
      </ul>
    </Navbar>
  );
};

export default SubAdminNavigation;
