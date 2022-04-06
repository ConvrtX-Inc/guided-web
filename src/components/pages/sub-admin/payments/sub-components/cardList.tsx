import { Col, Row } from "react-bootstrap";
interface ICreditCardList {
  showRemoveCardModal: any;
}

const creditCardList = ({ showRemoveCardModal }: ICreditCardList) => {
  return (
    <Row className='ms-3 credit-card-list-rows'>
    	<Col>
        <div className='credit-card-div'>
          <img src='card.png' alt={''} />
          <button
            className='credit-card-close-btn'
            onClick={showRemoveCardModal}
          >
            X
          </button>
        </div>
      </Col>
      <Col>
      	<div className='credit-card-div'>
          <img  src='card.png' alt={''} />
          <button
            className='credit-card-close-btn'
            onClick={showRemoveCardModal}
          >
            X
          </button>
        </div>
      </Col>
      <Col>
      	<div className='credit-card-div'>
        	<img src='card.png' alt={''} />
          <button
            className='credit-card-close-btn'
            onClick={showRemoveCardModal}
          >
            X
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default creditCardList;
