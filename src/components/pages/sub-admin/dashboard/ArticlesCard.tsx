import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
const ArticlesCard = () => {
  return (
    <Col className="col-3 mt-4">
      <Card>
        <Card.Body>
          <h5 className="card-title text-center mb-3">Articles</h5>
          <p className="card-text text-center">
            Total Articles Views :<span>30</span>
          </p>
          <p className="card-text text-center">Total Articles Posted : 10</p>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default ArticlesCard;
