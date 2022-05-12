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
      <Col className="col-md-4 col-lg-4">
        <img src={blackPlatinum} className="img-fluid" alt="image" />
      </Col>
      <Col className="col-md-4 col-lg-4">
        <img src={purplePlatinum} className="img-fluid" alt="image" />
      </Col>
      <Col className="col-md-4 col-lg-4">
        <img src={bluePlatinum} className="img-fluid" alt="image" />
      </Col>
    </Row>
  );
};

export default creditCardList;
