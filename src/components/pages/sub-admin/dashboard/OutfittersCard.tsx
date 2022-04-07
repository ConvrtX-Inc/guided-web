import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
const OutfittersCard = () => {
  return (
    <Col className="col-3 mt-4">
      <Card>
        <Card.Body>
          <h5 className="card-title text-center mb-3">Outfitters</h5>
          <p className="card-text text-center">
            Total Outfitters Views :<span>19</span>
          </p>
          <p className="card-text text-center">Total Outfitters Posted : 5</p>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default OutfittersCard;
