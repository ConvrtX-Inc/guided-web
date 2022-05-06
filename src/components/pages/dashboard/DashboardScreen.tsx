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

import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import MostRecent from "./MostRecent";
import RecentGuides from "./RecentGuides";
import MostActive from "./MostActive";
import { useCallback, useContext, useEffect, useState } from "react";
import DashboardService from "../../../services/dashboard/Dashboard.Service";
import SpinnerSmall from "../../ui/SpinnerSmall";
import { UserAccess } from "../../../shared/interfaces/UserAccess.interface";
import AuthContext from "../../../context/AuthContext";
import Spinner from "../../ui/Spinner";

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
  const authCtx = useContext(AuthContext);
  const userAccess: UserAccess = authCtx.userRole;

  const [postData, setPostData] = useState([] as any[]);

  const [cntAllUsers, setCntAllUsers] = useState([]);
  const [cntActiveUsers, setCntActiveUsers] = useState([]);
  const [cntOnlineUsers, setCntOnlineUsers] = useState([]);
  const [cntTotalDownloads, setCntTotalDownloads] = useState([]);
  const [recentGuides, setRecentGuides] = useState([]);

  const [flagCntAllUsers, setflagCntAllUsers] = useState(true);
  const [flagActiveUsers, setflagActiveUsers] = useState(true);
  const [flagOnlineUsers, setflagOnlineUsers] = useState(true);
  const [flagTotalDownloads, setflagTotalDownloads] = useState(true);
  const [recentPostLoading, setRecentPostLoading] = useState(true);
  const [recentGuideLoading, setRecentGuideLoading] = useState(true);

  const loadSubAdminRecentPosts = useCallback(
    async (cancel?: boolean) => {
      setRecentPostLoading(true);
      try {
        await DashboardService.loadSubAdminRecentPosts(
          userAccess.user_id || ""
        ).then(
          (res) => {
            setRecentPostLoading(false);
            if (cancel) return;
            setPostData(res.data);
          },
          (err) => {
            console.log(err);
            setRecentPostLoading(false);
            if (cancel) return;
          }
        );
      } catch (error) {
        setRecentPostLoading(false);
        console.log("Error loadSubAdminRecentPosts:", error);
        if (cancel) return;
      }
    },
    [userAccess.user_id]
  );

  const loadRecentGuides = useCallback(
    async (cancel?: boolean) => {
      setRecentGuideLoading(true);
      try {
        await DashboardService.loadRecentGuides().then(
          (res) => {
            setRecentGuideLoading(false);
            //console.log(res.data);
            if (cancel) return;
            setRecentGuides(res.data);
          },
          (err) => {
            setRecentGuideLoading(false);
            console.log(err);
            if (cancel) return;
          }
        );
      } catch (error) {
        setRecentGuideLoading(false);
        console.log("Error loadRecentGuides:", error);
        if (cancel) return;
      }
    },
    [setRecentGuides]
  );

  const loadCountAllUsers = useCallback(async (cancel?: boolean) => {
    try {
      await DashboardService.loadCountAllUsers().then(
        (res) => {
          if (cancel) return;
          setCntAllUsers(res.count);
          setflagCntAllUsers(false);
        },
        (error) => {
          if (cancel) return;
          setflagCntAllUsers(false);
        }
      );
    } catch (err) {
      console.log(err);
      if (cancel) return;
      setflagCntAllUsers(false);
    }
  }, []);

  const loadCountActiveUsers = useCallback(async (cancel?: boolean) => {
    try {
      await DashboardService.loadCountActiveUsers().then(
        (res) => {
          if (cancel) return;
          setCntActiveUsers(res.count);
          setflagActiveUsers(false);
        },
        (error) => {
          if (cancel) return;
          setflagActiveUsers(false);
        }
      );
    } catch (err) {
      console.log(err);
      if (cancel) return;
      setflagActiveUsers(false);
    }
  }, []);

  const loadCountOnlineUsers = useCallback(async (cancel?: boolean) => {
    try {
      await DashboardService.loadCountOnlineUsers().then(
        (res) => {
          if (cancel) return;
          setCntOnlineUsers(res.count);
          setflagOnlineUsers(false);
        },
        (error) => {
          if (cancel) return;
          setflagOnlineUsers(false);
        }
      );
    } catch (err) {
      console.log(err);
      if (cancel) return;
      setflagOnlineUsers(false);
    }
  }, []);

  const loadCountTotalDownloads = useCallback(async (cancel?: boolean) => {
    try {
      await DashboardService.loadCountTotalDownloads().then(
        (res) => {
          if (cancel) return;
          setCntTotalDownloads(res.downloads);
          setflagTotalDownloads(false);
        },
        (error) => {
          if (cancel) return;
          setflagTotalDownloads(false);
        }
      );
    } catch (err) {
      console.log("Error on loadCountTotalDownloads: ", err);
      if (cancel) return;
      setflagTotalDownloads(false);
    }
  }, []);

  useEffect(() => {
    let cancel = false;

    loadCountOnlineUsers(cancel);
    loadCountTotalDownloads(cancel);
    loadCountAllUsers(cancel);
    loadCountActiveUsers(cancel);
    loadSubAdminRecentPosts(cancel);
    loadRecentGuides(cancel);

    return () => {
      cancel = true;
    };
  }, [
    loadCountActiveUsers,
    loadCountOnlineUsers,
    loadSubAdminRecentPosts,
    loadCountAllUsers,
    loadCountTotalDownloads,
    loadRecentGuides,
  ]);

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
        {!recentPostLoading && <MostRecent mostrecent={postData} />}
        {recentPostLoading && <Spinner />}
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
        {!recentGuideLoading && <RecentGuides recentguide={recentGuides} />}
        {recentGuideLoading && <Spinner />}
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
