import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import left from "../../../assets/admin/left.png";

import "./CreatePostActivityPackageEvent.scss";
import BadgeService from "../../../services/badge/Badge.Service";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { Badge } from "../../../shared/interfaces/Badge.interface";
import { convertBase64 } from "../../../shared/helper/ConvertBase64";
import { PostImage } from "../../../shared/interfaces/PostImage.interface";
import { CategoryState } from "../../../shared/interfaces/CategoryState.interface";
import { UserAccess } from "../../../shared/interfaces/UserAccess.interface";
import SelectCategoryList from "./SelectCategoryList";
import SelectBadge from "./SelectBadge";
import SelectServices from "./SelectServices";
import PostService from "../../../services/post/Post.Service";
import { ActivityDestination } from "../../../shared/interfaces/ActivityDestination.interface";
import { PostFormsNavigate } from "./PostFormsNavigate";

const CreatePostActivityPackage = () => {
  const location = useLocation();
  const state = location.state as CategoryState;

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const userAccess: UserAccess = authCtx.userRole;
  const services = [
    { id: 1, text: "Foods" },
    { id: 2, text: "Wifi" },
    { id: 3, text: "Transport" },
    { id: 4, text: "Snacks" },
    { id: 5, text: "Electricity" },
  ];
  const refFileInput = useRef<HTMLInputElement | null>(null);

  const [postCategory, setPostCategory] = useState(
    state?.categoryName || "Activity/Package"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [mainBadge, setMainBadge] = useState({});
  const [badgeData, setBadgeData] = useState([] as any[]);
  const [subBadges, setSubBadges] = useState([] as any[]);
  const [uploadFiles, setUploadFiles] = useState([] as PostImage[]);
  const [submitData, setsubmitData] = useState({
    user_id: userAccess.user_id, //login user id,
    name: "",
    title: "", //for event source, same as name
    description: "",
    date: "", //default current date, post date = post_date of activity_post
    main_badge_id: "",
    badge_id: "", //for event source, same as main_badge_id
    sub_badge_ids: {},
    sub_activities: {}, //for event source same as sub_badge_ids
    premium_user: false,
    is_post: true,
    package_note: "",
    extra_cost_per_person: "",
    base_price: "",
    max_price: "",
    min_traveller: 0,
    max_traveller: "",
    package_total_cost: "",
    activity_date: "",
    event_date: "", //for event source, same as activity_date
    address: "1600 Amphitheatre Pkwy,  Mountain View,  California,  94043",
    max_extra_person: 100,
    currency_id: "200339a3-5870-462d-9eb8-4b6cfc788886",
    services: "",
  });
  const [postData, setPostData] = useState({
    post_id: "",
    user_id: userAccess.user_id, //login user id
    category_type: state?.category || 1,
    title: "",
    description: "",
    post_date: "",
    main_badge_id: "",
    contact_user_id: "",
    contact_person: "",
    contact_number: "",
    contact_email: "",
    contact_website: "",
    views: 0,
    snapshot_img: "",
    activityBadgeId: "",
    premium_user: false,
  });
  const [packageForms, setPackageForms] = useState({
    activity_package_id: "",
    activity_event_id: "", //for event source, same as activity_package_id
    guide_rules: "",
    local_law_taxes: "",
    release_waiver: "",
  });
  const [activityDestination, setActivityDestination] = useState(
    {} as ActivityDestination
  );

  const handleInputChange = (event: any) => {
    setsubmitData({ ...submitData, [event.target.name]: event.target.value });
  };

  const handlePostInputChange = (event: any) => {
    setPostData({ ...postData, [event.target.name]: event.target.value });
  };

  const handlePackageInputChange = (event: any) => {
    setPackageForms({
      ...packageForms,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectFile = () => {
    refFileInput?.current?.click();
  };

  const removeImage = (id: number) => {
    setUploadFiles((files) => files.filter((f) => f.temp_id !== id));
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

  const handleBadgeChange = (obj: any) => {
    setMainBadge(obj);
    setPostData({ ...postData, main_badge_id: obj.id });
    setsubmitData({ ...submitData, main_badge_id: obj.id });
  };

  const handleSubBadgesChange = (event: any) => {
    if (event.target.checked) {
      if (subBadges.length > 4) {
        event.target.checked = false;
        return;
      }
      setSubBadges(() => [...subBadges, event.target.value]);

      setsubmitData({
        ...submitData,
        sub_badge_ids: [...subBadges, event.target.value],
      });
    } else {
      setSubBadges(subBadges.filter((badge) => badge !== event.target.value));

      setsubmitData({
        ...submitData,
        sub_badge_ids: subBadges.filter(
          (badge) => badge !== event.target.value
        ),
      });
    }
  };
  const handleServicesChange = (obj: any) => {
    //console.log(obj);
    //console.log(Object.values(obj));
    //setsubmitData({ ...submitData, services: obj.toString() });
  };

  const postDataTo = (category: number, data: any) => {
    if (category === 1) {
      return PostService.postActivityPackageData(data);
    } else if (category === 3) {
      return PostService.postEventData(data);
    } else {
      //default destination
      return PostService.postActivityPackageData(data);
    }
  };

  const postDestinationTo = (category: number, data: any) => {
    if (category === 1) {
      return PostService.postActivityPackageDataDestination(data);
    } else if (category === 3) {
      return PostService.postEventDataDestination(data);
    } else {
      //default destination
      return PostService.postActivityPackageDataDestination(data);
    }
  };

  const postImageTo = (category: number, data: any) => {
    if (category === 1) {
      return PostService.postActivityPackageImage(data);
    } else if (category === 3) {
      return PostService.postEventDataImage(data);
    } else {
      //default destination
      return PostService.postActivityPackageImage(data);
    }
  };

  const postActivityFormsTo = (category: number, data: any) => {
    if (category === 1) {
      return PostService.postActivityPackageFormsData(data);
    } else if (category === 3) {
      return PostService.postEventFormsData(data);
    } else {
      //default destination
      return PostService.postActivityPackageFormsData(data);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    let bulkUpload = {};
    try {
      submitData.sub_badge_ids = subBadges.toString();
      submitData.date = postData.post_date;

      //event different field names
      submitData.title = submitData.name;
      submitData.sub_activities = submitData.sub_badge_ids;
      submitData.badge_id = submitData.main_badge_id;
      submitData.event_date = submitData.activity_date; //set event_date data for event category

      await postDataTo(postData.category_type, submitData).then(
        (res) => {
          console.log("postDataTo: ", submitData);
          if (res.status === 201) {
            postData.post_id = res.data.id;
            postData.main_badge_id = submitData.main_badge_id;
            postData.activityBadgeId = submitData.main_badge_id;

            //activity post
            postData.title = submitData.name;
            postData.description = submitData.description;

            //activity package destination
            activityDestination.latitude = 0;
            activityDestination.longitude = 0;
            activityDestination.place_description = "Place description";
            activityDestination.place_name = "Place name";

            activityDestination.activity_package_id = res.data.id; //for activity-package source
            activityDestination.activity_event_id = res.data.id; //for event source

            //activity package forms
            packageForms.activity_package_id = res.data.id; //for activity-package source
            packageForms.activity_event_id = res.data.id; //for event source
          }
        },
        (err) => {
          console.log("Error postDataTo: ", err);
        }
      );

      await postDestinationTo(postData.category_type, activityDestination).then(
        (res1) => {
          console.log("postDestinationTo: ", res1);
          if (res1.status === 201) {
            //set id for image upload
            for (let i = 0; i < uploadFiles.length; i++) {
              uploadFiles[i].snapshot_img = uploadFiles[i].snapshot_img.replace(
                "data:image/png;base64,",
                ""
              );
              if (postData.category_type === 1) {
                //activity-package source
                uploadFiles[i].activity_package_destination_id = res1.data.id;
              } else if (postData.category_type === 3) {
                //event source
                uploadFiles[i].activity_event_destination_id = res1.data.id;
              }
            }

            //set a default_img
            console.log(uploadFiles);
            if (uploadFiles.length > 0) {
              uploadFiles[0].default_img = true;
              postData.snapshot_img = uploadFiles[0].snapshot_img; //add to activity-post table
            }
            bulkUpload = { bulk: uploadFiles };
          }
        },
        (err1) => {
          console.log("Error postDestinationTo: ", err1);
        }
      );

      await postImageTo(postData.category_type, bulkUpload).then(
        (res2) => {
          console.log("postImageTo: ", res2);
        },
        (err2) => {
          console.log("Error postImageTo: ", err2);
        }
      );

      await postActivityFormsTo(postData.category_type, packageForms).then(
        (res4) => {
          console.log("postActivityPackageFormsData: ", res4);
        },
        (err4) => {
          console.log("Error postActivityPackageFormsData: ", err4);
        }
      );

      await PostService.postToActivityPost(postData).then(
        (res3) => {
          console.log("postToActivityPost: ", res3);
          if (res3.status === 201) {
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
        (err3) => {
          console.log("Error postToActivityPost: ", err3);
        }
      );
    } catch (error) {
      console.log("Error handleSubmit: ", error);
    }
  };

  //Update badge data with image
  const setBadgeWithImg = useCallback(async (badges: Badge[]) => {
    let badgeWithImg: Badge[] = [];

    const base64Flag = "data:image/png;base64,";
    await Promise.all(
      badges.map(async (badge: any) => {
        badge.imgBase64 = `${base64Flag}${badge.img_icon}`;
        badgeWithImg.push(badge);
      })
    );
    setBadgeData(badgeWithImg);

    //initial value for react-select
    setMainBadge(badgeWithImg[0]);

    //initial value for react-select
    setPostData((postData) => ({
      ...postData,
      main_badge_id: badgeWithImg[0].id,
    }));
    setsubmitData((submitData) => ({
      ...submitData,
      main_badge_id: badgeWithImg[0].id,
    }));
  }, []);

  //Load badge data
  const loadBadgeData = useCallback(async () => {
    try {
      await BadgeService.loadData().then(
        (res) => {
          setBadgeWithImg(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }, [setBadgeWithImg]);

  useEffect(() => {
    loadBadgeData();
  }, [loadBadgeData]);

  return (
    <Container className="create-post-activitypackage-container mb-5">
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
            <Row className="mt-3">
              <Col className="col-4">
                <Form.Label>Select Main Badge</Form.Label>
                {/*<Select
                  styles={controlStyles}
                  defaultValue={badgeData[0]}
                  getOptionLabel={(e) => e.badge_name}
                  getOptionValue={(e) => e.id}
                  options={badgeData}
                  formatOptionLabel={(badgeData) => (
                    <div className="badge-option">
                      <img
                        src={badgeData.imgBase64}
                        alt={badgeData.badge_name}
                        className="me-4"
                      />
                      <span>{badgeData.badge_name}</span>
                    </div>
                  )}
                  value={mainBadge}
                  onChange={(option) => handleBadgeChange(option)}
                  />*/}
                <SelectBadge
                  mainBadge={mainBadge}
                  badgeData={badgeData}
                  handleBadgeChange={(option: any) => handleBadgeChange(option)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Form.Label>Select Sub badge (Maximum 5 badges)</Form.Label>
              </Col>
            </Row>
            <Row className=" pt-2">
              <Col>
                {badgeData.map((item: any) => (
                  <div
                    key={item.id}
                    className="chk-multiple-badge form-check form-check-inline"
                  >
                    <input
                      className="chkbox-badge form-check-input"
                      type="checkbox"
                      id={item.id}
                      value={item.id}
                      onChange={(checked) => {
                        handleSubBadgesChange(checked);
                      }}
                    />
                    <label
                      htmlFor={item.id}
                      className="form-check-label form-check-label-badge"
                    >
                      <img
                        className="chk-badge-img"
                        src={item.imgBase64}
                        alt={item.badge_name}
                      />
                    </label>
                    <Row>
                      <Col>{item.badge_name}</Col>
                    </Row>
                  </div>
                ))}
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
                  key={img.snapshot_img}
                  className="col-2 d-flex justify-content-center align-items-center me-1 p-0"
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
                  autoComplete="off"
                  className="input-title"
                  type="text"
                  placeholder="Title"
                  name="name"
                  value={submitData.name}
                  onChange={(e) => handleInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  className="input-date"
                  placeholder="Set Availability"
                  name="post_date"
                  onChange={(e) => handlePostInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Control
                  as="textarea"
                  placeholder="Description of event"
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
              <Col className="mt-4">
                <h4>Location</h4>
              </Col>
            </Row>
            <Row>
              <Col className="col-10">
                <hr />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-loc input-location"
                  type="text"
                  placeholder="Location"
                />
                <div className="ms-4 form-text label-pin-loc">
                  Pin location location
                </div>
              </Col>
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-loc input-street"
                  type="text"
                  placeholder="Street"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-loc input-city"
                  type="text"
                  placeholder="City"
                />
              </Col>
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-loc input-province"
                  type="text"
                  placeholder="Province/Territory"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-loc input-postal-code"
                  type="text"
                  placeholder="Postal Code"
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mt-4">
                <h4>Activity Package</h4>
              </Col>
            </Row>
            <Row>
              <Col className="col-10">
                <hr />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="col-4">
                <Form.Label></Form.Label>
                <Form.Control
                  autoComplete="off"
                  className="mt-1 form-pack input-traveler-limit"
                  type="text"
                  placeholder="Traveler Limit"
                  name="max_traveller"
                  value={submitData.max_traveller}
                  onChange={handleInputChange}
                />
              </Col>
              <Col className="col-4">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  className="form-pack input-pack-date"
                  placeholder="Set Availability"
                  name="activity_date"
                  value={submitData.activity_date}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-pack input-base-price"
                  type="text"
                  name="base_price"
                  placeholder="Base price"
                  value={submitData.base_price}
                  onChange={handleInputChange}
                />
              </Col>
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-pack input-package-total-cost"
                  type="text"
                  placeholder="Package total cost"
                  name="package_total_cost"
                  value={submitData.package_total_cost}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-pack input-extra-cost-per-person"
                  type="text"
                  name="extra_cost_per_person"
                  placeholder="Extra cost per person"
                  onChange={handleInputChange}
                />
              </Col>
              <Col className="col-4">
                <Form.Control
                  autoComplete="off"
                  className="form-pack input-max-price"
                  type="text"
                  placeholder="Max price"
                  name="max_price"
                  value={submitData.max_price}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Control
                  as="textarea"
                  placeholder="Additional notes"
                  rows={7}
                  maxLength={200}
                  className="input-additional-notes"
                  name="package_note"
                  value={submitData.package_note}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Form.Label>Free services (Maximum 5)</Form.Label>
              <Col className="col-4">
                {/*<Select
                  placeholder="Search free services"
                  isMulti
                  styles={controlStyles}
                  options={services}
                  getOptionLabel={(e) => e.text}
                  getOptionValue={(e) => String(e.id)}
                  onChange={handleServicesChange}
              />*/}
                <SelectServices
                  services={services}
                  handleServicesChange={handleServicesChange}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Control
                  as="textarea"
                  placeholder="Guide Rules & What to Bring"
                  rows={5}
                  maxLength={200}
                  className="input-guide-rules"
                  name="guide_rules"
                  onChange={(e) => handlePackageInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Control
                  as="textarea"
                  placeholder="Local Laws & Taxes"
                  rows={5}
                  maxLength={200}
                  className="input-locallaws"
                  name="local_law_taxes"
                  onChange={(e) => handlePackageInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Control
                  as="textarea"
                  placeholder="Waiver Screen"
                  rows={5}
                  maxLength={200}
                  className="input-waiver"
                  name="release_waiver"
                  onChange={(e) => handlePackageInputChange(e)}
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
export default CreatePostActivityPackage;
