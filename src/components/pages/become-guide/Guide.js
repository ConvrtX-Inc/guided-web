import right from "../../../assets/admin/right.png";
import left from "../../../assets/admin/left2.png";
import user2 from "../../../assets/admin/user30.png";

import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import { Route, Switch } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import GuideContainer from "./GuideContainer";
import ViewApplication from "./ViewApplication";
import ApplicationItem from "./ApplicationItem";
import PageNotFound from "../PageNotFound";

const DUMMY_DATA = [
  {
    id: 1,
    name: "Mark Chen",
    email: "mark@gmail.com",
    contactnumber: " +1 467 474 9303",
    img: user2,
  },
  {
    id: 2,
    name: "John Kristen",
    email: "johngmail.com",
    contactnumber: "+1 267 474 9323",
    img: user2,
  },
  {
    id: 3,
    name: "Rayan Artecona",
    email: "rayangmail.com",
    contactnumber: "+1 437 474 9222",
    img: user2,
  },
  {
    id: 4,
    name: "Mark Chen",
    email: "mark@gmail.com",
    contactnumber: "+1 698 474 9100",
    img: user2,
  },
  {
    id: 5,
    name: "Mark Chen",
    email: "mark@gmail.com",
    contactnumber: "+1 698 474 9100",
    img: user2,
  },
  {
    id: 6,
    name: "Mark Chen",
    email: "mark@gmail.com",
    contactnumber: "+1 698 474 9100",
    img: user2,
  },
  {
    id: 7,
    name: "Mark Chen",
    email: "mark@gmail.com",
    contactnumber: "+1 698 474 9100",
    img: user2,
  },
  {
    id: 8,
    name: "Mark Chen",
    email: "mark@gmail.com",
    contactnumber: "+1 698 474 9100",
    img: user2,
  },
];

const GuideSeeAll = () => {
  return (
    <Col>
      <Table responsive borderless className="mt-4">
        <thead>
          <tr>
            <th className="ps-4">Application Name</th>
            <th className="ps-4">Email</th>
            <th className="ps-4">Contact Number</th>
            <th className="ps-4">Application</th>
            <th className="ps-4">Action</th>
          </tr>
        </thead>
        <tbody>
          <ApplicationItem application={DUMMY_DATA} />
        </tbody>
      </Table>
      <Navbar className="navigation justify-content-end">
        <Form.Label className="me-2 mt-2">Rows per page:</Form.Label>
        <Form.Select className="me-5">
          <option>8</option>
        </Form.Select>
        <Form.Label className="ms-5 mt-2 me-2">1-8 of 150:</Form.Label>
        <Button className="btn btn-light me-1">
          <Image src={left} alt="" />
        </Button>
        <Button className="btn btn-light me-4">
          <Image src={right} alt="" />
        </Button>
      </Navbar>
    </Col>
  );
};

const GuideApproved = () => {
  return <div>Hello Approved</div>;
};

const GuidePending = () => {
  return <div>Hello Pending</div>;
};

const GuideRejected = () => {
  return <div>Hello Rejected</div>;
};

const BecomeGuide = () => {
  return (
    <Switch>
      <Route exact path="/become-guide/all">
        <GuideContainer>
          <GuideSeeAll />
        </GuideContainer>
      </Route>
      <Route path="/become-guide/approved">
        <GuideContainer>
          <GuideApproved />
        </GuideContainer>
      </Route>
      <Route path="/become-guide/pending">
        <GuideContainer>
          <GuidePending />
        </GuideContainer>
      </Route>
      <Route path="/become-guide/rejected">
        <GuideContainer>
          <GuideRejected />
        </GuideContainer>
      </Route>
      <Route path="/become-guide/viewapplication">
        <ViewApplication />
      </Route>

      <Route component={PageNotFound} />
    </Switch>
  );
};

export default BecomeGuide;
