import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

import left from "../../../assets/admin/left.png";
import "./CreateSubAdmin.scss";
import { useCallback, useEffect, useState } from "react";
import GuidesServices from "../../../services/guides/Guides.Service";
import { NotifyMessage } from "../../ui/NotifyMessage";
import { ToastContainer } from "react-toastify";

enum UserInput {
  is_subadmin_guide = "is_subadmin_guide",
  is_subadmin_nonprofit = "is_subadmin_nonprofit",
  is_subadmin_others = "is_subadmin_others",
  is_for_the_planet = "is_for_the_planet",
  full_name = "full_name",
  first_name = "first_name",
  last_name = "last_name",
  email = "email",
  password = "password",
  phone_no = "phone_no",
  organization_name = "organization_name",
  registration_number = "registration_number",
}

interface UserSubAdmin {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  password?: string;
  is_subadmin_guide?: boolean;
  is_subadmin_nonprofit?: boolean;
  is_subadmin_others?: boolean;
  is_for_the_planet?: boolean;
  user_type_id?: string;
  user_type?: string;
  organization_name?: string;
  phone_no?: string;
}

const CreateSubAdmin = () => {
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [organization, setOrganization] = useState("");
  const [isSubAdminGuide, setIsSubAdminGuide] = useState(false);
  const [isSubAdminProfit, setIsSubAdminProfit] = useState(false);
  const [isSubAdminOthers, setIsSubAdminOthers] = useState(false);
  const [isOnePercent, setIsOnePercent] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [userTypeID, setUserTypeID] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e: any, type: UserInput) => {
    switch (type) {
      case UserInput.is_subadmin_guide:
        setIsSubAdminGuide(() => e.target.checked);
        break;
      case UserInput.is_subadmin_nonprofit:
        setIsSubAdminProfit(() => e.target.checked);
        break;
      case UserInput.is_subadmin_others:
        setIsSubAdminOthers(() => e.target.checked);
        break;
      case UserInput.is_for_the_planet:
        setIsOnePercent(() => e.target.checked);
        break;
      case UserInput.full_name:
        setFullName(() => e.target.value);
        break;
      case UserInput.email:
        setEmail(() => e.target.value);
        break;
      case UserInput.phone_no:
        setContactNumber(() => e.target.value);
        break;
      case UserInput.organization_name:
        setOrganization(() => e.target.value);
        break;
      case UserInput.registration_number:
        setRegistrationNumber(() => e.target.value);
        break;
      case UserInput.password:
        setPassword(() => e.target.value);
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsPending(() => true);

    let userSubAdmin = {} as UserSubAdmin;
    let atleastOne: boolean = false;
    if (isSubAdminGuide) {
      atleastOne = true;
    }
    if (isSubAdminProfit) {
      atleastOne = true;
    }
    if (isSubAdminOthers) {
      atleastOne = true;
    }

    if (!atleastOne) {
      NotifyMessage("Please select atleast one sub-admin type");
      setIsPending(false);
      return;
    }

    userSubAdmin.email = email;
    userSubAdmin.full_name = fullName;
    userSubAdmin.phone_no = contactNumber;
    //userSubAdmin.first_name = fullName.split(",")[1].trim();
    //userSubAdmin.last_name = fullName.split(",")[0].trim();
    userSubAdmin.is_for_the_planet = isOnePercent;
    userSubAdmin.is_subadmin_guide = isSubAdminGuide;
    userSubAdmin.is_subadmin_nonprofit = isSubAdminProfit;
    userSubAdmin.is_subadmin_others = isSubAdminOthers;
    userSubAdmin.user_type_id = userTypeID;
    userSubAdmin.user_type = "SubAdmin";
    userSubAdmin.password = password;
    userSubAdmin.organization_name = organization;

    console.log(userSubAdmin);

    try {
      await GuidesServices.registerSubAdmin(userSubAdmin).then(
        (res) => {
          setIsPending(() => false);
          console.log(res);
          if (res.status === 201) {
            navigate(`/guides`, {
              replace: true,
            });
          }
        },
        (err) => {
          console.log("Error registerSubAdmin: ", err);
          if (err.response.status === 422) {
            NotifyMessage(err.response.data.errors.email);
          }
          setIsPending(() => false);
        }
      );
    } catch (err) {
      console.log("Error in handleSubmit:", err);
      setIsPending(() => false);
    }
  };

  const getUserType = useCallback(async (cancel?: boolean) => {
    try {
      await GuidesServices.getUserTypeID("SubAdmin").then(
        (res) => {
          setUserTypeID(() => res.data[0].id);
          if (cancel) return;
        },
        (err) => {
          console.log("getUserTypeID: ", err);
          if (cancel) return;
        }
      );
    } catch (err) {
      console.log("Error getUserType:", err);
      if (cancel) return;
    }
  }, []);

  useEffect(() => {
    let cancel = false;
    getUserType(cancel);
    return () => {
      cancel = true;
    };
  }, [getUserType]);

  return (
    <Container className="create-subadmin-container mb-5">
      <ToastContainer />
      <Row className="mt-5">
        <Col>
          <Row>
            <Col className="col-1">
              <Link to={`/guides`} className="btn btn-bck">
                <Image className="" src={left} alt="" />
              </Link>
            </Col>
            <Col className="d-flex justify-content-start">
              <h2>Create Sub-Admin (Guides & Partners)</h2>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="ms-3 me-3 create-form">
          <Form className="m-5" onSubmit={(e) => handleSubmit(e)}>
            <Row className="mt-4">
              <Col className="col-4">
                <Form.Control
                  required={true}
                  autoComplete="off"
                  className="input-name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={fullName}
                  onChange={(e) => {
                    handleInputChange(e, UserInput.full_name);
                  }}
                />
              </Col>
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="input-email"
                  type="text"
                  placeholder="Email address"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    handleInputChange(e, UserInput.email);
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="input-contact"
                  type="text"
                  placeholder="Contact Number"
                  name="contactnumber"
                  value={contactNumber}
                  onChange={(e) => {
                    handleInputChange(e, UserInput.phone_no);
                  }}
                />
              </Col>
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="input-orgname"
                  type="text"
                  placeholder="Organization Name"
                  name="orgname"
                  value={organization}
                  onChange={(e) => {
                    handleInputChange(e, UserInput.organization_name);
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-4 pt-2">
              <Col className="mt-3 col-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="is_subadmin_guide"
                    value={String(isSubAdminGuide)}
                    onChange={(checked) => {
                      handleInputChange(checked, UserInput.is_subadmin_guide);
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Guide / Influencers
                  </label>
                </div>
              </Col>
              <Col className="mt-3 col-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="is_subadmin_nonprofit"
                    value={String(isSubAdminProfit)}
                    onChange={(checked) => {
                      handleInputChange(
                        checked,
                        UserInput.is_subadmin_nonprofit
                      );
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Non-Profit / Conservation
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="is_subadmin_others"
                    value={String(isSubAdminOthers)}
                    onChange={(checked) => {
                      handleInputChange(checked, UserInput.is_subadmin_others);
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Others
                  </label>
                </div>
              </Col>
              <Col className="col-4">
                {isSubAdminProfit && (
                  <Form.Control
                    autoComplete="off"
                    className="input-regnumber"
                    type="text"
                    placeholder="Registration Number"
                    value={registrationNumber}
                    onChange={(e) => {
                      handleInputChange(e, UserInput.registration_number);
                    }}
                  />
                )}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="mt-2 col-10">
                <hr />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="col-4">
                <Form.Control
                  required={true}
                  autoComplete="off"
                  className="input-temppassword"
                  type="text"
                  placeholder="Temporary Password"
                  name="temppassword"
                  value={password}
                  onChange={(e) => {
                    handleInputChange(e, UserInput.password);
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="mt-3 col-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="is_for_the_planet"
                    value={String(isOnePercent)}
                    onChange={(checked) => {
                      handleInputChange(checked, UserInput.is_for_the_planet);
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    1% Of the Planet
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="pt-5">
              <Col className="col-4">
                {!isPending && (
                  <Button type="submit" className="btn-create">
                    Create Account
                  </Button>
                )}
                {isPending && (
                  <Button className="btn-create" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Creating...
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default CreateSubAdmin;
