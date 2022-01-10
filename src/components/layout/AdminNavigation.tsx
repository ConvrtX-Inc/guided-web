import camera from "../../assets/admin/camera.png";
import card from "../../assets/admin/credit-card.png";
import post from "../../assets/admin/post.png";
import users from "../../assets/admin/Union.png";
import grid from "../../assets/admin/grid.png";
import clock from "../../assets/admin/clock.png";
import support from "../../assets/admin/Vector.png";
import file from "../../assets/admin/file-text.png";

import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

//Admin/dashboard sidebar main navigation
const AdminNavigation = () => {
  return (
    <Navbar className="sidebar">
      <ul className="list-unstyled ms-2">
        <li>
          <NavLink to="/dashboard" className="nav-link">
            <Image src={grid} alt="" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/guides" className="nav-link">
            <Image src={users} alt="" /> Guides & Outfitters
          </NavLink>
        </li>
        <li>
          <NavLink to="/post" className="nav-link">
            <Image src={post} alt="" /> Post
          </NavLink>
        </li>
        <li>
          <NavLink to="/payment" className="nav-link">
            <Image src={card} alt="" /> Pending Payments
          </NavLink>
        </li>
        <li>
          <NavLink to="/transaction" className="nav-link">
            <Image src={clock} alt="" /> Transaction History
          </NavLink>
        </li>
        <li>
          <NavLink to="/support" className="nav-link">
            <Image src={support} alt="" /> Support
          </NavLink>
        </li>
        <li>
          <NavLink to="/end-users" className="nav-link">
            <Image src={users} alt="" /> End Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/become-guide/all" className="nav-link">
            <Image src={users} alt="" /> Become a Guide
          </NavLink>
        </li>
        <li>
          <NavLink to="/badge" className="nav-link">
            <Image src={camera} alt="" /> Badge Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/guidelines/faq" className="nav-link">
            <Image src={file} alt="" /> Guidelines
          </NavLink>
        </li>
      </ul>
    </Navbar>
  );
};

export default AdminNavigation;