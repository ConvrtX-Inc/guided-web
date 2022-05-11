import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

const MostRecent = (props: any) => {
  return props.mostrecent.map((mostrecentItem: any) => (
    <Col className="col-3" key={mostrecentItem.id}>
      <Card className="most-recent pb-3">
        <Image
          className="ms-2 mt-2 me-2 most-recent-img "
          //src={`${"data:image/png;base64,"}${mostrecentItem.snapshot_img}`}
          src={mostrecentItem.firebase_snapshot_img}
          alt=""
        />
        {mostrecentItem.activityBadge && (
          <Image
            className="img-badge"
            src={mostrecentItem.activityBadge.firebase_snapshot_img}
            alt={mostrecentItem.title}
          />
        )}

        <Card.Body>
          <h5 className="card-title">{mostrecentItem.title}</h5>
          <Link to="/read-more" className="btn btn-warning mt-4 btn-read-more">
            Read more
          </Link>
        </Card.Body>
      </Card>
    </Col>
  ));
};

export default MostRecent;
