import blackPlatinum from '../../../../../assets/images/cards/black_platinum.png';
import purplePlatinum from '../../../../../assets/images/cards/purple_platinum.png';
import bluePlatinum from '../../../../../assets/images/cards/blue_platinum.png';

import { Col, Row } from "react-bootstrap";
interface ICreditCardList {
  showRemoveCardModal: any;
}

const creditCardList = ({ showRemoveCardModal }: ICreditCardList) => {
  return (
    <Row className='credit-card-list-rows'>
      <Col xs={3}>
        <div className='credit-card-div'>
          <img src={blackPlatinum} alt={''} />
        </div>
      </Col>
      <Col xs={3}>
      	<div className='credit-card-div'>
          <img src={purplePlatinum} alt={''} />
        </div>
      </Col>
      <Col xs={3}>
        <div className='credit-card-div'>
          <img src={bluePlatinum} alt={''} />
        </div>
      </Col>
    </Row>
  );
};

export default creditCardList;
