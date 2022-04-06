import { Col, Row } from "react-bootstrap";

const transactionHistory = () => {
  return (
    <Row className=" ms-2 payment-transaction-history-table-row">
      <Col className='ms-3'> <label className='payment-transaction-history-table-values'> 00123389239 </label></Col>
      <Col className='ms-3'> <label className='payment-transaction-history-table-values'> 12/10/2021 </label></Col>
      <Col className='ms-3'> <label className='payment-transaction-history-table-values'> Event </label></Col>
      <Col className='ms-3'> <label className='payment-transaction-history-table-values table-value-amount'> $100 </label></Col>
      <Col className='ms-3'> <label className='payment-transaction-history-table-values table-value-status-accept'> Approved </label></Col>
    </Row>
  );
}

export default transactionHistory;