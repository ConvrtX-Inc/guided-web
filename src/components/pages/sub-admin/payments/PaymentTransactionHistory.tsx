import { Col, Container, Row } from "react-bootstrap";
import AddNewCard from './sub-components/addNewCard';
import CreditCardList from './sub-components/cardList';
import DateField from './sub-components/dateField';
import SearchSortByField from './sub-components/searchSortByField';
import TransactionHistory from './sub-components/transactionHistoryTable';

interface ISubPaymentScreen {
  showPaymentPage: any;
  showAddCardModal: any;
  showRemoveCardModal: any;
}

const SubPaymentScreen = ({
  showPaymentPage,
  showAddCardModal,
  showRemoveCardModal
}: ISubPaymentScreen) => {
  const next = '>';
  const prev = '<';

  return (
    <Container>
      <Row className="mt-5 ms-3">
        <Col><h2>Payment & Transaction History</h2></Col>
      </Row>
      <Row className="mt-5 ms-3 payment-content-header">
        <Col>
          <button className='pending-payments-button'> Pending Payments </button>
          <button
            className='payments-button'
            onClick={showPaymentPage}
          >
            Payments
          </button>
        </Col>
        <Col>
            <AddNewCard
              cls={'add-new-card-position'}
              showAddCardModal={showAddCardModal}
            />
        </Col>
      </Row>
      <Row className="mt-5 ms-3">
        <CreditCardList showRemoveCardModal={showRemoveCardModal} />
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
      <Row className="mt-5 ms-3 payment-transaction-history-table">
        <Row className=" ms-2 payment-transaction-history-table-row">
          <Col className='ms-3'> <label className='payment-transaction-history-table-headers'> Transaction Number </label></Col>
          <Col className='ms-3'> <label className='payment-transaction-history-table-headers'> Date Posted </label></Col>
          <Col className='ms-3'> <label className='payment-transaction-history-table-headers'> Type of Post </label></Col>
          <Col className='ms-3'> <label className='payment-transaction-history-table-headers'> Amount </label></Col>
          <Col className='ms-3'> <label className='payment-transaction-history-table-headers'> Status </label></Col>
        </Row>
        <TransactionHistory />
        <TransactionHistory />
        <TransactionHistory />
        <TransactionHistory />
      </Row>
      <Row className="mt-5 ms-3">
        <div className='page-nav-field'>
          <div className='page-nav'>
            <div className='inline-display'>
              <label>Rows Per Page:</label>
              <select name="number">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className='inline-display'>
              <label>1-6 of 150</label>
              <button>
                <label>{prev}</label>
              </button>
              <button>
                <label>{next}</label>
              </button>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default SubPaymentScreen;
