import { Col, Row } from "react-bootstrap";
interface ICreditCardList {
  showRemoveCardModal: any;
}

const creditCardList = ({ showRemoveCardModal }: ICreditCardList) => {
  return (
    <Row className='credit-card-list-rows'>
      <Col xs={3}>
        <div className='credit-card-div'>
          <img src='cards/black_platinum.png' alt={''} />
        </div>
      </Col>
      <Col xs={3}>
      	<div className='credit-card-div'>
          <img src='cards/purple_platinum.png' alt={''} />
        </div>
      </Col>
      <Col xs={3}>
        <div className='credit-card-div'>
          <img src='cards/blue_platinum.png' alt={''} />
        </div>
      </Col>
    </Row>
  );
};

export default creditCardList;
