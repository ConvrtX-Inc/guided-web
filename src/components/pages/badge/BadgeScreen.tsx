import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import BadgeItems from "./BadgeItems";

import search from "../../../assets/admin/search.png";
import down from "../../../assets/admin/down.png";
import filter from "../../../assets/admin/filter.png";
import create_badge from "../../../assets/admin/create-badge.png";

import "./BadgeScreen.scss";
import Spinner from "../../ui/Spinner";
import BadgeService from "../../../services/badge/Badge.Service";
import ReactPaginate from "react-paginate";
//import { Badge } from "../../../shared/interfaces/Badge.interface";

const BadgeScreen = () => {
  const [data, setData] = useState([] as any[]);
  const [isPending, setisPending] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const rowsPerPage = [5, 10];
  const [pageCount, setPageCount] = useState(0);
  //const [userPageNumber, setUserPageNumber] = useState(5);
  const [remountComponent, setRemountComponent] = useState(0);
  const [userRowsPerPage, setUserRowsPerPage] = useState(5);
  const [totalPerPage, setTotalPerPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const handlePageClick = async ({ selected }: { selected: any }) => {
    //console.log(selected + 1);
    loadData(selected + 1, userRowsPerPage);
    //setUserPageNumber(selected + 1);
  };

  const HandleSelectRowsPerPage = (e: any) => {
    setUserRowsPerPage(e.target.value);
    setRemountComponent(Math.random());
  };

  const onSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
  };

  const onClickFilter = async (e: any) => {
    e.preventDefault();
    if (!searchTerm) {
      loadData();
    } else {
      try {
        setisPending(true);
        await BadgeService.filterData({
          badge_name: searchTerm,
        }).then(
          (res) => {
            //setDataWithImg(res.data);
            setData(res.data);
            setisPending(false);
          },
          (error) => {
            setisPending(false);
          }
        );
      } catch (err) {
        console.log(err);
        setisPending(false);
      }
    }
  };

  /*const bufferToBase64 = (buffer: any) => {
    const b64 = Buffer.from(buffer, "base64");
    return b64;
  };*/

  //const setDataWithImg = useCallback(async (badges: Badge[]) => {
  //  let badgeWithImg: Badge[] = [];

  //const base64Flag = "data:image/png;base64,";

  //   await Promise.all(
  //     badges.map(async (badge: any) => {
  //console.log(badge);
  //console.log(badge.img_icon.data);

  //const img64 = bufferToBase64(badge.img_icon.data);
  //console.log(img64)

  //badge.img64 = `${base64Flag}${img64}`;
  //console.log(badge.img64);

  /*comment conversion
        //const imgBuffer = badge.img_icon.data;
        //console.log(imgBuffer);

        const base64Flag = "data:image/png;base64,";
        //const imgBase64 = bufferToBase64(imgBuffer);
        //console.log(imgBase64);

        //badge.imgBase64 = `${base64Flag}${imgBase64}`;
        //console.log(badge.imgBase64); end comment conversion*/

  //badge.imgBase64 = `${base64Flag}${badge.img_icon}`;
  //      badge.imgBase64 = null;
  //      badgeWithImg.push(badge);
  //console.log(badgeWithImg);
  //    })
  //  );

  //  setData(badgeWithImg);
  //}, []);

  const loadData = useCallback(
    async (pageNumber?: number, limit?: number) => {
      try {
        setisPending(true);
        await BadgeService.loadDataPagination(
          limit || userRowsPerPage,
          pageNumber || 1
        ).then(
          (res) => {
            let result = res.data;
            //console.log(result);
            setPageCount(result.pageCount);
            setTotalPerPage(result.data.length);
            setTotalCount(result.total);
            setData(result.data);
            setisPending(false);
          },
          (error) => {
            setisPending(false);
          }
        );
      } catch (err) {
        console.log(err);
        setisPending(false);
      }
    },
    [setData, userRowsPerPage]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Container className="badge-container">
      <Row className="mt-5">
        <Col>
          <h2>Badge Management</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Navbar expand="lg">
            <Container fluid>
              <Nav>
                <NavLink
                  to="/badge/create"
                  className="btn btn-light btn-create-badge pt-2"
                >
                  <Image className="pe-2" src={create_badge} alt="" />
                  Create Badge
                </NavLink>
              </Nav>
              <Form className="d-flex" onSubmit={(e) => onSubmit(e)}>
                <InputGroup className="input-group-1 me-2">
                  <InputGroup.Text>
                    <Image src={search} alt="" />
                  </InputGroup.Text>
                  <Form.Control
                    className="input-search"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => onSearchChange(e)}
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
                <Button
                  //to="/become-guide/filter"
                  className="btn btn-light btn-filter"
                  onClick={(e) => onClickFilter(e)}
                >
                  <Image src={filter} alt="" /> Filter
                </Button>
              </Form>
            </Container>
          </Navbar>
        </Col>
      </Row>
      <Row className="badge-items">
        {!isPending && <BadgeItems items={data} />}
        {isPending && <Spinner />}
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

export default BadgeScreen;
