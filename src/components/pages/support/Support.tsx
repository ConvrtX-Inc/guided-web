import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";

import "./Support.scss";
import user from "../../../assets/admin/user.png";
import user1 from "../../../assets/admin/user-1.png";
import user2 from "../../../assets/admin/user-2.png";
import cardimg from "../../../assets/admin/card-img.png";
const Support = () => {
  return (
    <Container className="support-container">
      <Row className="mt-5">
        <Col>
          <h2>Support</h2>
        </Col>
      </Row>
      <Row className="mt-4 content">
        <Col className="col-5 col-sm-5 ps-4 inbox">
          <Row className="row-search">
            <Col className="mt-4 mb-2">
              <InputGroup className="input-group-1 me-2">
                <InputGroup.Text>
                  <Image src="svgs/search.svg" alt="" />
                </InputGroup.Text>
                <Form.Control
                  className="input-search"
                  type="text"
                  placeholder="Search"
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="row-nav">
            <Col>
              <nav className="nav nav-thread">
                <a className="nav-link active" aria-current="page" href="#">
                  Guides
                </a>
                <a className="nav-link disabled" href="#">
                  Travelers
                </a>
              </nav>
            </Col>
          </Row>
          <Row className="row-chats">
            <Col className="mt-4 ps-4">
              <ul className="list-group list-group-flush">
                <li className="list-group-item ">
                  <div className="row p-2 chat-active">
                    <div className="col-2 align-self-center">
                      <Image
                        className="img-user"
                        width={50}
                        height={50}
                        src={user1}
                        alt=""
                      />
                    </div>
                    <div className="col-7 message">
                      <div className="name">
                        <div className="fw-bold mb-1">John Kristen</div>
                        <p className="text">Hello, how are you?</p>
                      </div>
                    </div>
                    <div className="col-3">
                      <Row>
                        <Col>
                          <small className="timestamp">5 mins ago</small>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <span className="badge bg-primary rounded-pill custom-rounded-pill">
                            2
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row p-3">
                    <div className="col-2 align-self-center">
                      <Image
                        className="img-user"
                        width={50}
                        height={50}
                        src={user2}
                        alt=""
                      />
                    </div>
                    <div className="col-7 message">
                      <div className="name">
                        <div className="fw-bold  mb-1">Ryan Artecona</div>
                        <p className="text">what time was our meeting...</p>
                      </div>
                    </div>
                    <div className="col-3">
                      <Row>
                        <Col>
                          <small className="timestamp">2hrs ago</small>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <span className="badge bg-primary rounded-pill custom-rounded-pill">
                            1
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row p-3">
                    <div className="col-2 align-self-center">
                      <Image
                        className="img-user"
                        width={50}
                        height={50}
                        src={user}
                        alt=""
                      />
                    </div>
                    <div className="col-7 message">
                      <div className="name">
                        <div className="fw-bold mb-1">Mark Chen</div>
                        <p className="text">The truth is I haven’t much...</p>
                      </div>
                    </div>
                    <div className="col-3">
                      <Row>
                        <Col>
                          <small className="timestamp">2hrs ago</small>
                        </Col>
                      </Row>
                      <Row>
                        <Col></Col>
                      </Row>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <Row className=" p-3">
                    <div className="col-2 align-self-center">
                      <Image
                        className="img-user"
                        width={50}
                        height={50}
                        src={user2}
                        alt=""
                      />
                    </div>
                    <div className="col-7 message">
                      <div className="fw-bold mb-1">Sam Dave</div>
                      <p className="text">I am trying to create an...</p>
                    </div>
                    <div className="col-3">
                      <Row>
                        <Col>
                          <small className="timestamp">3hrs ago</small>
                        </Col>
                      </Row>
                      <Row>
                        <Col></Col>
                      </Row>
                    </div>
                  </Row>
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="new-thread">
            <Col className="mt-5 pt-3">
              <button className="btn btn-send float-end" type="button">
                <Image
                  className=" align-self-center"
                  src="svgs/plus.svg"
                  alt=""
                />
              </button>
            </Col>
          </Row>
        </Col>
        <Col className="col-7">
          <Row className="mt-4">
            <Col className="col-2 align-self-center justify-content-center d-flex">
              <Image
                className="img-user"
                width={50}
                height={50}
                src={user1}
                alt=""
              />
            </Col>
            <Col className="col-4">
              <div className="name-2 mb-1">John Kristen</div>
              <div className="email mb-1">johnkristen@gmail.com</div>
              <div className="contact">902r55u39573957</div>
            </Col>
            <Col className="col-md-3 offset-md-3 align-self-center justify-content-center d-flex">
              <div className="justify-content-end">
                <Form.Select aria-label="Default select example">
                  <option>Mark as</option>
                </Form.Select>
              </div>
            </Col>
          </Row>
          <Row className="mt-4 row-nav"></Row>
          <Row className="mt-4">
            <div className="col align-self-center justify-content-center d-flex">
              18 March 2021
            </div>
          </Row>

          <Row className="row-thread">
            <Col>
              {/*************************************************************************/}
              <Row>
                <Col className="align-self-center justify-content-end d-flex mt-4">
                  <Image
                    className="img-user me-2 mt-3"
                    width={30}
                    height={30}
                    src={user1}
                    alt=""
                  />
                  <div className="thread1 p-3">
                    Lorem Ipsum is simply dummy text of the printing.
                  </div>
                </Col>
              </Row>
              <Row className="g-0">
                <Col className="align-self-center justify-content-end d-flex ">
                  <small className="timestamp-chat">6 m ago</small>
                </Col>
              </Row>
              <Row>
                <Col className="align-self-center justify-content-start d-flex pe-5 me-5">
                  <Image
                    className="img-user me-2 me-2 mt-3"
                    width={30}
                    height={30}
                    src={user2}
                    alt=""
                  />
                  <div className="thread2 p-3">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard
                  </div>
                </Col>
              </Row>
              <Row className="g-0">
                <Col className="col-10 align-self-center justify-content-end d-flex ">
                  <small className="timestamp-chat">5 m ago</small>
                </Col>
              </Row>

              {/*************************************************************************/}
              <Row>
                <Col className="align-self-center justify-content-end d-flex mt-4">
                  <Image
                    className="img-user me-2 me-2 mt-3"
                    width={30}
                    height={30}
                    src={user1}
                    alt=""
                  />
                  <div className="thread1 p-3">Lorem Ipsum is simply dummy</div>
                </Col>
              </Row>
              <Row className="g-0">
                <Col className="align-self-center justify-content-end d-flex ">
                  <small className="timestamp-chat">3 m ago</small>
                </Col>
              </Row>
              <Row>
                <Col className="align-self-center justify-content-start d-flex pe-5 me-5">
                  <Image
                    className="img-user me-2 me-2 mt-3"
                    width={30}
                    height={30}
                    src={user2}
                    alt=""
                  />
                  <div className="thread2 p-3">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </Col>
              </Row>
              <Row className="g-0">
                <Col className="col-9 align-self-center justify-content-end d-flex ">
                  <small className="timestamp-chat">1 m ago</small>
                </Col>
              </Row>

              {/*************************************************************************/}
              <Row>
                <Col className="align-self-center justify-content-start d-flex pe-5 me-5">
                  <div className="thread3 ms-4">
                    <div className="row g-0">
                      <div className="col-10">
                        <Image
                          className="p-2"
                          width={180}
                          height={90}
                          alt=""
                          src={cardimg}
                        />
                      </div>
                      <div className="col-2 align-self-center ">
                        <Image src="svgs/dark-dl.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          {/*Chat controls*/}
          <Row className="row-reply pt-4 g-0">
            <Col className="col-2 align-self-center me-3">
              <Image className="float-end" src="svgs/file.svg" alt="" />
            </Col>
            <Col className="col-1 align-self-center">
              <Image className="float-start" src="svgs/img.svg" alt="" />
            </Col>
            <Col className="col-7 d-flex">
              <Form.Control
                className="input-reply"
                type="text"
                placeholder="Write your message here"
              />
            </Col>
            <Col className="ms-2 align-self-center">
              <button className="btn btn-send" type="button">
                <Image
                  className=" align-self-center"
                  src="svgs/right-pointer.svg"
                  alt=""
                />
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Support;
