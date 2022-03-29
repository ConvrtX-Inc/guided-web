import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import "./CreatePost.scss";
import left from "../../../../assets/admin/left.png";
import BadgeService from "../../../../services/badge/Badge.Service";
import Select from "react-select";
//import DatePicker from "react-datepicker";

interface Badge {
  id: string;
  badge_name: string;
  badge_description: string;
  img64: string;
}
const CreatePost = () => {
  //const [dateAvailability, setDateAvailability] = useState(new Date());
  const [dateAvailability, setDateAvailability] = useState("");
  const [postCategory, setPostCategory] = useState("Article");
  //function handleDateChange(event: any) {
  //  setDateAvailability(event.target.value);
  //}

  const handleDateChange = (event: any) => {
    setDateAvailability(event.target.value);
  };

  const handleCategoryChange = (event: any) => {
    //console.log(event.target.options[event.target.selectedIndex].text);
    //setPostCategory(event.target.value);
    setPostCategory(event.target.options[event.target.selectedIndex].text);
  };

  const category = [
    { id: 1, text: "Article" },
    { id: 2, text: "News Feed" },
  ];
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
          //console.log(res.data);
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
  const controlStyles = {
    control: (styles: any) => ({
      ...styles,
      fontFamily: `Gilroy`,
      fontStyle: `normal`,
      fontWeight: `400`,
      fontSize: `16px`,
      lineHeight: `19px`,
      color: `#181B1B`,
      width: `364px`,
      height: `66px`,
      border: `1px solid #C4C4C4`,
      borderRadius: `18px`,
      ":hover": {
        border: `1px solid #C4C4C4`,
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
    <Container className="create-post-container">
      <Row className="mt-5">
        <Col className="col-6">
          <Row>
            <Col className="col-2">
              <Link to={`/sub-admin/post`} className="btn btn-bck">
                <Image className="" src={left} alt="" />
              </Link>
            </Col>
            <Col>
              <h2>Create {postCategory}</h2>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="ms-3 me-3 post-form">
          <Form className="m-5">
            <Row>
              <Col className="col-4">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  className="select-category"
                  aria-label="Default select example"
                  value={postCategory}
                  onChange={handleCategoryChange}
                >
                  {category.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.text}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                <label htmlFor="site_state" className="form-check-label">
                  Premium User
                </label>
                <div className="form-switch form-check ms-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="site_state"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="mt-2 col-10">
                <hr />
              </Col>
            </Row>
            <Row>
              <Col className="col-4">
                <Form.Label>Select Main Badge</Form.Label>
                <Select
                  styles={controlStyles}
                  //value={badgeData[0]}
                  //defaultValue={badgeData[0]}
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
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Form.Label>Select Sub badge (Maximum 5 badges)</Form.Label>
              </Col>
            </Row>
            <Row className=" pt-2">
              <Col>
                {badgeData.map((item: any) => (
                  <div
                    key={item.id}
                    className="chk-multiple-badge form-check form-check-inline"
                  >
                    <input
                      className="chkbox-badge form-check-input"
                      type="checkbox"
                      id={item.id}
                    />
                    <label
                      htmlFor={item.id}
                      className="form-check-label form-check-label-badge"
                    >
                      <img
                        className="chk-badge-img"
                        src={item.imgBase64}
                        alt={item.badge_name}
                      />
                    </label>
                    <Row>
                      <Col>{item.badge_name}</Col>
                    </Row>
                  </div>
                ))}
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Form.Label>
                  Upload multiple images (Maximum 5 images)
                </Form.Label>
              </Col>
            </Row>
            <Row className="upload-img pt-2">
              <Col className="col-2 me-2 d-flex justify-content-center align-items-center">
                <button className="btn" type="button">
                  +
                </button>
              </Col>
              <Col className="col-2 me-2 d-flex justify-content-center align-items-center">
                <button className="btn" type="button">
                  +
                </button>
              </Col>
              <Col className="col-2 me-2 d-flex justify-content-center align-items-center">
                <button className="btn" type="button">
                  +
                </button>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="col-8">
                <Form.Control
                  className="input-title"
                  type="text"
                  placeholder="Title"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Form.Label>Date</Form.Label>
                {/*<DatePicker
                  className="input-date"
                  selected={dateAvailability}
                  onChange={(date: Date) => setDateAvailability(date)}
                  />*/}
                <Form.Control
                  type="date"
                  className="input-date"
                  placeholder="Set Availability"
                  value={dateAvailability}
                  onChange={handleDateChange}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Form.Control
                  as="textarea"
                  placeholder="Description of event"
                  rows={7}
                  className="input-description"
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mt-5">
                <button type="button" className="btn-submit">
                  Submit
                </button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default CreatePost;
