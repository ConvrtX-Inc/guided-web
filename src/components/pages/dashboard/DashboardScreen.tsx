import "./DashboardScreen.scss";

import user from "../../../assets/admin/user.png";
import user_2 from "../../../assets/admin/user-2.png";
import user_3 from "../../../assets/admin/user-3.png";
import user_4 from "../../../assets/admin/user-4.png";
import user_5 from "../../../assets/admin/user-5.png";
import user_6 from "../../../assets/admin/user-6.png";
import user_7 from "../../../assets/admin/user-7.png";
import user1 from "../../../assets/admin/user1.png";
import user2 from "../../../assets/admin/user2.png";
import box from "../../../assets/admin/box.png";
import cardimg from "../../../assets/admin/card-img.png";
import cardimg0 from "../../../assets/admin/card-img0.png";
import cardimg1 from "../../../assets/admin/card-img1.png";
import cardimg2 from "../../../assets/admin/card-img2.png";

import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import MostRecent from "./MostRecent";
import RecentGuides from "./RecentGuides";
import MostActive from "./MostActive";
import { useEffect, useState } from "react";
import DashboardService from "../../../services/dashboard/Dashboard.Service";
import SpinnerSmall from "../../ui/SpinnerSmall";

const DUMMY_DATA = [
  {
    id: 1,
    article: "Article Name Goes Here",
    img: cardimg,
  },
  {
    id: 2,
    article: "Article Name Goes Here",
    img: cardimg0,
  },
  {
    id: 3,
    article: "Article Name Goes Here",
    img: cardimg1,
  },
  {
    id: 4,
    article: "Article Name Goes Here",
    img: cardimg2,
  },
];

const DUMMY_DATA2 = [
  {
    id: 1,
    name: "Mark Chen",
    email: "mark@gmail.com",
    contactnumber: "+1 367 829 3828",
    img: user,
  },
  {
    id: 2,
    name: "John Kristen",
    email: "john@gmail.com",
    contactnumber: "+1 347 829 3828",
    img: user_2,
  },
  {
    id: 3,
    name: "Rayan Artecona",
    email: "rayan@gmail.com",
    contactnumber: "+1 257 829 3828",
    img: user_3,
  },
  {
    id: 4,
    name: "Smith Jerom",
    email: "mark@gmail.com",
    contactnumber: "+1 113 829 3828",
    img: user,
  },
];

const DUMMY_DATA3 = [
  {
    id: 1,
    name: "John Mark",
    email: "john@gmail.com",
    contactnumber: "+1 367 829 3828",
    img: user_4,
  },
  {
    id: 2,
    name: "Matt Bell",
    email: "matt@gmail.com",
    contactnumber: "+1 347 829 3828",
    img: user_5,
  },
  {
    id: 3,
    name: "Ann Sasha",
    email: "ann@gmail.com",
    contactnumber: "+1 257 829 3828",
    img: user_6,
  },
  {
    id: 4,
    name: "Parket Wilson",
    email: "parker@gmail.com",
    contactnumber: "+1 113 829 3828",
    img: user_7,
  },
];

const DashboardScreen = () => {
  const [cntAllUsers, setCntAllUsers] = useState([]);
  const [cntActiveUsers, setCntActiveUsers] = useState([]);
  const [cntOnlineUsers, setCntOnlineUsers] = useState([]);
  const [cntTotalDownloads, setCntTotalDownloads] = useState([]);
  //const [recentPost, setRecentPost] = useState([]);

  const [flagCntAllUsers, setflagCntAllUsers] = useState(true);
  const [flagActiveUsers, setflagActiveUsers] = useState(true);
  const [flagOnlineUsers, setflagOnlineUsers] = useState(true);
  const [flagTotalDownloads, setflagTotalDownloads] = useState(true);

  const loadCountAllUsers = async () => {
    try {
      await DashboardService.loadCountAllUsers().then(
        (res) => {
          setCntAllUsers(res.count);
          setflagCntAllUsers(false);
        },
        (error) => {
          setflagCntAllUsers(false);
        }
      );
    } catch (err) {
      console.log(err);
      setflagCntAllUsers(false);
    }
  };
  const loadCountActiveUsers = async () => {
    try {
      await DashboardService.loadCountActiveUsers().then(
        (res) => {
          setCntActiveUsers(res.count);
          setflagActiveUsers(false);
        },
        (error) => {
          setflagActiveUsers(false);
        }
      );
    } catch (err) {
      console.log(err);
      setflagActiveUsers(false);
    }
  };
  const loadCountOnlineUsers = async () => {
    try {
      await DashboardService.loadCountOnlineUsers().then(
        (res) => {
          setCntOnlineUsers(res.count);
          setflagOnlineUsers(false);
        },
        (error) => {
          setflagOnlineUsers(false);
        }
      );
    } catch (err) {
      console.log(err);
      setflagOnlineUsers(false);
    }
  };
  const loadCountTotalDownloads = async () => {
    try {
      await DashboardService.loadCountTotalDownloads().then(
        (res) => {
          setCntTotalDownloads(res.downloads);
          setflagTotalDownloads(false);
        },
        (error) => {
          setflagTotalDownloads(false);
        }
      );
    } catch (err) {
      console.log(err);
      setflagTotalDownloads(false);
    }
  };
  /*const loadRecentPosts = async () => {
    try {
      await DashboardService.loadRecentPosts().then(
        (res) => {
          console.log(res);
          setRecentPost(res);
        },
        (error) => {}
      );
    } catch (err) {
      console.log(err);
    }
  };*/

  useEffect(() => {
    //loadRecentPosts();
    loadCountOnlineUsers();
    loadCountTotalDownloads();
    loadCountAllUsers();
    loadCountActiveUsers();
  }, []);

  return (
    <Container className="dashboard-container">
      <Row className="mt-5">
        <Col>
          <h2>Dashboard</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="col-sm">
          <Card>
            <Card.Body>
              <Row className="mt-2">
                <Col className="col-sm-2">
                  <Image src={user1} alt="" />
                </Col>
                <Col className="ms-2">
                  {!flagCntAllUsers && <h5>{cntAllUsers}</h5>}
                  {flagCntAllUsers && <SpinnerSmall />}
                  <p className="d-board">All Users</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm">
          <Card>
            <Card.Body>
              <Row className="mt-2">
                <Col className="col-sm-2">
                  <Image src={user1} alt="" />
                </Col>
                <Col className="ms-2">
                  {!flagActiveUsers && <h5>{cntActiveUsers}</h5>}
                  {flagActiveUsers && <SpinnerSmall />}
                  <p className="d-board">Total Active Users</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm">
          <Card>
            <Card.Body>
              <Row className="mt-2">
                <Col className="col-sm-2">
                  <Image src={user2} alt="" />
                </Col>
                <Col className="ms-2">
                  {!flagOnlineUsers && <h5>{cntOnlineUsers}</h5>}
                  {flagOnlineUsers && <SpinnerSmall />}
                  <p className="d-board">Online Users</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm">
          <Card>
            <Card.Body>
              <Row className="mt-2">
                <Col className="col-sm-2">
                  <Image src={box} alt="" />
                </Col>
                <Col className="ms-2">
                  {!flagTotalDownloads && <h5>{cntTotalDownloads}</h5>}
                  {flagTotalDownloads && <SpinnerSmall />}
                  <p className="d-board">Total Downloads</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="col-sm">
          <h4>Most Recent Post</h4>
        </Col>
        <Col className="col-sm see-all">
          <Link to="/see-all">See all</Link>
        </Col>
      </Row>
      <Row className="mb-5">
        {/*<MostRecent mostrecent={recentPost} />*/}
        <MostRecent mostrecent={DUMMY_DATA} />
      </Row>
      <Row>
        <Col className="mt-5 col-sm">
          <h4>Recent Guides / Outfitters</h4>
        </Col>
        <Col className="mt-5 col-sm see-all">
          <Link to="/see-all">See all</Link>
        </Col>
      </Row>
      <Row>
        <RecentGuides recentguide={DUMMY_DATA2} />
      </Row>
      <Row>
        <Col className="mt-5 col-sm">
          <h4>Most Active End-Users</h4>
        </Col>
        <Col className="mt-5 col-sm see-all">
          <Link to="/see-all">See all</Link>
        </Col>
      </Row>
      <Row>
        <MostActive mostactive={DUMMY_DATA3} />
      </Row>
    </Container>
  );
};

export default DashboardScreen;
