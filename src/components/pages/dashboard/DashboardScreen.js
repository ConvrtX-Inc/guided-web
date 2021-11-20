import './DashboardScreen.scss';

import user from '../../../assets/admin/user.png';
import user_2 from '../../../assets/admin/user-2.png';
import user_3 from '../../../assets/admin/user-3.png';
import user_4 from '../../../assets/admin/user-4.png';
import user_5 from '../../../assets/admin/user-5.png';
import user_6 from '../../../assets/admin/user-6.png';
import user_7 from '../../../assets/admin/user-7.png';
import user1 from '../../../assets/admin/user1.png';
import user2 from '../../../assets/admin/user2.png';
import box from '../../../assets/admin/box.png';
import cardimg from '../../../assets/admin/card-img.png';
import cardimg0 from '../../../assets/admin/card-img0.png';
import cardimg1 from '../../../assets/admin/card-img1.png';
import cardimg2 from '../../../assets/admin/card-img2.png';

import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const DashboardScreen = () => {
  return (
    <Container className="dashboard-container">
      <Row className="mt-5">
        <Col>
          <h2>Dashboard</h2>
        </Col>
      </Row>
      <Row>
        <Col className="col-sm">
          <Card>
            <Card.Body>
              <Row className="mt-2">
                <Col className="col-sm-2">
                  <Image src={user1} alt="" />
                </Col>
                <Col>
                  <h5>732</h5>
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
                <Col>
                  <h5>443</h5>
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
                <Col>
                  <h5>172</h5>
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
                <Col>
                  <h5>532</h5>
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
        <Col className="col-sm">
          <Card className="most-recent p-2">
            <Image src={cardimg0} alt="" />
            <Card.Body>
              <h5 className="card-title">Article name goes here</h5>
              <Link to="/read-more" className="btn btn-warning mt-4">
                Read more
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm">
          <Card className="most-recent p-2">
            <Image src={cardimg} alt="" />
            <Card.Body>
              <h5 className="card-title">Article name goes here</h5>
              <Link to="/read-more" className="btn btn-warning mt-4">
                Read more
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm">
          <Card className="most-recent p-2">
            <Image src={cardimg1} alt="" />
            <Card.Body>
              <h5 className="card-title">Article name goes here</h5>
              <Link to="/read-more" className="btn btn-warning mt-4">
                Read more
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm">
          <Card className="most-recent p-2">
            <Image src={cardimg2} alt="" />
            <Card.Body>
              <h5 className="card-title">Article name goes here</h5>
              <Link to="/read-more" className="btn btn-warning mt-4">
                Read more
              </Link>
            </Card.Body>
          </Card>
        </Col>
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
        <Col className="col-sm">
          <Card className="recent-guides">
            <Card.Body>
              <div className="text-center">
                <Image className="mb-2" src={user} alt="" />
                <h4>Mark Chen</h4>
                <p>mark@gmail.com</p>
                <p>+1 367 829 3828</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm">
          <Card className="recent-guides">
            <Card.Body>
              <div className="text-center">
                <Image className="mb-2" src={1} alt="" />
                <h4>John Kristen</h4>
                <p>john@gmail.com</p>
                <p>+1 347 829 3828</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm">
          <Card className="recent-guides">
            <Card.Body>
              <div className="text-center">
                <Image className="mb-2" src={user_2} alt="" />
                <h4>Rayan Artecona</h4>
                <p>rayan@gmail.com</p>
                <p>+1 257 829 3828</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm">
          <Card className="recent-guides">
            <Card.Body>
              <div className="text-center">
                <Image className="mb-2" src={user_3} alt="" />
                <h4>Smith Jerom</h4>
                <p>mark@gmail.com</p>
                <p>+1 113 829 3828</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
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
        <Col className="col-sm">
          <Card className="most-active">
            <Card.Body>
              <div className="text-center">
                <Image className="mb-2" src={user_4} alt="" />
                <h4>Rayan Artecona</h4>
                <p>rayan@gmail.com</p>
                <p>+1 257 829 3828</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm">
          <Card className="most-active">
            <Card.Body>
              <div className="text-center">
                <Image className="mb-2" src={user_5} alt="" />
                <h4>Rayan Artecona</h4>
                <p>rayan@gmail.com</p>
                <p>+1 257 829 3828</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm">
          <Card className="most-active">
            <Card.Body>
              <div className="text-center">
                <Image className="mb-2" src={user_6} alt="" />
                <h4>Rayan Artecona</h4>
                <p>rayan@gmail.com</p>
                <p>+1 257 829 3828</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm">
          <Card className="most-active">
            <Card.Body>
              <div className="text-center">
                <Image className="mb-2" src={user_7} alt="" />
                <h4>Rayan Artecona</h4>
                <p>rayan@gmail.com</p>
                <p>+1 257 829 3828</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardScreen;
