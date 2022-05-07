import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import left from "../../../assets/admin/left.png";

import "./CreateBadge.scss";
import BadgeService from "../../../services/badge/Badge.Service";
import { v4 as uuidv4 } from "uuid";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../../firebase";
import { convertBase64 } from "../../../shared/helper/ConvertBase64";

const EditBadge = () => {
  const { id } = useParams();

  const location = useLocation();
  const { badge }: any = location.state;

  //const history = useNavigate();
  const [data, setData] = useState({
    id: "",
    badge_name: "",
    badge_description: "",
    imgBase64: "",
    img_icon: "",
    firebase_snapshot_img: "",
    filename: "",
  });

  //const [baseImage, setBaseImage] = useState("");
  const [isPending, setisPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadFile, setUploadFile] = useState([]);
  const [uploadFileName, setUploadFileName] = useState("");

  const { badge_name, badge_description, imgBase64, firebase_snapshot_img } =
    data;

  const onInputChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setisPending(true);
    setIsSuccess(false);
    setIsError(false);

    //data.img_icon = data.imgBase64.replace("data:image/png;base64,", "");
    try {
      if (data.imgBase64) {
        let file: any = uploadFile;

        if (data.filename) {
          const storage3 = getStorage();

          const desertRef = ref(storage3, data.filename);

          deleteObject(desertRef)
            .then(() => {
              console.log("File deleted successfully");
            })
            .catch((error) => {
              console.log("Unable to delete file: ", error);
            });
        }

        const imageRef = ref(storage, `web/${uploadFileName}`);
        await uploadBytes(imageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            data.firebase_snapshot_img = url;
            //console.log(url);
            data.filename = `web/${uploadFileName}`;
            BadgeService.patchData(id ?? "", data).then(
              (res) => {
                if (res.status === 200) {
                  setIsSuccess(true);
                  setSuccessMessage("The record was successfully saved.");
                }
                setisPending(false);
              },
              (err) => {
                if (err.response.status === 413) {
                  setIsError(true);
                  setErrorMessage(err.response.statusText);
                }
                setisPending(false);
              }
            );
          });
        });
      } else {
        await BadgeService.patchData(id ?? "", data).then(
          (res) => {
            if (res.status === 200) {
              setIsSuccess(true);
              setSuccessMessage("The record was successfully saved.");
            }
            setisPending(false);
          },
          (err) => {
            if (err.response.status === 413) {
              setIsError(true);
              setErrorMessage(err.response.statusText);
            }
            setisPending(false);
          }
        );
      }
    } catch (err) {
      console.log("Error on onSubmit: ", err);
      setisPending(false);
    }
  };

  useEffect(() => {
    setData(badge);
  }, [badge]);

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setData({ ...data, [e.target.name]: String(base64) });
    setUploadFile(file);
    setUploadFileName(uuidv4() + file.name);
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
                className="p-2"
                //src={imgBase64}
                src={imgBase64 || firebase_snapshot_img}
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
                {/*<Col className="col-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select Color</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  </Col>*/}
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
                  {!isPending && (
                    <Button type="submit" className="btn-create">
                      Update
                    </Button>
                  )}
                  {isPending && (
                    <Button className="btn-create" type="button" disabled>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Updating...
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

export default EditBadge;
