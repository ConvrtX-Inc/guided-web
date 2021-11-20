import check from "../../../assets/admin/check.png";
import right from "../../../assets/admin/right.png";
import left from "../../../assets/admin/left2.png";

import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import { Route, Switch } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import GuideContainer from "./GuideContainer";
import ViewApplication from "./ViewApplication";

const GuideSeeAll = () => {
  return (
    <Col>
      <Table borderless className="mt-4">
        <thead>
          <tr>
            <th>Application Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Application</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark Chen</td>
            <td>mark@gmail.com</td>
            <td> +1 467 474 9303</td>
            <td>
              <Button className="btn-view-application">View Application</Button>
            </td>
            <td>
              <Button className="btn-approve">
                <Image src={check} alt="" /> Approve
              </Button>
              <Button className="m-1 btn-reject">Reject</Button>
            </td>
          </tr>
          <tr>
            <td>Mark Chen</td>
            <td>mark@gmail.com</td>
            <td> +1 467 474 9303</td>
            <td>
              <Button className="btn-view-application">View Application</Button>
            </td>
            <td>
              <Button className="btn-approve">
                <Image src={check} alt="" /> Approve
              </Button>
              <Button className="m-1 btn-reject">Reject</Button>
            </td>
          </tr>
          <tr>
            <td>Mark Chen</td>
            <td>mark@gmail.com</td>
            <td> +1 467 474 9303</td>
            <td>
              <Button className="btn-view-application">View Application</Button>
            </td>
            <td>
              <Button className="btn-approve">
                <Image src={check} alt="" /> Approve
              </Button>
              <Button className="m-1 btn-reject">Reject</Button>
            </td>
          </tr>
          <tr>
            <td>Mark Chen</td>
            <td>mark@gmail.com</td>
            <td> +1 467 474 9303</td>
            <td>
              <Button className="btn-view-application">View Application</Button>
            </td>
            <td>
              <Button className="btn-approve">
                <Image src={check} alt="" /> Approve
              </Button>
              <Button className="m-1 btn-reject">Reject</Button>
            </td>
          </tr>
          <tr>
            <td>Mark Chen</td>
            <td>mark@gmail.com</td>
            <td> +1 467 474 9303</td>
            <td>
              <Button className="btn-view-application">View Application</Button>
            </td>
            <td>
              <Button className="btn-approve">
                <Image src={check} alt="" /> Approve
              </Button>
              <Button className="m-1 btn-reject">Reject</Button>
            </td>
          </tr>
          <tr>
            <td>Mark Chen</td>
            <td>mark@gmail.com</td>
            <td> +1 467 474 9303</td>
            <td>
              <Button className="btn-view-application">View Application</Button>
            </td>
            <td>
              <Button className="btn-approve">
                <Image src={check} alt="" /> Approve
              </Button>
              <Button className="m-1 btn-reject">Reject</Button>
            </td>
          </tr>
          <tr>
            <td>Mark Chen</td>
            <td>mark@gmail.com</td>
            <td> +1 467 474 9303</td>
            <td>
              <Button className="btn-view-application">View Application</Button>
            </td>
            <td>
              <Button className="btn-approve">
                <Image src={check} alt="" /> Approve
              </Button>
              <Button className="m-1 btn-reject">Reject</Button>
            </td>
          </tr>
          <tr>
            <td>Mark Chen</td>
            <td>mark@gmail.com</td>
            <td> +1 467 474 9303</td>
            <td>
              <Button className="btn-view-application">View Application</Button>
            </td>
            <td>
              <Button className="btn-approve">
                <Image src={check} alt="" /> Approve
              </Button>
              <Button className="m-1 btn-reject">Reject</Button>
            </td>
          </tr>
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
      <Route path="/become-guide/all">
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
    </Switch>
  );
};

export default BecomeGuide;
