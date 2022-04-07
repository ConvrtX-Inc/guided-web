import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
const NewsFeedsCard = () => {
  return (
    <Col className="col-3 mt-4">
      <Card>
        <Card.Body>
          <h5 className="card-title text-center mb-3">Newsfeeds</h5>
          <p className="card-text text-center">
            Total Newsfeeds Views : <span>31</span>
          </p>
          <p className="card-text text-center">Total Newsfeeds Posted : 5</p>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default NewsFeedsCard;
