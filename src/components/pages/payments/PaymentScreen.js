import {
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Navbar,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useState } from "react";
import search from "../../../assets/admin/search.png";
import x_red from "../../../assets/admin/x-red.png";
import check_white from "../../../assets/admin/check-white.png";
import "./PaymentsScreen.scss";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { mockPayments } from "./MockData";
import PaymentItemsAdmin from "./PaymentItemsAdmin";

var items = mockPayments;

const PaymentScreen = () => {
  const [paymentItem, setPaymentItem] = useState(items);
  const rowsPerPage = [5, 10];
  const [userRowsPerPage, setUserRowsPerPage] = useState(5);
  const [userPageNumber, setUserPageNumber] = useState(5);

  const [pageCount, setPageCount] = useState(0);
  const [totalPerPage, setTotalPerPage] = useState(0);
  const [totalCount, setTotalCount] = useState(paymentItem.length);

  const [isLoading, setIsLoading] = useState(false);
  const [remountComponent, setRemountComponent] = useState(0);

  const handlePageClick = async ({ selected }) => {
    setUserPageNumber(selected + 1);
    let start = 0;
    let end = 0;
    if (totalCount > 0) {
      start = userPageNumber;
    }
    if (totalCount - pageCount >= start) {
      end = userPageNumber + pageCount;
    } else {
      end = totalCount;
    }
    console.log(start, "-", end);
  };

  return (
    <Container className="sub-payment-container">
      <Row className="mt-5">
        <Col sm="auto">
          <h2>Payments</h2>
        </Col>

        <Col>
          <Navbar fluid>
            <Col fluid></Col>
            <Col sm="auto">
              <Form className="d-flex">
                <InputGroup className="input-group-1">
                  <InputGroup.Text>
                    <Image src={search} alt="" />
                  </InputGroup.Text>
                  <Form.Control
                    className="input-search"
                    type="text"
                    placeholder="Search"
                  />
                </InputGroup>
              </Form>
            </Col>
            <Col sm="auto">
              <Link to="." className="btn btn-approve-all">
                <Image className="me-1" src={check_white} alt="" /> Approved All
              </Link>
            </Col>
            <Col sm="auto">
              <Link to="." className="btn btn-reject-all">
                <Image className="me-1" src={x_red} alt="" /> Reject All
              </Link>
            </Col>
          </Navbar>
        </Col>
      </Row>
      <Row className="post-items">
        <Col>
          <Table responsive="sm" borderless className="mt-4 post-table">
            <thead>
              <tr>
                <th className="p-3 text-center">
                  {" "}
                  <input type="checkbox" id="AllPayment" />
                </th>
                <th className="p-3 text-center">Name</th>
                <th className="p-3 text-center">Organization Name</th>
                <th className="p-3 text-center">Organization Type</th>
                <th className="p-3 text-center">From Date</th>
                <th className="p-3 text-center">To Date</th>
                <th className="p-3 text-center">Amount Paid</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Post</th>
              </tr>
            </thead>
            {isLoading && (
              <tbody>
                <tr>
                  <td colSpan={5} className="pb-5">
                    <Spinner />
                  </td>
                </tr>
              </tbody>
            )}
            {!isLoading && <PaymentItemsAdmin items={paymentItem} />}
          </Table>
        </Col>
      </Row>
      <Row>
        <Col className="col-10">
          <div className="row justify-content-end pagination-info">
            <label
              htmlFor="SelectRowsPerPage"
              className="float-end col-2 col-form-label"
            >
              Rows per page:
            </label>
            <div className="col-1">
              <select
                id="SelectRowsPerPage"
                className="select-rows-per-page form-select mt-1"
                aria-label="Default select example"
                //onChange={(e) => HandleSelectRowsPerPage(e)}
              >
                {rowsPerPage.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <label className="col-2 col-form-label">
              1-{totalPerPage} of {totalCount}
            </label>
          </div>
        </Col>
        <Col key={remountComponent} className="col-2">
          <nav aria-label="..." className="Page navigation example">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              marginPagesDisplayed={2}
              pageRangeDisplayed={6}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              pageCount={2}
              //onPageChange={handlePageClick}
              containerClassName={"pagination"}
              //previousLinkClassName={"previousBttn"}
              previousLinkClassName={"prevButton page-link"}
              //nextLinkClassName={"nextBttn"}
              nextLinkClassName={"nxtButton page-link ms-2"}
              disabledClassName={"disabled"}
              className={"pagination"}
              //subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </nav>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentScreen;
