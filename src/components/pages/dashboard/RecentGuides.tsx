import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

const RecentGuides = (props: any) => {
  return props.recentguide.map((recentguideItem: any) => (
    <Col className="col-sm" key={recentguideItem.id}>
      <Card className="recent-guides">
        <Card.Body>
          <div className="text-center">
            <Image className="mb-2 mt-1" src={recentguideItem.img} alt="" />
            <h4>{recentguideItem.name}</h4>
            <p>{recentguideItem.email}</p>
            <p>{recentguideItem.contactnumber}</p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ));
};

export default RecentGuides;
