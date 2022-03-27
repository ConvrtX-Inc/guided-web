import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

import search from "../../../../assets/admin/search.png";
import down from "../../../../assets/admin/down.png";
import filter from "../../../../assets/admin/filter.png";
import create_badge from "../../../../assets/admin/create-badge.png";

import "./SubPostScreen.scss";
import PostItems from "./PostItems";
import { useCallback, useEffect, useState } from "react";
import BadgeService from "../../../../services/badge/Badge.Service";
import Select from "react-select";

const DUMMY_DATA = [
  {
    id: 1,
    title: "Package Name",
    views: 10,
    created_date: "21.10.2020",
    paid: "yes",
  },
  {
    id: 2,
    title: "Article Name",
    views: 20,
    created_date: "21.10.2020",
    paid: "yes",
  },
  {
    id: 3,
    title: "Events Name",
    views: 30,
    created_date: "21.10.2020",
    paid: "yes",
  },
  {
    id: 4,
    title: "Sample package name",
    views: 40,
    created_date: "21.10.2020",
    paid: "yes",
  },
  {
    id: 5,
    title: "Package Name",
    views: 50,
    created_date: "21.10.2020",
    paid: "yes",
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

  const loadBadgeData = useCallback(async () => {
    try {
      await BadgeService.loadData().then(
        (res) => {
          console.log(res.data);
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
    loadBadgeData();
  }, [loadBadgeData]);

  return (
    <Container className="sub-post-container">
      <Row className="mt-5">
        <Col>
          <h2>Posts</h2>
        </Col>
      </Row>
      <Row className="mt-4">
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
                  //value={badgeData[0]}
                  //defaultValue={badgeData[0]}
                  //defaultInputValue={badgeData[0]}
                  //getOptionLabel={(e) => e.badge_name}
                  getOptionValue={(e) => e.id}
                  options={badgeData}
                  formatOptionLabel={(badgeData) => (
                    <div className="badge-option">
                      <img src={badgeData.imgBase64} className="me-2" />
                      <span>{badgeData.badge_name}</span>
                    </div>
                  )}
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
      <Row>
        <PostItems items={DUMMY_DATA} />
      </Row>
    </Container>
  );
};
export default SubPostScreen;
