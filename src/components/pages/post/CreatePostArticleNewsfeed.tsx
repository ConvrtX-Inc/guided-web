import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import "./CreatePostArticleNewsfeed.scss";
import left from "../../../assets/admin/left.png";
import PostService from "../../../services/post/Post.Service";
import BadgeService from "../../../services/badge/Badge.Service";
import AuthContext from "../../../context/AuthContext";
import { Badge } from "../../../shared/interfaces/Badge.interface";
import { convertBase64 } from "../../../shared/helper/ConvertBase64";
import { PostImage } from "../../../shared/interfaces/PostImage.interface";
import { CategoryState } from "../../../shared/interfaces/CategoryState.interface";
import { UserAccess } from "../../../shared/interfaces/UserAccess.interface";
import SelectCategoryList from "./SelectCategoryList";
import SelectBadge from "./SelectBadge";
//import DatePicker from "react-datepicker";

const CreatePostArticleNewsfeed = () => {
  const location = useLocation();
  const state = location.state as CategoryState;

  const navigate = useNavigate();

  const firstRender = useRef(true); //check page if first render/load
  const refFileInput = useRef<HTMLInputElement | null>(null);

  const authCtx = useContext(AuthContext);
  const userAccess: UserAccess = authCtx.userRole;

  //const [dateAvailability, setDateAvailability] = useState("");
  //const [postCategory, setPostCategory] = useState("");

  //get selected category
  const [postCategory, setPostCategory] = useState(
    state?.categoryName || "Article"
  );
  //const [categoryData, setCategoryData] = useState([]);

  //get main badge data
  const [mainBadge, setMainBadge] = useState({});

  //data for badge list
  const [badgeData, setBadgeData] = useState([] as any[]);

  //get sub badges
  const [subBadges, setSubBadges] = useState([] as any[]);
  //const [uploadFiles, setUploadFiles] = useState([] as any[]);
  //const [uploadFiles, setUploadFiles] = useState([] as ArticleImage[]);

  //data for activity-article-image or activity-newsfeed-image
  const [uploadFiles, setUploadFiles] = useState([] as PostImage[]);

  //data for activity-article or activity-newsfeed
  const [submitData, setsubmitData] = useState({
    user_id: userAccess.user_id, //login user id
    //post_category_id: "",
    title: "",
    description: "",
    news_date: "",
    main_badge_id: "",
    sub_badge_ids: {},
    premium_user: false,
    is_post: true,
  });

  //data for activity-post
  const [postData, setPostData] = useState({
    post_id: "",
    user_id: userAccess.user_id, //login user id
    category_type: state?.category || 4, //Article is default
    title: "",
    views: 0,
  });

  //console.log(postData);
  //Update title,description,date
  const handleInputChange = (event: any) => {
    setsubmitData({ ...submitData, [event.target.name]: event.target.value });

    setPostData({ ...postData, [event.target.name]: event.target.value });
  };

  //Update selected main badge
  const handleBadgeChange = (obj: any) => {
    setMainBadge(obj);
    setsubmitData({ ...submitData, main_badge_id: obj.id });
  };

  //Update switch, is premium user true/false
  const handleSwitchChange = (event: any) => {
    //console.log(event.target.checked);
    if (event.target.checked) {
      setsubmitData({ ...submitData, premium_user: true });
    } else {
      setsubmitData({ ...submitData, premium_user: false });
    }
  };

  /*const handleDateChange = (event: any) => {
    setDateAvailability(event.target.value);
  };*/

  //console.log(postData);
  //Update selected category type
  const handleCategoryChange = (event: any) => {
    //console.log(event.target.options[event.target.selectedIndex].text);
    //setPostCategory(event.target.value);
    //console.log(event.target.options[event.target.selectedIndex].text);
    setPostCategory(event.target.options[event.target.selectedIndex].text);

    setPostData({ ...postData, category_type: parseInt(event.target.value) });
    //comment category id, do not include in submit
    //setPostData({ ...postData, [event.target.name]: event.target.value });
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
    }
  };

  //console.log(subBadges);
  //Update selected sub-badges
  const handleSubBadgesChange = (event: any) => {
    if (event.target.checked) {
      //console.log(event.target.value);
      /*setSubBadges([
        ...subBadges,
        {
          sub_badge_id: event.target.value,
        },
      ]);*/
      setSubBadges(() => [...subBadges, event.target.value]);

      setsubmitData({
        ...submitData,
        sub_badge_ids: [...subBadges, event.target.value],
      });
    } else {
      setSubBadges(
        //subBadges.filter((badge) => badge.sub_badge_id !== event.target.value)
        subBadges.filter((badge) => badge !== event.target.value)
      );

      setsubmitData({
        ...submitData,
        sub_badge_ids: subBadges.filter(
          (badge) => badge !== event.target.value
        ),
      });
    }

    //setPostData({ ...postData, post_sub_b,dges: subBadges });
  };

  //handle upload multiple files
  //console.log(uploadFiles);
  //console.log(uploadFiles.length);
  const handleUploadFiles = async (event: any) => {
    const fileObj = [];
    //const fileArray = [] as any[];
    //console.log(event.target.files);
    fileObj.push(event.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      //console.log(fileObj[0][i]);
      const base64 = await convertBase64(fileObj[0][i]);
      //setUploadFiles(() => [...uploadFiles, String(base64)]);
      setUploadFiles([
        ...uploadFiles,
        {
          //activity_article_id: "",
          snapshot_img: String(base64),
        },
      ]);
      //fileArray.push(String(base64));
    }
    //setUploadFiles((files) => [...uploadFiles, event.target.files]);
    //console.log(fileArray);
    //setUploadFiles((files) => [...uploadFiles, fileArray]);
    //setUploadFiles(fileArray);
  };

  const handleSelectFile = () => {
    refFileInput?.current?.click();
  };

  const postDataTo = (category: number, data: any) => {
    if (category === 4) {
      return PostService.postArticleData(data);
    } else if (category === 2) {
      return PostService.postNewsFeedData(data);
    } else {
      //default destination
      return PostService.postArticleData(data);
    }
  };
  const postImageTo = (category: number, data: any) => {
    if (category === 4) {
      return PostService.postArticleImage(data);
    } else if (category === 2) {
      return PostService.postNewsFeedImage(data);
    } else {
      //default destination
      return PostService.postArticleImage(data);
    }
  };

  //submit form, submit post article/newsfeed
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //console.log(submitData);
    let bulkUpload = {};
    try {
      //await PostService.postArticleData(submitData).then(
      await postDataTo(postData.category_type, submitData).then(
        (res) => {
          //console.log(res);
          if (res.status === 201) {
            console.log(res.data);
            //setPostData({ ...postData, post_id: res.data.id }); //this data will be submitted to post-activity
            postData.post_id = res.data.id;

            //set id for image upload
            for (let i = 0; i < uploadFiles.length; i++) {
              if (postData.category_type === 4) {
                uploadFiles[i].activity_article_id = res.data.id;
              } else if (postData.category_type === 2) {
                uploadFiles[i].activity_newsfeed_id = res.data.id;
              }
            }
            //console.log(uploadFiles);
            //set a default_img
            if (uploadFiles.length > 0) {
              uploadFiles[0].default_img = true;
            }
            bulkUpload = { bulk: uploadFiles };
            //console.log(bulkUpload);
          }
        },
        (err) => {
          console.log(err);
        }
      );

      //await PostService.postArticleImage(bulkUpload).then(
      await postImageTo(postData.category_type, bulkUpload).then(
        (res) => {
          console.log(res.status);
        },
        (err) => {
          console.log(err);
        }
      );

      await PostService.postToActivityPost(postData).then(
        (res) => {
          //console.log(res);
          if (res.status === 201) {
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
          console.log(err);
        }
      );

      //await PostService.postArticleData(submitData).then(
      //  (res) => {},
      //  (err) => {}
      //);
    } catch (err) {
      console.log(err);
    }
  };

  //Save to Post-Activity after success submit
  /*const saveToPostActivity = useCallback(async () => {
    if (postData.post_id) {
      try {
        await PostService.postToActivityPost(postData).then(
          (res) => {
            //console.log(res);
            if (res.status === 201) {
              navigate("/sub-admin/post", {
                state: {
                  status: true,
                  message: "Post successfully created.",
                },
                replace: true,
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }, [postData, navigate]);*/

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
    //setPostData({ ...postData, post_main_badge: badgeWithImg[0].id });
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
          //console.log(res.data);
          setBadgeWithImg(res.data);
          //setBadgeData(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }, [setBadgeWithImg]);

  //console.log(postCat);
  //Load category data
  /*const loadCategoryData = useCallback(async () => {
    try {
      await PostService.loadPostCategory().then(
        (res) => {
          //console.log(res.data);
          setCategoryData(res.data);

          //intial value for category
          //comment category id, do not include in submit
          //setPostData((postData) => ({
          //  ...postData,
          //  post_category_id: res.data[0].id,
          //}));

          //initial value for category
          setPostCategory(res.data[0].name);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }, []);*/

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      //saveToPostActivity();
    }
    //loadCategoryData();
    loadBadgeData();
    //}, [loadBadgeData, loadCategoryData]);
    //}, [loadBadgeData, saveToPostActivity]);
  }, [loadBadgeData]);

  /*const filterOption = (option: any, inputValue: any) => {
    console.log(option);
    const { label, value } = option;
    return value;
  };*/

  return (
    <Container className="create-post-container">
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
                  className="col-2 d-flex justify-content-center align-items-center me-1 p-0"
                  key={img.snapshot_img}
                >
                  <img
                    className="prev-img img-fluid rounded mx-auto d-block"
                    src={img.snapshot_img}
                    alt="..."
                  />
                </Col>
              ))}
              {/*<Col className="col-2 me-2 d-flex justify-content-center align-items-center">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleUploadFiles}
                  multiple
                />
              </Col>*/}
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
                    className="btn"
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
              <Col>
                <Form.Label>Date</Form.Label>
                {/*<DatePicker
                  className="input-date"
                  selected={dateAvailability}
                  onChange={(date: Date) => setDateAvailability(date)}
                  />*/}
                <Form.Control
                  type="date"
                  className="input-date"
                  placeholder="Set Availability"
                  //value={dateAvailability}
                  //onChange={handleDateChange}
                  name="news_date"
                  value={submitData.news_date}
                  onChange={(e) => handleInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Control
                  as="textarea"
                  placeholder="Description of event"
                  rows={7}
                  className="input-description"
                  name="description"
                  value={submitData.description}
                  onChange={(e) => handleInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mt-5">
                <button type="submit" className="btn-submit">
                  Submit
                </button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default CreatePostArticleNewsfeed;
