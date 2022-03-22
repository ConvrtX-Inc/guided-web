import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import left from "../../../assets/admin/left.png";

import "./CreateBadge.scss";
import BadgeService from "../../../services/badge/Badge.Service";

const CreateBadge = () => {
  const history = useNavigate();
  const [data, setData] = useState({
    badge_name: "",
    badge_description: "",
    imgBase64: "",
    img_icon: "",
    is_main_activity: true,
    is_sub_activity: true,
  });

  const { badge_name, badge_description, imgBase64 } = data;
  const [isPending, setisPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onInputChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setisPending(true);
    data.img_icon = data.imgBase64.replace("data:image/png;base64,", "");
    try {
      await BadgeService.postData(data).then(
        (res) => {
          //console.log(res);
          if (res.status === 200) {
            //alert("The record was successfully saved.");
            setIsSuccess(true);
            setSuccessMessage("The record was successfully saved.");
          }
          setisPending(false);
          history("/badge");
        },
        (err) => {
          //console.log(err.response);
          if (err.response.status === 413) {
            setIsError(true);
            setErrorMessage(err.response.statusText);
          }
          setisPending(false);
        }
      );
    } catch (err) {
      console.log(err);
      setisPending(false);
    }
  };

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    //setBaseImage(String(base64));
    setData({ ...data, [e.target.name]: String(base64) });
  };

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <Container className="create-badge-container">
      <Navbar>
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <NavLink to="/badge" className="btn btn-light btn-bck me-3">
              <Image className="mb-2" src={left} alt="" />
            </NavLink>
            Create Badge
          </span>
        </div>
      </Navbar>
      <Container className="create-badge-content">
        {isSuccess && (
          <Row>
            <Col>
              <Alert
                className=""
                variant="success"
                onClose={() => setIsSuccess(false)}
                dismissible
              >
                <p>{successMessage}</p>
              </Alert>
            </Col>
          </Row>
        )}
        {isError && (
          <Row>
            <Col>
              <Alert
                className=""
                variant="danger"
                onClose={() => setIsError(false)}
                dismissible
              >
                <p>{errorMessage}</p>
              </Alert>
            </Col>
          </Row>
        )}
        <Row>
          <Col className="mt-5">
            <div className="title">
              <h3>Preview</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="img-container text-center">
              <Image
                className=""
                src={imgBase64}
                alt=""
                width={198}
                height={219}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form className="create-badge-form" onSubmit={(e) => onSubmit(e)}>
              <Row className="pt-4">
                <Col className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Badge Name"
                    aria-label="Badge Name"
                    name="badge_name"
                    required
                    value={badge_name}
                    onChange={(e) => onInputChange(e)}
                  />
                </Col>
                <Col className="col-4">
                  <input
                    className="form-control"
                    type="file"
                    id="file"
                    accept=".jpeg, .png, .jpg"
                    name="imgBase64"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                  />
                </Col>
              </Row>
              <Row className="pt-4">
                <Col className="col-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select Color</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </Col>
              </Row>
              <Row className="pt-4">
                <Col className="col-8">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="Description"
                    rows={3}
                    required
                    name="badge_description"
                    value={badge_description}
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                </Col>
              </Row>
              <Row className="pt-5">
                <Col className="col-4">
                  {!isPending && (
                    <Button type="submit" className="btn-create">
                      Create
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
    </Container>
  );
};

export default CreateBadge;
