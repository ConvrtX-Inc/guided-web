import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import search from "../../../assets/admin/search.png";
import filter from "../../../assets/admin/filter.png";
import create_badge from "../../../assets/admin/create-badge.png";

import "./PostScreen.scss";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { UserAccess } from "../../../shared/interfaces/UserAccess.interface";
import PostItemsAdmin from "./PostItemsAdmin";
import ToastNotificationBasic from "../../ui/ToastNotificationBasic";
import PostService from "../../../services/post/Post.Service";
import { Badge } from "../../../shared/interfaces/Badge.interface";
import BadgeService from "../../../services/badge/Badge.Service";
import SelectBadge from "./SelectBadge";
import Spinner from "../../ui/Spinner";
import {
  ToastContainer, //toast
} from "react-toastify";
import ReactPaginate from "react-paginate";

interface LocationState {
  status: boolean;
  message: string;
}

const PostScreen = (props: any) => {
  const rowsPerPage = [5, 10];
  const [userRowsPerPage, setUserRowsPerPage] = useState(5);
  const [userPageNumber, setUserPageNumber] = useState(5);

  const [pageCount, setPageCount] = useState(0);
  const [totalPerPage, setTotalPerPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const isMounted = useRef(true);
  const location = useLocation();

  const authCtx = useContext(AuthContext);
  const userAccess: UserAccess = authCtx.userRole;

  const state = location.state as LocationState;
  const [access, setAccess] = useState({
    default_path: "",
  });
  //const [mainBadge, setMainBadge] = useState(null || ({} as Badge));
  const [mainBadge, setMainBadge] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [postData, setPostData] = useState([] as any[]);
  const [badgeData, setBadgeData] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(false);

  const HandleCategoryChange = (obj: any) => {
    setMainBadge(obj);
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = async () => {
    let selectedBadge: Badge = mainBadge || ({} as Badge);
    let queryString: string = "";
    if (searchTerm !== "") {
      //queryString = `filter=title||$eq||${encodeURIComponent(searchTerm)}`;
      queryString = `title=${encodeURIComponent(searchTerm)}`;
    }
    if (mainBadge) {
      if (queryString !== "") {
        queryString = `${queryString}&`;
      }
      //queryString = `${queryString}filter=main_badge_id||$eq||${selectedBadge.id}`;
      queryString = `${queryString}badge_id=${selectedBadge.id}`;
    }
    if (queryString === "") {
      loadPosts();
      return;
    } else {
      if (queryString === undefined) {
        queryString = "";
      }
      loadPosts(1, userRowsPerPage, queryString);
      return;
    }
    /*queryString = `${queryString}&user_id=||$eq||${userAccess.user_id}`;

    setIsLoading(true);
    try {
      await PostService.filterActivityPost(queryString).then(
        (res) => {
          setPostData(res.data);
          setIsLoading(false);
        },
        (err) => {
          console.log("Error in loadActivityPost: ", err);
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.log("Error loadPosts:", error);
      setIsLoading(false);
    }*/
  };

  const getUserAccess = useCallback(async () => {
    const user = userAccess;
    if (user.user_type_name === "SubAdmin") {
      if (user.is_subadmin_guide) {
        setAccess({
          default_path: `/post/article`,
        });
      } else {
        setAccess({
          default_path: `/post/activity-package`,
        });
      }
    } else if (user.user_type_name === "Admin") {
      setAccess({
        default_path: `/post/activity-package`,
      });
    }
  }, [userAccess]);

  const loadPosts = useCallback(
    async (pageNumber?: number, limit?: number, queryString?: string) => {
      setIsLoading(true);
      try {
        await PostService.loadActivityPostPagination(
          userAccess.user_id || "",
          limit || userRowsPerPage,
          pageNumber || 1,
          queryString
        ).then(
          (res) => {
            const getData = res.data;
            console.log(getData);
            setTotalCount(getData.total);
            setPageCount(getData.last_page);
            setPostData(getData.data);
            setTotalPerPage(getData.data.length);
            setIsLoading(false);
          },
          (err) => {
            console.log("Error in loadActivityPost: ", err);
            setIsLoading(false);
          }
        );
      } catch (error) {
        console.log("Error loadPosts:", error);
        setIsLoading(false);
      }
    },
    [setPostData, userAccess.user_id, userRowsPerPage]
  );

  const loadBadgeData = useCallback(async () => {
    try {
      await BadgeService.loadData().then(
        (res) => {
          setBadgeData(res.data);
          //setMainBadge(res.data[0]); //initial selected badge
          setMainBadge(null);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }, [setBadgeData]);

  const handlePageClick = async ({ selected }: { selected: any }) => {
    loadPosts(selected + 1);
    setUserPageNumber(selected + 1);
    let start: number = 0;
    let end: number = 0;
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

  const HandleSelectRowsPerPage = (e: any) => {
    loadPosts(1, e.target.value);
    setUserRowsPerPage(e.target.value);
  };

  useEffect(() => {
    if (isMounted) {
      loadPosts();
      loadBadgeData();
      getUserAccess();
    }
  }, [loadPosts, loadBadgeData, getUserAccess]);

  return (
    <Container className="sub-post-container">
      <Row className="mt-5">
        <Col>
          <h2>Posts</h2>
        </Col>
        <Col>
          {state?.status && <ToastNotificationBasic message={state?.message} />}
          <ToastContainer />
        </Col>
      </Row>
      <Row className="mt-4 create-post-row">
        <Col className="ps-5">
          <p>Filter by category</p>
        </Col>
        <Col className="d-flex flex-row-reverse">
          <Link to={access.default_path} className="btn btn-create-post me-5">
            <Image className="me-1" src={create_badge} alt="" /> Create post
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Navbar expand="lg">
            <Container fluid>
              <Nav>
                <SelectBadge
                  isClearable={true}
                  mainBadge={mainBadge}
                  badgeData={badgeData}
                  handleBadgeChange={(option: any) =>
                    HandleCategoryChange(option)
                  }
                />
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
                    value={searchTerm}
                    onChange={(e) => handleSearch(e)}
                  />
                </InputGroup>
                <Button
                  className="btn btn-light btn-filter"
                  onClick={(e) => handleFilter()}
                >
                  <Image src={filter} alt="" /> Filter
                </Button>
              </Form>
            </Container>
          </Navbar>
        </Col>
      </Row>
      <Row className="post-items">
        <Col>
          <Table responsive borderless className="mt-4 post-table">
            <thead>
              <tr>
                <th className="col-4 p-4">Title</th>
                <th className="p-4">Views</th>
                <th className="p-4">Created Date</th>
                <th className="p-4">Paid</th>
                <th className="p-4">Post</th>
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
            {!isLoading && <PostItemsAdmin items={postData} />}
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
        <Col className="col-2">
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
export default PostScreen;
