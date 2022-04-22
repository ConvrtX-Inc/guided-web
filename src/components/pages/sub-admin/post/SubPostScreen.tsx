import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
//import { NavLink } from "react-router-dom";

import search from "../../../../assets/admin/search.png";
//import down from "../../../../assets/admin/down.png";
import filter from "../../../../assets/admin/filter.png";
import create_badge from "../../../../assets/admin/create-badge.png";

import "./SubPostScreen.scss";
import PostItems from "./PostItems";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import BadgeService from "../../../../services/badge/Badge.Service";
import Select from "react-select";
import { Link, useLocation } from "react-router-dom";
import ToastNotificationBasic from "../../../ui/ToastNotificationBasic";
import { Badge } from "../../../../shared/interfaces/Badge.interface";
import AuthContext from "../../../../context/AuthContext";
import { UserAccess } from "../../../../shared/interfaces/UserAccess.interface";
import PostService from "../../../../services/post/Post.Service";
interface LocationState {
  status: boolean;
  message: string;
}

const SubPostScreen = (props: any) => {
  const isMounted = useRef(true);
  const location = useLocation();

  const authCtx = useContext(AuthContext);
  const userAccess: UserAccess = authCtx.userRole;

  const state = location.state as LocationState;
  const [access, setAccess] = useState({
    default_path: "",
  });
  const [postData, setPostData] = useState([] as any[]);
  const [badgeData, setBadgeData] = useState([] as any[]);
  const [selCategory, setSelCategory] = useState({});

  const HandleCategoryChange = (obj: any) => {
    setSelCategory(obj);
  };
  //console.log(selCategory);

  const getUserAccess = useCallback(async () => {
    //console.log(userAccess);
    const user = userAccess;
    if (user.user_type_name === "SubAdmin") {
      if (user.is_subadmin_guide) {
        setAccess({
          default_path: `/post/article`,
        });
      } else {
        setAccess({
          default_path: `/post/activity-package`,
        });
      }
    }
  }, [userAccess]);

  const loadPosts = useCallback(async () => {
    try {
      await PostService.loadActivityPost(userAccess.user_id || "").then(
        (res) => {
          //console.log(res.data);
          setPostData(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log("Error loadPosts:", error);
    }
  }, [setPostData, userAccess.user_id]);

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
  }, []);
  //console.log(badgeData);

  const loadBadgeData = useCallback(async () => {
    try {
      await BadgeService.loadData().then(
        (res) => {
          setBadgeWithImg(res.data);
          setSelCategory(res.data[0]);
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
    if (isMounted) {
      loadPosts();
      loadBadgeData();
      getUserAccess();
    }
  }, [loadPosts, loadBadgeData, getUserAccess]);

  const controlStyles = {
    control: (styles: any) => ({
      ...styles,
      fontFamily: `Gilroy`,
      fontStyle: `normal`,
      fontWeight: `700`,
      fontSize: `18px`,
      lineHeight: `22px`,
      color: `#979B9B`,
      width: `280px`,
      height: `57px`,
      border: `1px solid #007749`,
      background: `#FFFFFF`,
      ":hover": {
        border: `1px solid #007749`,
      },
    }),
  };

  return (
    <Container className="sub-post-container">
      <Row className="mt-5">
        <Col>
          <h2>Posts</h2>
        </Col>
        <Col>
          {state?.status && <ToastNotificationBasic message={state?.message} />}
        </Col>
      </Row>
      <Row className="mt-4 create-post-row">
        <Col className="ps-5">
          <p>Filter by category</p>
        </Col>
        <Col className="d-flex flex-row-reverse">
          {/*<button type="button" className="btn me-5 message={state?.message} btn-create-post">
            <Image className="me-2" src={create_badge} alt="" /> Create Post
  </button>*/}
          <Link
            //to={`/post/activity-package`}
            to={access.default_path}
            className="btn btn-create-post me-5"
          >
            <Image className="me-1" src={create_badge} alt="" /> Create post
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Navbar expand="lg">
            <Container fluid>
              <Nav>
                {/*<Form.Select aria-label="Default select example">
                  badgeData.map((item: any) => (
                    <option key={item.id}>
                      <img src={item.img_icon} alt={item.badge_name} />
                      {item.badge_name}
                    </option>
                  ))
                </Form.Select>*/}
                <Select
                  styles={controlStyles}
                  //value={badgeData[0]}
                  defaultValue={badgeData[0]}
                  //defaultInputValue={badgeData[0]}
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
                  value={selCategory}
                  onChange={(option) => HandleCategoryChange(option)}
                />
              </Nav>
              <Form
                className="d-flex"
                //onSubmit={(e) => onSubmit(e)}
              >
                <InputGroup className="input-group-1 me-2">
                  <InputGroup.Text>
                    <Image src={search} alt="" />
                  </InputGroup.Text>
                  <Form.Control
                    className="input-search"
                    type="text"
                    placeholder="Search"
                    //onChange={(e) => onSearchChange(e)}
                  />
                </InputGroup>
                <Button
                  className="btn btn-light btn-filter"
                  //onClick={(e) => onClickFilter(e)}
                >
                  <Image src={filter} alt="" /> Filter
                </Button>
              </Form>
            </Container>
          </Navbar>
        </Col>
      </Row>
      <Row className="post-items">
        <PostItems items={postData} />
      </Row>
    </Container>
  );
};
export default SubPostScreen;
