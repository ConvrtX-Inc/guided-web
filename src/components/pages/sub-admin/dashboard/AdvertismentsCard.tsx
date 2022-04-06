import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
const AdvertismentsCard = () => {
  return (
    <Col className="col-3 mt-4">
      <Card>
        <Card.Body>
          <h5 className="card-title text-center mb-3">Advertistments</h5>
          <p className="card-text text-center">
            Total Ad Views :<span>23</span>
          </p>
          <p className="card-text text-center">Total Ad Posted : 10</p>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default AdvertismentsCard;
