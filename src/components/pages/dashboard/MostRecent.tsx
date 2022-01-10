import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

const MostRecent = (props: any) => {
  return props.mostrecent.map((mostrecentItem: any) => (
    <Col className="col-sm" key={mostrecentItem.id}>
      <Card className="most-recent p-2">
        <Image src={mostrecentItem.img} alt="" />
        <Card.Body>
          <h5 className="card-title">{mostrecentItem.article}</h5>
          <Link to="/read-more" className="btn btn-warning mt-4">
            Read more
          </Link>
        </Card.Body>
      </Card>
    </Col>
  ));
};

export default MostRecent;
