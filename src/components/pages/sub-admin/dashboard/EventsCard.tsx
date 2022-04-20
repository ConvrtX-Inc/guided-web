import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
const EventsCard = (props: any) => {
  return (
    <Col className="col-3 mt-4">
      <Card>
        <Card.Body>
          <h5 className="card-title text-center mb-3">Events</h5>
          <p className="card-text text-center">
            Total Events Views : <span>{props.views}</span>
          </p>
          <p className="card-text text-center">
            Total Events Posted : {props.count}
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default EventsCard;
