import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import left from "../../../assets/admin/left.png";

import "./CreateBadge.scss";

import api from "./api/Badge";

const EditBadge = () => {
  const { id } = useParams();

  const location = useLocation();
  const { badge }: any = location.state;

  const history = useNavigate();
  const [data, setData] = useState({
    id: "",
    badge_name: "",
    badge_description: "",
    imgBase64: "",
    img_icon: "",
  });

  //const [baseImage, setBaseImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { badge_name, badge_description, imgBase64 } = data;

  const onInputChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    data.img_icon = data.imgBase64.replace("data:image/png;base64,", "");

    //console.log(data);

    await api.patch(`badges/${id}`, data);
    history("/badge");
  };

  useEffect(() => {
    setData(badge);
    setIsLoading(false);
  }, [badge]);

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
            Edit Badge
          </span>
        </div>
      </Navbar>
      <Container className="create-badge-content">
        <Row>
          {!isLoading && (
            <Col className="mt-5">
              <div className="title">
                <h3>Preview</h3>
              </div>
            </Col>
          )}
        </Row>
        <Row>
          {!isLoading && (
            <Col>
              <div className="img-container text-center">
                <Image
                  className="p-2"
                  src={imgBase64}
                  alt=""
                  width={198}
                  height={219}
                />
              </div>
            </Col>
          )}
        </Row>
        <Row>
          <Col>
            {!isLoading && (
              <Form className="create-badge-form" onSubmit={(e) => onSubmit(e)}>
                <Row className="pt-4">
                  <Col className="col-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Badge Name"
                      aria-label="Badge Name"
                      name="badge_name"
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
                      name="badge_description"
                      value={badge_description}
                      onChange={(e) => onInputChange(e)}
                    ></textarea>
                  </Col>
                </Row>
                <Row className="pt-5">
                  <Col className="col-4">
                    <Button type="submit" className="btn-create">
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
            {isLoading && <p>Loading data..</p>}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default EditBadge;
