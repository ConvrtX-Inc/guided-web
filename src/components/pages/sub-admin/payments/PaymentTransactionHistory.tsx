import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddNewCard from './sub-components/addNewCard';
import CreditCardList from './sub-components/cardList';
import DateField from './sub-components/dateField';
import SearchSortByField from './sub-components/searchSortByField';
import TransactionHistory from './sub-components/transactionHistoryTable';
import { useLocation } from "react-router-dom";
import ModalSuccess from "./modals/SuccessPayment";

import TransactionsService from "../../../../services/transaction-history/TrasanctionHistory.Service";

interface ISubPaymentScreen {
  showAddCardModal: any;
  showRemoveCardModal: any;
  status: boolean;
  message: string;
}

const SubPaymentScreen = ({
  showAddCardModal,
  showRemoveCardModal
}: ISubPaymentScreen) => {
  const location = useLocation();
  const [TransactionHistoryData, setTransactionHistoryData] = useState([] as any[]);
  const state = location.state as ISubPaymentScreen;

  const loadTransactionHistory = async () => {
    try {
      await TransactionsService.getTransactions().then(
        (res) => {
          setTransactionHistoryData(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTransactionHistory();
  }, []);

  return (
    <Container>
      <Row className="mt-5 ms-3">
        <Col><h2>Payment & Transaction History</h2></Col>
      </Row>
      <Row className="mt-5 ms-3 payment-content-header">
        <Col className="col">
          <button className='pending-payments-button'>Pending Payments</button>
          </Col>
        <Col className="col">
          <Link
            to={`/payment/create`}
            className="btn payments-button"
          >
          <span className='sub-payment-button'>
            Payments
            </span>
          </Link>
        </Col>
        <Col className="col"></Col>
        <Col className="col"></Col>
        <Col className="col">
          <AddNewCard
            cls={'add-new-card-position'}
            showAddCardModal={showAddCardModal}
          />
        </Col>
      </Row>
      <Col>
        {state?.status && <ModalSuccess message={state?.message} />}
      </Col>
      <Row className="mt-5">
        <CreditCardList showRemoveCardModal={showRemoveCardModal} />
      </Row>
      <Row className="mt-5 ms-3">
        <Col className="ms-3">
          <button className='download-csv-button'> Download CSV</button>
        </Col>
      </Row>
      <Row className="ms-3">
        <Col className="col-sm-3">
          <DateField placeholder={'Set Start Date'} name={'start_date'} />
        </Col>
        <Col className="col-sm-3">
          <DateField placeholder={'End Date'} name={'end_date'} />
        </Col>
        <Col className="col-sm-6">
          <SearchSortByField />
        </Col>
      </Row>
      <Row className="mt-5 ms-3 payment-transaction-history-table">
        <TransactionHistory items={TransactionHistoryData} />
      </Row>
    </Container>
  );
};

export default SubPaymentScreen;
