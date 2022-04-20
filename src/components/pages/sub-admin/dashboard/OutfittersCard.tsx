import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
const OutfittersCard = (props: any) => {
  return (
    <Col className="col-3 mt-4">
      <Card>
        <Card.Body>
          <h5 className="card-title text-center mb-3">Outfitters</h5>
          <p className="card-text text-center">
            Total Outfitters Views :<span>{props.views}</span>
          </p>
          <p className="card-text text-center">
            Total Outfitters Posted : {props.count}
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default OutfittersCard;
