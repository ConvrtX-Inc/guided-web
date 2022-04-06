import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import "./SubDashboardScreen.scss";

import cardimg from "../../../../assets/admin/card-img.png";
import cardimg0 from "../../../../assets/admin/card-img0.png";
import cardimg1 from "../../../../assets/admin/card-img1.png";
import cardimg2 from "../../../../assets/admin/card-img2.png";
import MostRecent from "./MostRecent";
import PackageActivityCard from "./PackageActivityCard";
import EventsCard from "./EventsCard";
import NewsFeedsCard from "./NewsFeedsCard";
import ArticlesCard from "./ArticlesCard";
import AdvertismentsCard from "./AdvertismentsCard";
import OutfittersCard from "./OutfittersCard";

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
        {/**Cards here by sub-admin type */}
        <PackageActivityCard />
        <EventsCard />
        <NewsFeedsCard />
        <ArticlesCard />
        <AdvertismentsCard />
        <OutfittersCard />
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
