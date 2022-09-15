import search from "../../../assets/admin/search.png";
import down from "../../../assets/admin/down.png";
import filter from "../../../assets/admin/filter.png";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import UserTable from './UserTable';
import { useEffect, useState } from "react";

import SpinnerSmall from "../../ui/SpinnerSmall";
import UserService from "../../../services/users/User.Service";
import {Paginator} from "../../helper/Paginator";

const UserNavigation = () => {
    const [UserData, setUserData] = useState([] as any[]);
    const [flagCntAllUsers, setflagCntAllUsers] = useState(true);
    const [cntAllUsers, setCntAllUsers] = useState(0);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [currentPage, setCurentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const loadEndUser = async () => {
        try {
            await UserService.getUsers(itemPerPage, (currentPage * itemPerPage), currentPage).then(
                (res) => {
                    setUserData(res.data);
                    setCntAllUsers(res.data.length);
                    setflagCntAllUsers(false);
                    setPageCount(res.data.pageCount);
                    setTotalItems(res.data.total);
                },
                (error) => {
                    setflagCntAllUsers(false);
                }
            );
        } catch (err) {
            console.log(err);
            setflagCntAllUsers(false);
        }
    };

    useEffect(() => {
        loadEndUser();
    }, [itemPerPage, currentPage]);

    return (
        <Container className="sub-post-container">
            <Row>
                <Col>
                    <Navbar expand="lg">
                        <Container fluid>
                            <Nav>
                                <Col className="col-md-12">
                                    {!flagCntAllUsers &&
                                        <h4>
                                            {cntAllUsers + " " + "End Users"}
                                        </h4>
                                    }
                                    {flagCntAllUsers && <SpinnerSmall />}

                                </Col>
                            </Nav>

                            <Form className="d-flex">
                                <InputGroup className="me-2">
                                    <InputGroup.Text className="user-search-image">
                                        <Image src={search} alt="" />
                                    </InputGroup.Text>
                                    <Form.Control
                                        className="user-search-input"
                                        type="text"
                                        placeholder="Search"
                                    />
                                </InputGroup>
                                <InputGroup className="user-input-group-2 me-2">
                                    <Form.Select className="custom-select">
                                        <option>Sort by</option>
                                    </Form.Select>
                                    <InputGroup.Text className="user-sort-text">
                                        <Image src={down} alt="" className="user-sort-icon" />
                                    </InputGroup.Text>
                                </InputGroup>
                                <NavLink
                                    to="/become-guide/filter"
                                    //activeClassName="active"
                                    className="btn btn-light btn-filter user-button-filter"
                                >
                                    <Image src={filter} alt="" /> Filter
                                </NavLink>
                            </Form>
                        </Container>
                    </Navbar>
                </Col>
            </Row>
            <Row className="post-items">
                <UserTable
                    items={UserData}
                    PaginatorComponent={
                        <Paginator
                            itemPerPage={itemPerPage}
                            currentPage={currentPage}
                            pageCount={pageCount}
                            totalItems={totalItems}
                            setItemPerPage={setItemPerPage}
                            setCurentPage={setCurentPage}
                        />
                    }
                />
            </Row>
        </Container>
    );
};

export default UserNavigation;
