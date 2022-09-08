import "./ViewApplication.scss";

import line from "../../../assets/admin/line.png";
import left from "../../../assets/admin/left.png";
import check from "../../../assets/admin/check.png";
import camp from "../../../assets/admin/camp.png";
import hiking from "../../../assets/admin/hiking.png";
import active from "../../../assets/admin/active.png";
import cert1 from "../../../assets/admin/cert1.png";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import UserGuideRequestService from "../../../services/user-guide-request/UserGuideRequest.Service";

const ViewApplication = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { app: guideApplication }: any = location.state;

  const approveApplication = () => {
    const postData = {
      is_approved: true
    }
    UserGuideRequestService.patchData(guideApplication.id, postData).then(
        (res) => {
          if (res.status === 200) {
            navigate("/become-guide/approved", {
              state: {
                status: true,
                message: "Become A Guide successfully Approved.",
              },
              replace: true,
            });
          }
        }
    );
  }

  const rejectApplication = () => {
    const postData = {
      is_approved: false
    }
    UserGuideRequestService.patchData(guideApplication.id, postData).then(
        (res) => {
          if (res.status === 200) {
            navigate("/become-guide/rejected", {
              state: {
                status: true,
                message: "Become A Guide successfully rejected.",
              },
              replace: true,
            });
          }
        }
    );
  }

  return (
    <Container className="viewapp-container">
      <Navbar>
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <NavLink
              to="/become-guide/all"
              className="btn btn-light btn-bck me-3"
            >
              <Image className="mb-2" src={left} alt="" />
            </NavLink>
            {guideApplication.name}
          </span>
          <Form className="d-flex">
            <Button className="btn-approve me-2" onClick={approveApplication}>
              <Image className="me-3" src={check} alt="" />
              Approve
            </Button>
            <Button className="btn-reject" onClick={rejectApplication}>
              Reject
            </Button>
          </Form>
        </div>
      </Navbar>
      <Container className="mt-2 basic-info">
        <Row className="ms-2">
          <Col className="mt-5">
            Basic Information <Image src={line} alt="" />
          </Col>
        </Row>
        <Row className="ms-2 mt-4">
          <Col>
            <Image className="basic-img" src={guideApplication.image_firebase_url} alt="" />
          </Col>
        </Row>
        <Row className="ms-2">
          <Form>
            <Row className="mt-4">
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control defaultValue={guideApplication.first_name} type="text"></Form.Control>
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control defaultValue={guideApplication.last_name} type="text"></Form.Control>
              </Col>
              <Col></Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  defaultValue={guideApplication.phone_no}
                  type="text"
                ></Form.Control>
              </Col>
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  defaultValue={guideApplication.email}
                  type="text"
                ></Form.Control>
              </Col>
              <Col></Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Form.Label>Province</Form.Label>
                <Form.Control defaultValue={guideApplication.province} type="text"></Form.Control>
              </Col>
              <Col>
                <Form.Label>City</Form.Label>
                <Form.Control defaultValue={guideApplication.city} type="text"></Form.Control>
              </Col>
              <Col></Col>
            </Row>
          </Form>
        </Row>
        <Row className="ms-2 mt-4">
          <Col>
            <Form>
              <Form.Label>Activities</Form.Label>
              <br />
              <Button className="btn-activity me-3">
                <Image src={hiking} alt="" className="float-start" />
                <Form.Label className="mt-3">Hiking</Form.Label>
                <Image src={active} alt="" className="float-end" />
              </Button>
              <Button className="btn-activity">
                <Image src={camp} alt="" className="float-start" />
                <Form.Label className="mt-3">Camping</Form.Label>
                <Image src={active} alt="" className="float-end" />
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="ms-2">
          <Row className="mt-5">
            <Col>
              <Form.Label>
                Why do you think you will be a good Guide ?
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={guideApplication.good_guide_reason}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label>
                Briefly describe the Adventures you want to host.
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={guideApplication.adventures_to_host}
              ></Form.Control>
            </Col>
            <Col></Col>
          </Row>
        </Row>
        <Row className="ms-2">
          <Row className="mt-4">
            <Col>
              <Form.Label>
                What locations will you be running your Adventures?
              </Form.Label>
              <Form.Control
                className="input-gray"
                type="text"
                defaultValue={guideApplication.adventure_location}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label>What will make your Adventures stand-out?</Form.Label>
              <Form.Control
                className="input-gray"
                type="text"
                defaultValue={guideApplication.standout_reason}
              ></Form.Control>
            </Col>
            <Col></Col>
          </Row>
        </Row>
        <Row className="ms-2">
          <Row className="mt-4">
            <Col>
              <Form.Label>Why do you want to work with Guided?</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={guideApplication.guided_reason}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label>How did you hear about us?</Form.Label>
              <Form.Control
                className="input-gray"
                type="text"
                defaultValue={guideApplication.where_did_you_hear_us}
              ></Form.Control>
            </Col>
            <Col></Col>
          </Row>
        </Row>
        <Row className="ms-2">
          <Col className="mt-5">
            Certificates <Image src={line} alt="" />
          </Col>
        </Row>

        <Row className="ms-2">
          <Col className="mt-4">
            <div className="form-check form-switch">
              <input
                className="form-check-input me-2"
                type="checkbox"
                defaultChecked={guideApplication.is_first_aid}
                id="flexSwitchCheckDefault"
              />
              <label className="form-check-label m-1">first aid</label>
            </div>
          </Col>
        </Row>
        <Row className="ms-2">
          <Col className="mt-4">
            <Image src={cert1} alt="" />
          </Col>
          <Col className="col-certs mt-4">
            <h4>Certificate name</h4>
            <p>
              {guideApplication.certificate_name}
            </p>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ViewApplication;
