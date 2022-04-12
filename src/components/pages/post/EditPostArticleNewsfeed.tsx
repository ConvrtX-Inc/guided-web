import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import "./CreatePostArticleNewsfeed.scss";
import left from "../../../assets/admin/left.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import BadgeService from "../../../services/badge/Badge.Service";
import { Badge } from "../../../shared/interfaces/Badge.interface";
import PostService from "../../../services/post/Post.Service";
import { convertBase64 } from "../../../shared/helper/ConvertBase64";
import AuthContext from "../../../context/AuthContext";
import { CategoryState } from "../../../shared/interfaces/CategoryState.interface";
import { PostImage } from "../../../shared/interfaces/PostImage.interface";
import Select from "react-select";

const EditPostArticleNewsfeed = () => {
  const location = useLocation();
  const state = location.state as CategoryState;
  const navigate = useNavigate();
  const firstRender = useRef(true); //check page if first render/load
  const refFileInput = useRef<HTMLInputElement | null>(null);
  const authCtx = useContext(AuthContext);
  const user = JSON.parse(authCtx.user).user; //get current logged in user details
  const category = [
    { id: 1, text: "Activity/Package" },
    { id: 3, text: "Event" },
    { id: 4, text: "Article" },
    { id: 2, text: "News Feed" },
  ];
  const [postCategory, setPostCategory] = useState(
    state?.categoryName || "Article"
  );
  const [mainBadge, setMainBadge] = useState({});
  const [badgeData, setBadgeData] = useState([] as any[]);
  const [subBadges, setSubBadges] = useState([] as any[]);
  const [uploadFiles, setUploadFiles] = useState([] as PostImage[]);
  const [submitData, setsubmitData] = useState({
    user_id: user.id, //login user id
    //post_category_id: "",
    title: "",
    description: "",
    news_date: "",
    main_badge_id: "",
    sub_badge_ids: {},
    premium_user: false,
    is_post: true,
  });
  const [postData, setPostData] = useState({
    post_id: "",
    user_id: user.id, //login user id
    category_type: state?.category || 4, //Article is default
    title: "",
    views: 0,
  });
  const { title, description, news_date } = submitData;

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

  //Update selected category type
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
    }
  };

  //Update selected sub-badges
  const handleSubBadgesChange = (event: any) => {
    if (event.target.checked) {
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

  //handle upload multiple files
  const handleUploadFiles = async (event: any) => {
    const fileObj = [];
    fileObj.push(event.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      const base64 = await convertBase64(fileObj[0][i]);
      setUploadFiles([
        ...uploadFiles,
        {
          snapshot_img: String(base64),
        },
      ]);
    }
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
    let bulkUpload = {};
    try {
      await postDataTo(postData.category_type, submitData).then(
        (res) => {
          //console.log(res);
          if (res.status === 201) {
            console.log(res.data);
            postData.post_id = res.data.id;

            //set id for image upload
            for (let i = 0; i < uploadFiles.length; i++) {
              if (postData.category_type === 4) {
                uploadFiles[i].activity_article_id = res.data.id;
              } else if (postData.category_type === 2) {
                uploadFiles[i].activity_newsfeed_id = res.data.id;
              }
            }
            bulkUpload = { bulk: uploadFiles };
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

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      //saveToPostActivity();
    }
    loadBadgeData();
  }, [loadBadgeData]);

  //React-Select styles
  const controlStyles = {
    control: (styles: any) => ({
      ...styles,
      fontFamily: `Gilroy`,
      fontStyle: `normal`,
      fontWeight: `400`,
      fontSize: `16px`,
      lineHeight: `19px`,
      color: `#181B1B`,
      width: `364px`,
      height: `66px`,
      border: `1px solid #C4C4C4`,
      borderRadius: `18px`,
      ":hover": {
        border: `1px solid #C4C4C4`,
      },
    }),
  };
  return (
    <Container className="create-post-container">
      <Row className="mt-5">
        <Col className="col-6">
          <Row>
            <Col className="col-2">
              <Link to={`/sub-admin/post`} className="btn btn-bck">
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
        <Col className="ms-3 me-3 post-form">
          <Form className="m-5" onSubmit={(e) => handleSubmit(e)}>
            <Row>
              <Col className="col-4">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  className="select-category"
                  aria-label="Default select example"
                  name="post_category_id"
                  value={postData.category_type}
                  onChange={handleCategoryChange}
                  disabled
                >
                  {category.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.text}
                    </option>
                  ))}
                </Form.Select>
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
                <Select
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
                  value={title}
                  onChange={(e) => handleInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  className="input-date"
                  placeholder="Set Availability"
                  name="news_date"
                  value={news_date}
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
                  value={description}
                  onChange={(e) => handleInputChange(e)}
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mt-5">
                <button type="submit" className="btn-submit">
                  Confirm
                </button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default EditPostArticleNewsfeed;
