import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

const RecentGuides = (props: any) => {
  return props.recentguide.map((recentguideItem: any) => (
    <Col className="col-3" key={recentguideItem.User_id}>
      <Card className="recent-guides my-2">
        <Card.Body>
          <div className="text-center">
            <Image className="mb-2 mt-1" style={{borderRadius: 50}} src={recentguideItem.User_profile_photo_firebase_url} alt="" />
            <h4>{recentguideItem.User_full_name}</h4>
            <p>{recentguideItem.User_email}</p>
            <p>{recentguideItem.User_phone_no}</p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ));
};

export default RecentGuides;
