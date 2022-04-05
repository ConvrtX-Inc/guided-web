import { Col, Container, Row } from "react-bootstrap";
import Payment from './Payment';
import AddNewCard from './sub-components/addNewCard';
import CreditCardList from './sub-components/cardList';
import DateField from './sub-components/dateField';
import SearchSortByField from './sub-components/searchSortByField';
import './SubPaymentScreen.scss';



const SubPaymentScreen = () => {
  return (
    <Container>
      <Row className="mt-5 ms-3 payment-content-header">
        <Col><h2>Payment & Transaction History</h2></Col>
        <Col>
            <AddNewCard cls={'add-new-card-position'} />
        </Col>
      </Row>
      <Row className="mt-5 ms-3">
        <CreditCardList />
      </Row>
      <Row className="mt-5 ms-3">
        <button className='download-csv-button'> Download CSV</button>
      </Row>
      <Row className="mt-5 ms-3">
        <div className='date-filters inline-display'>
          <DateField placeholder={'Set Start Date'} />
          <DateField placeholder={'Set End Date'} />
        </div>
        <div className='sorting-filters inline-display'>
          <SearchSortByField />
        </div>
      </Row>
      <Payment />
    </Container>
  );
};

export default SubPaymentScreen;
