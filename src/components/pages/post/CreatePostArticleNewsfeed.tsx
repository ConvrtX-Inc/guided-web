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
import { PostFormsNavigate } from "./PostFormsNavigate";

import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import ArticleService from "../../../services/post/Article.Service";
import NewsfeedService from "../../../services/post/Newsfeed.Service";

const CreatePostArticleNewsfeed = () => {
  const location = useLocation();
  const state = location.state as CategoryState;

  const navigate = useNavigate();

  const firstRender = useRef(true); //check page if first render/load
  const refFileInput = useRef<HTMLInputElement | null>(null);

  const authCtx = useContext(AuthContext);
  const userAccess: UserAccess = authCtx.userRole;

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

  //data for activity-article-image or activity-newsfeed-image
  const [uploadFiles, setUploadFiles] = useState([] as PostImage[]);
  const [isLoading, setIsLoading] = useState(false);

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
    snapshot_img: "",
    //snapshot_img_url: "",
    firebase_snapshot_img: "",
    main_badge_id: "",
    activityBadgeId: "",
    premium_user: false,
  });

  //Update title,description,date
  const handleInputChange = (event: any) => {
    setsubmitData({ ...submitData, [event.target.name]: event.target.value });

    setPostData({ ...postData, [event.target.name]: event.target.value });
  };

  //Update selected main badge
  const handleBadgeChange = (obj: any) => {
    setMainBadge(obj);
    setsubmitData({ ...submitData, main_badge_id: obj.id });
    setPostData({
      ...postData,
      main_badge_id: obj.id,
      activityBadgeId: obj.id,
    });
  };

  //Update switch, is premium user true/false
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

  //Update selected category type
  const handleCategoryChange = (event: any) => {
    setPostCategory(event.target.options[event.target.selectedIndex].text);
    setPostData({ ...postData, category_type: parseInt(event.target.value) });

    const navigateTo = PostFormsNavigate(
      parseInt(event.target.value),
      event.target.options[event.target.selectedIndex].text
    );
    navigate(navigateTo.path, {
      state: navigateTo.stateCategory,
      replace: true,
    });
  };

  //Update selected sub-badges
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

  const removeImage = (id: number) => {
    setUploadFiles((files) => files.filter((f) => f.temp_id !== id));
  };

  //handle upload multiple files
  //console.log(uploadFiles);
  const handleUploadFiles = async (event: any) => {
    const fileObj = [];
    //const fileArray = [] as any[];
    fileObj.push(event.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      //console.log(fileObj[0][i]);
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

  const handleSelectFile = () => {
    refFileInput?.current?.click();
  };

  //post data source
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

  const postOneImageTo = (category: number, data: any) => {
    if (category === 4) {
      return ArticleService.postOneArticleImage(data);
    } else if (category === 2) {
      return NewsfeedService.postOneNewsfeedImage(data);
    } else {
      //default destination
      return ArticleService.postOneArticleImage(data);
    }
  };

  //submit form, submit post article/newsfeed
  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        submitData.sub_badge_ids = subBadges.toString();
        await postDataTo(postData.category_type, submitData).then(
          (res) => {
            if (res.status === 201) {
              postData.post_id = res.data.id;
              //set id for image upload
              for (let i = 0; i < uploadFiles.length; i++) {
                //remove snapshot_img
                uploadFiles[i].snapshot_img = "";

                if (postData.category_type === 4) {
                  //activity article
                  uploadFiles[i].activity_article_id = res.data.id;
                } else if (postData.category_type === 2) {
                  //activity newsfeed
                  uploadFiles[i].activity_newsfeed_id = res.data.id;
                }
              }
            }
          },
          (err) => {
            console.log("Error in postDataTo: ", err);
            setIsLoading(false);
          }
        );

        //firebase upload
        try {
          for (let i = 0; i < uploadFiles.length; i++) {
            const imageRef = ref(storage, `web/${uploadFiles[i].filename}`);
            await uploadBytes(imageRef, uploadFiles[i].file).then(
              (snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                  postOneImageTo(postData.category_type, {
                    activity_article_id: uploadFiles[i].activity_article_id,
                    activity_newsfeed_id: uploadFiles[i].activity_newsfeed_id,
                    firebase_snapshot_img: url,
                    filename: `web/${uploadFiles[i].filename}`, //save filename
                  }).then(
                    (res) => {
                      console.log("postOneImageTo: ", res);
                    },
                    (err) => {
                      console.log("Error in postOneImageTo: ", err);
                    }
                  );

                  if (i === uploadFiles.length - 1) {
                    postData.firebase_snapshot_img = url;
                    PostService.postToActivityPost(postData).then(
                      (res) => {
                        console.log("postToActivityPost: ", res);
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
                        console.log("Error in postToActivityPost: ", err);
                        setIsLoading(false);
                      }
                    );
                  }
                });
              }
            );
          }
        } catch (err) {
          console.log("Error in firebase upload: ", err);
          setIsLoading(false);
        }
      } catch (err) {
        console.log("Error in handleSubmit: ", err);
        setIsLoading(false);
      }
    },
    [navigate, postData, submitData, subBadges, uploadFiles]
  );

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

    //initial value for main badge react-select
    setMainBadge(badgeWithImg[0]);

    //initial value for main badge react-select
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
    if (firstRender.current) {
      firstRender.current = false;
    } else {
    }
    loadBadgeData();
  }, [loadBadgeData]);

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
                  key={img.temp_id}
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
              <Col>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  className="input-date"
                  placeholder="Set Availability"
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
                  maxLength={200}
                  className="input-description"
                  name="description"
                  value={submitData.description}
                  onChange={(e) => handleInputChange(e)}
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
export default CreatePostArticleNewsfeed;
