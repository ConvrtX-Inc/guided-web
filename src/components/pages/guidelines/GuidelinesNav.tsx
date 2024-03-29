import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";

const GuidelinesNav = () => {
  return (
    <Navbar className="guidelines-navbar">
      <Form className="container-fluid justify-content-start">
        <NavLink
          to="/guidelines/faq"
          className="btn btn-light btn-nav btn-faq me-2"
          //</Form>className={({ isActive }) =>
          //  (isActive ? "active" : "inactive") + " btn btn-light me-2"
          //}
        >
          FAQ
        </NavLink>
        <NavLink
          to="/guidelines/tncs"
          className="btn btn-light btn-nav btn-tncs"
          //</Form>className={({ isActive }) =>
          //  (isActive ? "active" : "inactive") + " btn btn-light me-2"
          //}
        >
          Terms & Conditions
        </NavLink>
        <NavLink
          to="/guidelines/waiver-form"
          className="btn btn-light btn-nav btn-waiver me-2"
          //</Form>className={({ isActive }) =>
          //  (isActive ? "active" : "inactive") + " btn btn-light me-2"
          //}
        >
          Traveler Release & Waiver Form
        </NavLink>
        <NavLink
          to="/guidelines/cancellation"
          className="btn btn-light btn-nav btn-cancellation me-2"
          //</Form>className={({ isActive }) =>
          //  (isActive ? "active" : "inactive") + " btn btn-light me-2"
          //}
        >
          Cancellation Policy
        </NavLink>
        <NavLink
          to="/guidelines/guided-payment"
          className="btn btn-light btn-nav btn-payment me-2"
          //</Form>className={({ isActive }) =>
          //  (isActive ? "active" : "inactive") + " btn btn-light me-2"
          //}
        >
          Guided Payment and Payout Terms
        </NavLink>
        <NavLink
          to="/guidelines/taxes"
          className="btn btn-light btn-nav btn-taxes"
          //</Form>className={({ isActive }) =>
          //  (isActive ? "active" : "inactive") + " btn btn-light me-2"
          //}
        >
          Local Laws & Taxes
        </NavLink>
      </Form>
    </Navbar>
  );
};
export default GuidelinesNav;
