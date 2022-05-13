import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";

import search from "../../../assets/admin/search.png";
import down from "../../../assets/admin/down.png";
import filter from "../../../assets/admin/filter.png";
import create_badge from "../../../assets/admin/create-badge.png";

import "./GuidesAndOutfittersScreen.scss";
import { useCallback, useEffect, useState } from "react";
import GuidesServices from "../../../services/guides/Guides.Service";
import Spinner from "../../ui/Spinner";
import SubAdminItems from "./SubAdminItems";
import ReactPaginate from "react-paginate";

const GuidesAndOutfittersScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([] as any[]);

  const rowsPerPage = [5, 10];
  const [pageCount, setPageCount] = useState(0);
  const [remountComponent, setRemountComponent] = useState(0);
  const [userRowsPerPage, setUserRowsPerPage] = useState(5);
  const [totalPerPage, setTotalPerPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const handlePageClick = async ({ selected }: { selected: any }) => {
    getSubAdminUsers(false, selected + 1, userRowsPerPage);
  };

  const HandleSelectRowsPerPage = (e: any) => {
    setUserRowsPerPage(e.target.value);
    setRemountComponent(Math.random());
  };

  const getSubAdminUsers = useCallback(
    async (cancel?: boolean, pageNumber?: number, limit?: number) => {
      setIsLoading(true);
      try {
        await GuidesServices.getSubAdminUsers(
          limit || userRowsPerPage,
          pageNumber || 1
        ).then(
          (res) => {
            let result = res.data;
            console.log(result);
            if (cancel) return;
            setPageCount(result.last_page);
            setTotalPerPage(result.data.length);
            setTotalCount(result.total);
            setUsers(result.data);
            setIsLoading(false);
          },
          (err) => {
            if (cancel) return;
            setIsLoading(false);
          }
        );
      } catch (err) {
        console.log("getSubAdminUsers: ", err);
        setIsLoading(false);
      }
    },
    [userRowsPerPage]
  );

  useEffect(() => {
    let cancel = false;
    getSubAdminUsers(cancel);
    return () => {
      cancel = true;
    };
  }, [getSubAdminUsers]);
  return (
    <Container className="guidesoutfitters-container">
      <Row className="mt-5">
        <Col>
          <h2>Guides & Partners</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Navbar expand="lg">
            <Container fluid>
              <Nav>
                <NavLink
                  to="/guides/create"
                  className="btn btn-light btn-create-subadmin pt-2"
                >
                  <Image className="pe-2" src={create_badge} alt="" />
                  Create sub admin
                </NavLink>
              </Nav>
              <Form className="d-flex">
                <InputGroup className="input-group-1 me-2">
                  <InputGroup.Text>
                    <Image src={search} alt="" />
                  </InputGroup.Text>
                  <Form.Control
                    className="input-search"
                    type="text"
                    placeholder="Search"
                  />
                </InputGroup>
                <InputGroup className="input-group-2 me-2">
                  <Form.Select className="custom-select">
                    <option>Sort by</option>
                  </Form.Select>
                  <InputGroup.Text>
                    <Image src={down} alt="" />
                  </InputGroup.Text>
                </InputGroup>
                <Button className="btn btn-light btn-filter">
                  <Image src={filter} alt="" /> Filter
                </Button>
              </Form>
            </Container>
          </Navbar>
        </Col>
      </Row>
      <Row className="badge-items">
        <Col>
          <Table responsive borderless className="mt-4 table-subadmin">
            <thead>
              <tr>
                <th className="col-2 p-4">Sub admins</th>
                <th className="col-2 p-4 text-center">Organization name</th>
                <th className="col-2 p-4 text-center">Organization type</th>
                <th className="p-4 text-center">1% Group</th>
                <th className="p-4 text-center">Loging details</th>
                <th className="p-4 text-center">Active</th>
              </tr>
            </thead>
            {isLoading && (
              <tbody>
                <tr>
                  <td colSpan={6} className="pb-5">
                    <Spinner />
                  </td>
                </tr>
              </tbody>
            )}
            {!isLoading && <SubAdminItems items={users} />}
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
                onChange={(e) => HandleSelectRowsPerPage(e)}
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
              pageCount={pageCount}
              onPageChange={handlePageClick}
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
export default GuidesAndOutfittersScreen;
