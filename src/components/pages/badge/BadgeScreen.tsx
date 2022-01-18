import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import search from "../../../assets/admin/search.png";
import down from "../../../assets/admin/down.png";
import filter from "../../../assets/admin/filter.png";
import create_badge from "../../../assets/admin/create-badge.png";

import "./BadgeScreen.scss";
import BadgeItems from "./BadgeItems";

import api from "./api/Badge";

interface Badge {
  id: string;
  badge_name: string;
  badge_description: string;
  img64: string;
}

const BadgeScreen = () => {
  const [data, setData] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    return await api
      .get("/badges")
      .then((res) => {
        //setData(res.data);

        setDataWithImg(res.data);
      })
      .catch((err) => console.log(err));
  };

  const setDataWithImg = async (badges: Badge[]) => {
    let badgeWithImg: Badge[] = [];

    const base64Flag = "data:image/png;base64,";

    await Promise.all(
      badges.map(async (badge: any) => {
        //console.log(badge);
        //console.log(badge.img_icon.data);

        //const img64 = bufferToBase64(badge.img_icon.data);
        //console.log(img64)

        //badge.img64 = `${base64Flag}${img64}`;
        //console.log(badge.img64);

        const imgBuffer = badge.img_icon.data;
        //console.log(imgBuffer);

        //const base64Flag = "data:image/png;base64,";
        const imgBase64 = bufferToBase64(imgBuffer);
        //console.log(imgBase64);

        badge.imgBase64 = `${base64Flag}${imgBase64}`;
        //console.log(badge.imgBase64);

        badgeWithImg.push(badge);
        //console.log(badgeWithImg);
      })
    );

    setData(badgeWithImg);
    setIsLoading(false);
  };

  const bufferToBase64 = (buffer: any) => {
    const b64 = Buffer.from(buffer, "base64");
    return b64;
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container className="badge-container">
      <Row className="mt-5">
        <Col>
          <h2>Badge Management</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Navbar expand="lg">
            <Container fluid>
              <Nav>
                <NavLink
                  to="/badge/create"
                  className="btn btn-light btn-create-badge pt-2"
                >
                  <Image className="pe-2" src={create_badge} alt="" />
                  Create Badge
                </NavLink>
              </Nav>
              <Form className="d-flex">
                <InputGroup className="input-group-1 me-2">
                  <InputGroup.Text>
                    <Image src={search} alt="" />
                  </InputGroup.Text>
                  <Form.Control
                    className="input-search"
                    type="text"
                    placeholder="Search"
                  />
                </InputGroup>
                <InputGroup className="input-group-2 me-2">
                  <Form.Select className="custom-select">
                    <option>Sort by</option>
                  </Form.Select>
                  <InputGroup.Text>
                    <Image src={down} alt="" />
                  </InputGroup.Text>
                </InputGroup>
                <NavLink
                  to="/become-guide/filter"
                  className="btn btn-light btn-filter"
                >
                  <Image src={filter} alt="" /> Filter
                </NavLink>
              </Form>
            </Container>
          </Navbar>
        </Col>
      </Row>
      {!isLoading && <BadgeItems items={data} />}
      {isLoading && <p>Loading data..</p>}
    </Container>
  );
};

export default BadgeScreen;
