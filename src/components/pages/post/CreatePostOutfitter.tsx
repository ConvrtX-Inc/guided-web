import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import left from "../../../assets/admin/left.png";
import "./CreatePostActivityPackageEvent.scss";
import { useContext, useRef, useState } from "react";
import { CategoryState } from "../../../shared/interfaces/CategoryState.interface";
import SelectCategoryList from "./SelectCategoryList";
import AuthContext from "../../../context/AuthContext";
import { UserAccess } from "../../../shared/interfaces/UserAccess.interface";
import { PostImage } from "../../../shared/interfaces/PostImage.interface";
import { convertBase64 } from "../../../shared/helper/ConvertBase64";
import PostService from "../../../services/post/Post.Service";

const CreatePostOutfitter = () => {
  const authCtx = useContext(AuthContext);
  const userAccess: UserAccess = authCtx.userRole;
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CategoryState;
  const [isLoading, setIsLoading] = useState(false);
  const [postCategory, setPostCategory] = useState(
    state?.categoryName || "Outfitter"
  );
  const [submitData, setsubmitData] = useState({
    user_id: userAccess.user_id,
    title: "",
    premium_user: false,
    availability_date: "",
    description: "",
    price: 0,
    is_post: true,
    country: "PH",
    address: "Davao City",
    street: "103 Libra",
    city: "Davao",
    province: "Davao Del Sur",
    zip_code: 8000,
    product_link: "www.google.com"
  });
  const [postData, setPostData] = useState({
    premium_user: false,
    category_type: state?.category || 6, //Outfitter is default
    views: 0,
    snapshot_img: "",
    title: "",
    post_id: "",
    user_id: userAccess.user_id, //login user id
    contact_user_id: "",
    contact_person: "",
    contact_number: "",
    contact_email: "",
    contact_website: "",
  });

  const refFileInput = useRef<HTMLInputElement | null>(null);

  const [uploadFiles, setUploadFiles] = useState([] as PostImage[]);

  const handlePostInputChange = (event: any) => {
    setPostData({ ...postData, [event.target.name]: event.target.value });
  };

  const handleSelectFile = () => {
    refFileInput?.current?.click();
  };

  const handleUploadFiles = async (event: any) => {
    const fileObj = [];
    fileObj.push(event.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      const base64 = await convertBase64(fileObj[0][i]);
      setUploadFiles([
        ...uploadFiles,
        {
          temp_id: Math.random(),
          default_img: false,
          snapshot_img: String(base64),
        },
      ]);
    }
  };

  const handleInputChange = (event: any) => {
    if (event.target.name === "price") {
      setsubmitData({
        ...submitData,
        [event.target.name]: parseFloat(event.target.value),
      });
    } else {
      setsubmitData({ ...submitData, [event.target.name]: event.target.value });
    }

    setPostData({ ...postData, [event.target.name]: event.target.value });
  };

  const handleCategoryChange = (event: any) => {
    setPostCategory(event.target.options[event.target.selectedIndex].text);
    setPostData({ ...postData, category_type: parseInt(event.target.value) });
    const id = parseInt(event.target.value);
    const stateCategory = {
      category: parseInt(event.target.value),
      categoryName: event.target.options[event.target.selectedIndex].text,
    };
    if (id === 3) {
      navigate("/post/event", {
        state: stateCategory,
        replace: true,
      });
    } else if (id === 1) {
      navigate("/post/activity-package", {
        state: stateCategory,
        replace: true,
      });
    } else if (id === 2) {
      navigate("/post/newsfeed", {
        state: stateCategory,
        replace: true,
      });
    } else if (id === 4) {
      navigate("/post/article", {
        state: stateCategory,
        replace: true,
      });
    } else if (id === 5) {
      navigate("/post/advertistment", {
        state: stateCategory,
        replace: true,
      });
    } else if (id === 6) {
      navigate("/post/outfitter", {
        state: stateCategory,
        replace: true,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    let bulkUpload = {};
    try {
      await PostService.postOutfitterData(submitData).then(
        (res) => {
          if (res.status === 201) {
            console.log("postOutfitterData: ", res.data);
            postData.post_id = res.data.id;

            for (let i = 0; i < uploadFiles.length; i++) {
              uploadFiles[i].snapshot_img = uploadFiles[i].snapshot_img.replace(
                "data:image/png;base64,",
                ""
              );
              uploadFiles[i].activity_outfitter_id = res.data.id;
            }
            if (uploadFiles.length > 0) {
              uploadFiles[0].default_img = true;
              postData.snapshot_img = uploadFiles[0].snapshot_img; //add to activity-post table
            }
            bulkUpload = { bulk: uploadFiles };
          }
        },
        (err) => {
          console.log("Error postOutfitterData: ", err);
        }
      );

      await PostService.postOutfitterDataImage(bulkUpload).then(
        (res) => {
          console.log("postOutfitterDataImage: ", res.status);
        },
        (err) => {
          console.log("Error postOutfitterDataImage: ", err);
        }
      );

      await PostService.postToActivityPost(postData).then(
        (res) => {
          if (res.status === 201) {
            setIsLoading(false);
            navigate("/post", {
              state: {
                status: true,
                message: "Post successfully created.",
              },
              replace: true,
            });
          }
        },
        (err) => {
          console.log("Error postToActivityPost: ", err);
        }
      );
    } catch (error) {
      console.log("Error in handleSubmit:", error);
    }
  };

  const removeImage = (id: number) => {
    setUploadFiles((files) => files.filter((f) => f.temp_id !== id));
  };

  const handleSwitchChange = (event: any) => {
    let premium_user: boolean;
    if (event.target.checked) {
      premium_user = true;
    } else {
      premium_user = false;
    }
    setsubmitData({ ...submitData, premium_user: premium_user });
    setPostData({ ...postData, premium_user: premium_user });
  };
  return (
    <Container className="create-post-activitypackage-container">
      <Row className="mt-5">
        <Col className="col-6">
          <Row>
            <Col className="col-2">
              <Link to={`/post`} className="btn btn-bck">
                <Image className="" src={left} alt="" />
              </Link>
            </Col>
            <Col>
              <h2>Create {postCategory}</h2>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="ms-3 me-3 post-form">
          <Form className="m-5" onSubmit={(e) => handleSubmit(e)}>
            <Row>
              <Col className="col-4">
                <Form.Label>Category</Form.Label>
                <SelectCategoryList
                  userAccess={userAccess}
                  categoryType={postData.category_type}
                  setCategoryType={handleCategoryChange}
                />
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                <label htmlFor="site_state" className="form-check-label">
                  Premium User
                </label>
                <div className="form-switch form-check ms-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="site_state"
                    onChange={(e) => handleSwitchChange(e)}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="mt-2 col-10">
                <hr />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Form.Label>
                  Upload multiple images (Maximum 5 images)
                </Form.Label>
              </Col>
            </Row>
            <Row className="upload-img ps-2 pt-2">
              {uploadFiles.map((img: any) => (
                <Col
                  className="col-2 d-flex justify-content-center align-items-center me-1 p-0"
                  key={img.snapshot_img}
                >
                  <button
                    type="button"
                    className="btn-close btn-remove-img"
                    aria-label="Close"
                    onClick={() => {
                      removeImage(img.temp_id);
                    }}
                  ></button>
                  <img
                    className="w-100 prev-img img-fluid rounded mx-auto d-block"
                    src={img.snapshot_img}
                    alt="..."
                  />
                </Col>
              ))}
              {uploadFiles.length < 5 && (
                <Col className="col-2 me-2 d-flex justify-content-center align-items-center">
                  <input
                    accept="image/x-png,image/gif,image/jpeg"
                    type="file"
                    ref={refFileInput}
                    className="form-control d-none"
                    onChange={handleUploadFiles}
                  />
                  <button
                    onClick={handleSelectFile}
                    className="btn btn-file-upload"
                    type="button"
                  >
                    +
                  </button>
                </Col>
              )}
            </Row>
            <Row className="mt-4">
              <Col className="mt-3 col-8">
                <Form.Control
                  //required
                  autoComplete="off"
                  className="input-title"
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={submitData.title}
                  onChange={(e) => handleInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  className="input-date"
                  placeholder="Set Availability"
                  name="availability_date"
                  value={submitData.availability_date}
                  onChange={(e) => handleInputChange(e)}
                />
              </Col>
              <Col className="col-4">
                <Form.Label></Form.Label>
                <Form.Control
                  autoComplete="off"
                  className="mt-1 input-price"
                  type="text"
                  placeholder="Price"
                  name="price"
                  //value={submitData.price}
                  onChange={(e) => handleInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Control
                  as="textarea"
                  placeholder="Description"
                  rows={7}
                  maxLength={200}
                  className="input-description"
                  name="description"
                  value={submitData.description}
                  onChange={(e) => handleInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="input-person"
                  type="text"
                  placeholder="Contact Person"
                  name="contact_person"
                  onChange={(e) => handlePostInputChange(e)}
                />
              </Col>
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="input-email"
                  type="text"
                  placeholder="Email Address"
                  name="contact_email"
                  onChange={(e) => handlePostInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="input-contact-number"
                  type="text"
                  placeholder="Contact Number"
                  name="contact_number"
                  onChange={(e) => handlePostInputChange(e)}
                />
              </Col>
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="input-website"
                  type="text"
                  placeholder="Website"
                  name="contact_website"
                  onChange={(e) => handlePostInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mt-5">
                {!isLoading && (
                  <button type="submit" className="btn-submit">
                    Submit
                  </button>
                )}
                {isLoading && (
                  <button className="btn-submit" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default CreatePostOutfitter;
