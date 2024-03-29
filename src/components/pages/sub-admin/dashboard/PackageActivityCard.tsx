import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const PackageActivityCard = (props: any) => {
  return (
    <Col className="col-3 mt-4">
      <Card>
        <Card.Body>
          <h5 className="card-title text-center mb-3">Packages / Activity</h5>
          <p className="card-text text-center">
            Total Posts Views : <span>{props.views}</span>
          </p>
          <p className="card-text text-center">
            Total Posts Posted : {props.count}
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default PackageActivityCard;
