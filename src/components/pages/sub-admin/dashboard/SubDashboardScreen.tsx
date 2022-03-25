import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import "./SubDashboardScreen.scss";

import cardimg from "../../../../assets/admin/card-img.png";
import cardimg0 from "../../../../assets/admin/card-img0.png";
import cardimg1 from "../../../../assets/admin/card-img1.png";
import cardimg2 from "../../../../assets/admin/card-img2.png";
import MostRecent from "./MostRecent";

const DUMMY_DATA = [
  {
    id: 1,
    article: "Title of Post",
    img: cardimg,
  },
  {
    id: 2,
    article: "Title of Post",
    img: cardimg0,
  },
  {
    id: 3,
    article: "Title of Post",
    img: cardimg1,
  },
  {
    id: 4,
    article: "Title of Post",
    img: cardimg2,
  },
];
const SubDashboardScreen = () => {
  return (
    <Container className="sub-dashboard-container">
      <Row className="mt-5">
        <Col>
          <h2>Dashboard</h2>
        </Col>
      </Row>
      <Row className="card-count-info">
        <Col className="col-sm mt-4">
          <Card>
            <Card.Body>
              <h5 className="card-title text-center mb-3">
                Packages / Activity
              </h5>
              <p className="card-text text-center">
                Total Posts Views : <span>24</span>
              </p>
              <p className="card-text text-center">Total Posts Posted : 7</p>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm mt-4">
          <Card>
            <Card.Body>
              <h5 className="card-title text-center mb-3">Events</h5>
              <p className="card-text text-center">
                Total Events Views : <span>23</span>
              </p>
              <p className="card-text text-center">Total Events Posted : 10</p>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm mt-4">
          <Card>
            <Card.Body>
              <h5 className="card-title text-center mb-3">Newsfeeds</h5>
              <p className="card-text text-center">
                Total Newsfeeds Views : <span>31</span>
              </p>
              <p className="card-text text-center">
                Total Newsfeeds Posted : 5
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm mt-4">
          <Card>
            <Card.Body>
              <h5 className="card-title text-center mb-3">Articles</h5>
              <p className="card-text text-center">
                Total Articles Views : <span>30</span>
              </p>
              <p className="card-text text-center">
                Total Articles Posted : 10
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="col-sm">
          <h4>Most Recent Post</h4>
        </Col>
        <Col className="col-sm see-all">
          <Link to="/see-all" className="float-end">
            See all
          </Link>
        </Col>
      </Row>
      <Row className="mb-5">
        <MostRecent mostrecent={DUMMY_DATA} />
      </Row>
    </Container>
  );
};

export default SubDashboardScreen;
