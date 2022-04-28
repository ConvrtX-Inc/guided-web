import { Col, Container, Row } from "react-bootstrap";
import check from '../../../../assets/images/check-lg.svg';
import AddNewCard from './sub-components/addNewCard';
import CreditCardList from './sub-components/cardList';
import './Payment.scss';

interface IPayment {
  showAddCardModal: any;
  showRemoveCardModal: any;
}

const Payment = ({ showAddCardModal, showRemoveCardModal }: IPayment) => {
  return (
    <Container>
      <Row className="mt-5 ms-3">
        <Col>
          <h2>Payment</h2>
        </Col>
      </Row>
      <Row className='ms-3 mt-5'>
        <Row className='sub-payment-content-row'>
          <Col>
            <div className='sub-payment-content'>
              <Row>
                <Col><label className='label-header'>You have to pay</label></Col>
              </Row>
              <Row><Col>
                <span className='payment-dollars-1'>100.</span> <span className='payment-dollars-2'>00USD</span></Col></Row>
              <Row className='top-line-border'>
                <Col><label className='label-text'>Company</label> </Col>
                <Col><label className='label-text'>Transaction  number</label></Col>
              </Row>
              <Row>
                <Col><label className='label-name'>Company XYZ</label></Col>
                <Col><label className='label-name'>00123389239</label></Col>
              </Row>
            </div>
          </Col>
          <Col>
            <div className='pay-methods-content'>
              <label className='label'><span>Payment Methods</span></label>
              <Row className='mt-2 pay-methods-rows'>
                <Col xs={4}>
                  <div className='pay-methods-bank-cards active'>
                    <label> Bank Card </label>
                    <span className='active-check'>
                      <img className='logo-img' src={check} alt={''} />
                    </span>
                  </div>
                </Col>
                <Col>
                  <div className='pay-using-text'>
                    Pay using
                  </div>
                  <label>**** **** **** 0212</label>
                </Col>
              </Row>
              <Row className='pay-methods-rows'>
                <Col>
                  <div className='pay-methods-bank-cards'>
                    <img src='wallet/google-wallet.png' className="pay-method-bank-cards-align" />
                    <span className='active-check unactive-check'></span>
                  </div>
                </Col>
              </Row>
              <Row className='pay-methods-rows'>
                <Col>
                  <div className='pay-methods-bank-cards'>
                    <img src='wallet/apple-wallet.png' className="pay-method-bank-cards-align" />
                    <span className='active-check unactive-check'></span>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Row>
      <Col className="mt-5">
        <CreditCardList
          showRemoveCardModal={showRemoveCardModal}
        />
      </Col>
      <Row className='mt-5 ms-3'>
        <Col>
          <AddNewCard cls={''} showAddCardModal={showAddCardModal} />
        </Col>
        <Col>
          <button className='pay-button'>PAY</button>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
