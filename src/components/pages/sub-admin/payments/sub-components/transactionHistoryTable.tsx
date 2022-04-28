import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import right from "../../../../../assets/admin/right.png";
import left from "../../../../../assets/admin/left2.png";

const transactionHistory = (props: any) => {
  const displayTransactions = props.items.map((transactionItems: any) => (
    <tr key={transactionItems.id}>
      <td className="p-4 guided-sub-payment-table-td">{transactionItems.transaction_number}</td>
      <td className="p-4 guided-sub-payment-table-td">{String(transactionItems.created_date).substring(0, 10)}</td>
      <td className="p-4 guided-sub-payment-table-td">{transactionItems.service_name}</td>
      <td className="p-4 guided-sub-payment-table-td">{transactionItems.total}</td>
      <td className="p-4 guided-sub-payment-table-td">{transactionItems.status_id}</td>
    </tr>
  ));
  return (
    <Col>
      <Table responsive borderless className="mt-4 post-table">
        <thead>
          <tr>
            <th className="col-4 p-4">Transaction Number</th>
            <th className="p-4">Date Posted</th>
            <th className="p-4">Type Of Post</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {props.items.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No data
              </td>
            </tr>
          )}
          {props.items.length > 0 && displayTransactions}
        </tbody>
      </Table>
      <Navbar className="navigation justify-content-end">
        <Form.Label className="me-2 mt-2">Rows per page:</Form.Label>
        <Col xs={1}>
        <Form.Select className="me-1">
          <option>8</option>
          </Form.Select>
        </Col>
        <Form.Label className="ms-5 mt-2 me-2">1-8 of 150:</Form.Label>
        <Button className="btn btn-light me-1">
          <Image src={left} alt="" />
        </Button>
        <Button className="btn btn-light me-4">
          <Image src={right} alt="" />
        </Button>
      </Navbar>
    </Col>
  );
}

export default transactionHistory;
