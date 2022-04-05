import { Col, Row } from "react-bootstrap";

const creditCardList = () => {
  return (
    <Row className='ms-3 credit-card-list-rows'>
    	<Col>
        <div className='credit-card-div'>
          <img src='card.png' alt={''} />
        </div>
      </Col>
      <Col>
      	<div className='credit-card-div'>
          <img  src='card.png' alt={''} />
        </div>
      </Col>
      <Col>
      	<div className='credit-card-div'>
        	<img src='card.png' alt={''} />
        </div>
      </Col>
    </Row>
  );
};

export default creditCardList;
