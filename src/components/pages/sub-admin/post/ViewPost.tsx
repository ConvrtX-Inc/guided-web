import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import "./ViewPost.scss";
import { useLocation } from "react-router-dom";
const ViewPost = () => {
  const location = useLocation();
  const { post }: any = location.state;
  return (
    <Container className="sub-view-post-container">
      <Row className="mt-5">
        <Col>
          <h2>Posts</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>{post.title}</h4>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <div className="image-wrapper">
            <Image
              className="float-start me-4 view-post-img"
              src={post.img}
              alt={post.title}
            />
            <Image
              className="view-img-badge"
              src={post.badge}
              alt={post.title}
            />
          </div>
          <p className="me-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            venenatis volutpat risus vitae iaculis. Duis laoreet molestie
            efficitur. Aenean arcu velit, vestibulum a libero vel, sollicitudin
            posuere dui. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed venenatis volutpat risus vitae iaculis. Duis laoreet
            molestie efficitur. Aenean arcu velit, vestibulum a libero vel,
            sollicitudin posuere dui.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed venenatis volutpat risus vitae iaculis. Duis
            laoreet molestie efficitur. Aenean arcu velit, vestibulum a libero
            vel, sollicitudin posuere dui.Lorem ipsum dolor sit amet, Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis
            volutpat risus vitae iaculis. Duis laoreet molestie efficitur.
            Aenean arcu velit, vestibulum a libero vel, sollicitudin posuere
            dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            venenatis volutpat risus vitae iaculis. Duis laoreet molestie
            efficitur. Aenean arcu velit, vestibulum a libero vel, sollicitudin
            posuere dui.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed venenatis volutpat risus vitae iaculis. Duis laoreet molestie
            efficitur. Aenean arcu velit, vestibulum a libero vel, sollicitudin
            posuere dui.Lorem ipsum dolor sit amet,{" "}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image
            className="float-start me-4 view-post-img"
            src={post.img}
            alt={post.title}
          />
        </Col>
      </Row>
      {/*<Row className="view-post-info ms-1 me-1">
        <Col className=" ">
          <Row className="mt-5 ps-5">
            <Col>
              <label className="label-name">Date : </label>
              <label className="label-value ms-1">10/12/2021</label>
            </Col>
            <Col>
              <label className="label-name">Contact Person : </label>
              <label className="label-value ms-1">Sample Name</label>
            </Col>
            <Col>
              <label className="label-name">Email Address : </label>
              <label className="label-value ms-1">email@gmail.com</label>
            </Col>
          </Row>
          <Row className="mt-5 ps-5">
            <Col>
              <label className="label-name">Website : </label>
              <label className="label-value ms-1">www.website.com</label>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="view-post-location mt-3 ms-1 me-1">
        <Col>
          <Row className="mt-4">
            <Col className="col-2">
              <h3 className="ms-5">Location</h3>
            </Col>
            <Col>
              <hr className="mt-4 me-5" />
            </Col>
          </Row>
          <Row className="mt-3 ps-5">
            <Col>
              <label className="label-name">Location : </label>
              <label className="label-value ms-1">Address</label>
            </Col>
            <Col>
              <label className="label-name">Street : </label>
              <label className="label-value ms-1">123HJK</label>
            </Col>
            <Col>
              <label className="label-name">City :</label>
              <label className="label-value ms-1">Toranto</label>
            </Col>
          </Row>
          <Row className="mt-3 ps-5">
            <Col>
              <label className="label-name">Province :</label>
              <label className="label-value ms-1">West</label>
            </Col>
            <Col>
              <label className="label-name">Postal Code : </label>
              <label className="label-value ms-1">10000380</label>
            </Col>
            <Col></Col>
          </Row>
        </Col>
  </Row>*/}
    </Container>
  );
};
export default ViewPost;
