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

//for dummy data only
import post1 from "../../../../assets/images/post1.png";
import post2 from "../../../../assets/images/post2.png";
import post3 from "../../../../assets/images/post3.png";
import post4 from "../../../../assets/images/post4.png";

import camping from "../../../../assets/images/Camping.png";
import fishing from "../../../../assets/images/Fishing.png";
import hiking from "../../../../assets/images/Hiking.png";
import hunt from "../../../../assets/images/Hunt.png";
//end of dummy data

import "./SubPostScreen.scss";
import PostItems from "./PostItems";
import { useCallback, useEffect, useState } from "react";
import BadgeService from "../../../../services/badge/Badge.Service";
import Select from "react-select";
import { Link } from "react-router-dom";

const DUMMY_DATA = [
  {
    id: 1,
    title: "Package Name",
    views: 10,
    created_date: "21.10.2020",
    paid: "yes",
    img: post1,
    badge: hiking,
  },
  {
    id: 2,
    title: "Article Name",
    views: 20,
    created_date: "21.10.2020",
    paid: "yes",
    img: post2,
    badge: camping,
  },
  {
    id: 3,
    title: "Events Name",
    views: 30,
    created_date: "21.10.2020",
    paid: "yes",
    img: post3,
    badge: fishing,
  },
  {
    id: 4,
    title: "Sample package name",
    views: 40,
    created_date: "21.10.2020",
    paid: "yes",
    img: post4,
    badge: hunt,
  },
  {
    id: 5,
    title: "Package Name",
    views: 50,
    created_date: "21.10.2020",
    paid: "yes",
    img: post1,
    badge: camping,
  },
];

interface Badge {
  id: string;
  badge_name: string;
  badge_description: string;
  img64: string;
}

const SubPostScreen = () => {
  const [badgeData, setBadgeData] = useState([] as any[]);

  const [selCategory, setSelCategory] = useState({});

  const HandleCategoryChange = (obj: any) => {
    setSelCategory(obj);
  };
  //console.log(selCategory);

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
          //console.log(res.data);
          setBadgeWithImg(res.data);
          //setBadgeData(res.data);

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
    loadBadgeData();
  }, [loadBadgeData]);

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
      /*":active": {
        border: `1px solid #007749`,
      },
      ":focus": {
        border: `1px solid #007749`,
      },
      ":blur": {
        border: `1px solid #007749`,
      },*/
    }),
  };

  return (
    <Container className="sub-post-container">
      <Row className="mt-5">
        <Col>
          <h2>Posts</h2>
        </Col>
      </Row>
      <Row className="mt-4 create-post-row">
        <Col className="ps-5">
          <p>Filter by category</p>
        </Col>
        <Col className="d-flex flex-row-reverse">
          {/*<button type="button" className="btn me-5 btn-create-post">
            <Image className="me-2" src={create_badge} alt="" /> Create Post
  </button>*/}
          <Link
            to={`/sub-admin/post/create`}
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
                  //getOptionLabel={(e) => e.badge_name}
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
                <InputGroup className="input-group-2 me-2">
                  <Form.Select className="custom-select">
                    <option>Sort by</option>
                  </Form.Select>
                  {/*<InputGroup.Text>
                    <Image src={down} alt="" />
  </InputGroup.Text>*/}
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
        <PostItems items={DUMMY_DATA} />
      </Row>
    </Container>
  );
};
export default SubPostScreen;
