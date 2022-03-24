import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

const MostRecent = (props: any) => {
  return props.mostrecent.map((mostrecentItem: any) => (
    <Col key={mostrecentItem.id}>
      <Card className="most-recent pb-3">
        <Image className="ms-2 mt-2 me-2" src={mostrecentItem.img} alt="" />
        <Card.Body>
          <h5 className="card-title">{mostrecentItem.ActivityPost_title}</h5>
          <Link to="/read-more" className="btn btn-warning">
            Read more
          </Link>
        </Card.Body>
      </Card>
    </Col>
  ));
};

export default MostRecent;
