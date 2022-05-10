import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import left from "../../../assets/admin/left.png";
import "./CreatePostActivityPackageEvent.scss";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { CategoryState } from "../../../shared/interfaces/CategoryState.interface";
import SelectCategoryList from "./SelectCategoryList";
import AuthContext from "../../../context/AuthContext";
import { UserAccess } from "../../../shared/interfaces/UserAccess.interface";
import { PostImage } from "../../../shared/interfaces/PostImage.interface";
import { convertBase64 } from "../../../shared/helper/ConvertBase64";
import PostService from "../../../services/post/Post.Service";
import { PostFormsNavigate } from "./PostFormsNavigate";
import { GetCategoryName } from "./GetCategoryName";
import OutfitterService from "../../../services/post/Outfitter.Service";
import SelectContactPerson from "./SelectContactPerson";
import UserService from "../../../services/users/User.Service";
import moment from "moment";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import AdsService from "../../../services/post/Ads.Service";
import { NotifyMessage } from "../../ui/NotifyMessage";
import { storage } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";

const EditPostAdsOutfitter = () => {
  const authCtx = useContext(AuthContext);
  const userAccess: UserAccess = authCtx.userRole;
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CategoryState;
  const [isLoading, setIsLoading] = useState(false);
  const [firebaseFiles, setFirebaseFiles] = useState([] as any[]);
  const [postCategory, setPostCategory] = useState(
    state?.categoryName || GetCategoryName(state?.category || 0)
  );
  const [contactPersons, setContactPersons] = useState([] as any[]);
  const [mainContactPerson, setMainContactPerson] = useState({});
  const [submitData, setsubmitData] = useState({
    id: "",
    user_id: userAccess.user_id,
    title: "",
    premium_user: false,
    availability_date: "",
    ad_date: "", //for ads
    activities: "", //for ads
    description: "",
    price: 0,
    is_post: true,
    country: "PH",
    address: "Davao City",
    street: "103 Libra",
    city: "Davao",
    province: "Davao Del Sur",
    zip_code: 8000,
    product_link: "www.google.com",
    is_published: true,
  });
  const [postData, setPostData] = useState({
    id: "",
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
    firebase_snapshot_img: "",
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
          file: fileObj[0][i],
          filename: uuidv4() + fileObj[0][i].name,
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

    //navigate to forms by category type id
    const navigateTo = PostFormsNavigate(
      parseInt(event.target.value),
      event.target.options[event.target.selectedIndex].text
    );
    navigate(navigateTo.path, {
      state: navigateTo.stateCategory,
      replace: true,
    });
  };

  const patchDataTo = (category: number, id: string, data: any) => {
    if (category === 5) {
      return AdsService.patchAdsData(id, data);
    } else if (category === 6) {
      return OutfitterService.patchOutfitterData(id, data);
    } else {
      return AdsService.patchAdsData(id, data);
    }
  };

  const postImageTo = (category: number, data: any) => {
    if (category === 5) {
      return AdsService.postOneAdsImage(data);
    } else if (category === 6) {
      return OutfitterService.postOneOutfitterImage(data);
    } else {
      return AdsService.postOneAdsImage(data);
    }
  };

  const handleContactPerson = (obj: any) => {
    setMainContactPerson(obj);
    setPostData({ ...postData, contact_user_id: obj.id });
  };

  //console.log("uploadFiles: ", uploadFiles);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    let isSuccess: boolean | false = false;

    //ads is ad_date and outfitter is availability date
    submitData.ad_date = submitData.availability_date;

    try {
      //hard code for category type
      if (postData.category_type === 5) {
        //ads
        submitData.ad_date = submitData.availability_date;
      } else if (postData.category_type === 5) {
        //outfitter
        //nothing else
      }

      submitData.price = Number(submitData.price);
      await patchDataTo(postData.category_type, submitData.id, submitData).then(
        (res) => {
          if (res.status === 200) {
            isSuccess = true;
            console.log("postDataTo: ", res.data);
            postData.post_id = res.data.id;

            for (let i = 0; i < uploadFiles.length; i++) {
              uploadFiles[i].snapshot_img = "";
              uploadFiles[i].activity_outfitter_id = res.data.id;
              uploadFiles[i].activity_advertisement_id = res.data.id;
            }
          }
        },
        (err) => {
          console.log("Error postDataTo: ", err);
        }
      );

      if (isSuccess) {
        if (uploadFiles.length > 0) {
          //firebase upload
          try {
            for (let i = 0; i < uploadFiles.length; i++) {
              const imageRef = ref(storage, `web/${uploadFiles[i].filename}`);
              await uploadBytes(imageRef, uploadFiles[i].file).then(
                (snapshot) => {
                  getDownloadURL(snapshot.ref).then((url) => {
                    postImageTo(postData.category_type, {
                      activity_outfitter_id:
                        uploadFiles[i].activity_outfitter_id,
                      activity_advertisement_id:
                        uploadFiles[i].activity_advertisement_id,
                      firebase_snapshot_img: url,
                      filename: `web/${uploadFiles[i].filename}`, //save filename
                    }).then(
                      (res) => {
                        console.log("postImageTo: ", res);
                      },
                      (err) => {
                        NotifyMessage(`Error in postImageTo: ${err}`);
                      }
                    );

                    if (i === uploadFiles.length - 1) {
                      postData.firebase_snapshot_img = url;
                      PostService.patchActivityPost(postData.id, postData).then(
                        (res) => {
                          console.log("postToActivityPost: ", res);
                          if (res.status === 200) {
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
                          NotifyMessage(`Error in postToActivityPost: ${err}`);
                          setIsLoading(false);
                        }
                      );
                    }
                  });
                }
              );
            }
          } catch (err) {
            NotifyMessage(`Error in firebase upload: ${err}`);
            setIsLoading(false);
          }
        } else {
          if (firebaseFiles.length > 0) {
            postData.firebase_snapshot_img = firebaseFiles[0].firebase_snapshot_img;
          }
          await PostService.patchActivityPost(postData.id, postData).then(
            (res) => {
              if (res.status === 200) {
                setIsLoading(false);
                navigate("/post", {
                  state: {
                    status: true,
                    message: "Post successfully updated.",
                  },
                  replace: true,
                });
              }
            },
            (err) => {
              console.log("Error patchActivityPost: ", err);
            }
          );
        }
      }
    } catch (error) {
      console.log("Error in handleSubmit:", error);
    }
  };

  const removeImage = (id: number) => {
    setUploadFiles((files) => files.filter((f) => f.temp_id !== id));
  };

  const removeImageFromFirebase = (id: number) => {
    const removedImage = firebaseFiles.filter((f) => f.id === id);
    console.log(removedImage);
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, removedImage[0].filename);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log("Unable to delete file: ", error);
      });
    deleteImageFrom(postData.category_type, removedImage[0].id).then(
      (res) => {
        console.log("deleteImageFrom: ", res.status);
      },
      (err) => {
        console.log("Error in deleteImageFrom: ", err);
      }
    );
    setFirebaseFiles((files) => files.filter((f) => f.id !== id));
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

  const getImageFrom = (category: number, post_id: string) => {
    if (category === 6) {
      return OutfitterService.getOutfitterImages(post_id);
    } else if (category === 5) {
      return AdsService.getAdsImages(post_id);
    }
    return OutfitterService.getOutfitterImages(post_id);
  };

  const deleteImageFrom = (category: number, id: string) => {
    if (category === 6) {
      return OutfitterService.deleteOutfitterImage(id);
    } else if (category === 5) {
      return AdsService.deleteAdsImage(id);
    } else {
      //default destination
      return OutfitterService.deleteOutfitterImage(id);
    }
  };

  const getDataFrom = (category: number, post_id: string) => {
    if (category === 6) {
      return OutfitterService.getOutfitterData(post_id);
    } else if (category === 5) {
      return AdsService.getAdsData(post_id);
    }
    return OutfitterService.getOutfitterData(post_id);
  };

  const getData = useCallback(async () => {
    let postId: string | "" = "";
    let data: any | {} = {};
    let postServiceData: any | {} = {};
    try {
      await getDataFrom(state.category, state?.post_id || "").then(
        (res) => {
          //console.log(res.data);
          data = res.data;
          postId = data.id;
          setsubmitData((submit) => ({
            ...submit,
            id: data.id,
            title: data.title,
            price: data.price,
            premium_user: data.premium_user,
            description: data.description,
            availability_date: moment(data.ad_date).format("yyyy-MM-DD"),
            ad_date: moment(data.ad_date).format("yyyy-MM-DD"),
          }));
        },
        (err) => {
          console.log("Error getOutfitterData: ", err);
        }
      );

      await PostService.getActivityPostByPostId(postId).then(
        (res) => {
          postServiceData = res.data;
          setPostData((postData) => ({
            ...postData,
            id: postServiceData.id,
            title: postServiceData.title,
            description: postServiceData.description,
            premium_user: data.premium_user,
            main_badge_id: data.main_badge_id,
            activityBadgeId: data.main_badge_id,
            post_id: postServiceData.post_id,
            contact_email: postServiceData.contact_email,
            contact_number: postServiceData.contact_number,
            contact_website: postServiceData.contact_website,
          }));
        },
        (err) => {
          console.log("Error in getActivityPostByPostId:", err);
        }
      );

      await UserService.getUsers().then(
        (res) => {
          const contacts = res.data;
          const currentContact = contacts.filter(
            (contact: any) => contact.id === postServiceData.contact_user_id
          );
          setContactPersons(contacts);
          if (currentContact.length > 0) {
            setMainContactPerson(currentContact[0]); //set current contact user
            setPostData((post) => ({
              ...post,
              contact_user_id: currentContact[0].id,
            }));
          }
        },
        (error) => {
          console.log("Error in getUsers:", error);
        }
      );

      await getImageFrom(state.category, state?.post_id || "").then(
        (res) => {
          if (res.status === 200) {
            setFirebaseFiles(res.data);
          }
        },
        (err) => {
          console.log("Error in getImageFrom: ", err);
        }
      );
    } catch (error) {
      console.log("Error in getData:", error);
    }
  }, [state.post_id, state.category]);

  useEffect(() => {
    getData();
  }, [getData]);

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
              <h2>Edit {postCategory}</h2>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="ms-3 me-3 post-form post-form-outfitter">
          <Form className="m-5" onSubmit={(e) => handleSubmit(e)}>
            <Row>
              <Col className="col-4">
                <Form.Label>Category</Form.Label>
                <SelectCategoryList
                  userAccess={userAccess}
                  categoryType={postData.category_type}
                  setCategoryType={handleCategoryChange}
                  disabled={true}
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
                    checked={submitData.premium_user}
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
              {firebaseFiles.map((img: any) => (
                <Col
                  className="col-2 d-flex justify-content-center align-items-center me-1 p-0"
                  key={img.id}
                >
                  <button
                    type="button"
                    className="btn-close btn-remove-img"
                    aria-label="Close"
                    onClick={() => {
                      removeImageFromFirebase(img.id);
                    }}
                  ></button>
                  <img
                    className="w-100 prev-img img-fluid rounded mx-auto d-block"
                    src={img.firebase_snapshot_img}
                    alt="..."
                  />
                </Col>
              ))}

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
              {uploadFiles.length + firebaseFiles.length < 5 && (
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
                  required
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
                  required
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
                  required
                  autoComplete="off"
                  className="mt-1 input-price"
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={submitData.price}
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
                {/*<Form.Control
                  autoComplete="off"
                  className="input-person"
                  type="text"
                  placeholder="Contact Person"
                  name="contact_person"
                  onChange={(e) => handlePostInputChange(e)}
              />*/}
                <SelectContactPerson
                  mainContact={mainContactPerson}
                  contactPersons={contactPersons}
                  handleContactPerson={handleContactPerson}
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
                  value={postData.contact_email}
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
                  value={postData.contact_number}
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
                  value={postData.contact_website}
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
export default EditPostAdsOutfitter;
