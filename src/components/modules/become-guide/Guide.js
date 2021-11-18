
import './Guide.scss';

import check from '../../../assets/admin/check.png';
import filter from '../../../assets/admin/filter.png';
import right from '../../../assets/admin/right.png';
import left from '../../../assets/admin/left2.png';
import search from '../../../assets/admin/search.png';
import down from '../../../assets/admin/down.png';

//import { Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { NavLink, Route,Switch } from 'react-router-dom';
import Table  from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';

//Guide module -navigation
const NavGuide =()=>{
    return(
        <Navbar>
            <Form className="container-fluid justify-content-start">
                <NavLink to="/admin/become-guide/all" activeClassName='active' className="btn btn-light btn-guide me-2">See All</NavLink>
                <NavLink to="/admin/become-guide/approved" activeClassName='active' className="btn btn-light btn-guide me-2">Approved</NavLink>
                <NavLink to="/admin/become-guide/pending" activeClassName='active' className="btn btn-light btn-guide me-2">Pending</NavLink>
                <NavLink to="/admin/become-guide/rejected" activeClassName='active' className="btn btn-light btn-guide me-2">Rejected</NavLink>
                <InputGroup className="input-group-1 me-2">
                    <InputGroup.Text><Image src={search} alt="" /></InputGroup.Text>
                    <Form.Control className="input-search" type="text" placeholder="Search" />
                </InputGroup>
                <InputGroup className="input-group-2 me-2">
                    <Form.Select className="custom-select">
                        <option>Sort by</option>
                    </Form.Select>
                    <InputGroup.Text><Image src={down} alt="" /></InputGroup.Text>
                </InputGroup>
                <NavLink to="/admin/become-guide/filter" activeClassName='active' className="btn btn-light btn-filter"><Image src={filter} alt="" /> Filter</NavLink>
            </Form>
        </Navbar>
    )
}

const GuideSeeAll = ()=>{
    return (
        <Col>
            <Table borderless className="mt-4">
                <thead>
                    <tr>
                        <th>Application Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Application</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark Chen</td>
                        <td>mark@gmail.com</td>
                        <td> +1 467 474 9303</td>
                        <td>
                            <Button className="btn-view-application">View Application</Button>
                        </td>
                        <td><Button className="btn-approve"><Image src={check} alt="" /> Approve</Button><Button className="m-1 btn-reject">Reject</Button></td>
                    </tr>
                    <tr>
                        <td>Mark Chen</td>
                        <td>mark@gmail.com</td>
                        <td> +1 467 474 9303</td>
                        <td><Button className="btn-view-application">View Application</Button></td>
                        <td><Button className="btn-approve"><Image src={check} alt="" /> Approve</Button><Button className="m-1 btn-reject">Reject</Button></td>
                    </tr>
                    <tr>
                        <td>Mark Chen</td>
                        <td>mark@gmail.com</td>
                        <td> +1 467 474 9303</td>
                        <td><Button className="btn-view-application">View Application</Button></td>
                        <td><Button className="btn-approve"><Image src={check} alt="" /> Approve</Button><Button className="m-1 btn-reject">Reject</Button></td>
                    </tr>
                    <tr>
                        <td>Mark Chen</td>
                        <td>mark@gmail.com</td>
                        <td> +1 467 474 9303</td>
                        <td><Button className="btn-view-application">View Application</Button></td>
                        <td><Button className="btn-approve"><Image src={check} alt="" /> Approve</Button><Button className="m-1 btn-reject">Reject</Button></td>
                    </tr>
                    <tr>
                        <td>Mark Chen</td>
                        <td>mark@gmail.com</td>
                        <td> +1 467 474 9303</td>
                        <td><Button className="btn-view-application">View Application</Button></td>
                        <td><Button className="btn-approve"><Image src={check} alt="" /> Approve</Button><Button className="m-1 btn-reject">Reject</Button></td>
                    </tr>
                    <tr>
                        <td>Mark Chen</td>
                        <td>mark@gmail.com</td>
                        <td> +1 467 474 9303</td>
                        <td><Button className="btn-view-application">View Application</Button></td>
                        <td><Button className="btn-approve"><Image src={check} alt="" /> Approve</Button><Button className="m-1 btn-reject">Reject</Button></td>
                    </tr>
                    <tr>
                        <td>Mark Chen</td>
                        <td>mark@gmail.com</td>
                        <td> +1 467 474 9303</td>
                        <td><Button className="btn-view-application">View Application</Button></td>
                        <td><Button className="btn-approve"><Image src={check} alt="" /> Approve</Button><Button className="m-1 btn-reject">Reject</Button></td>
                    </tr>
                    <tr>
                        <td>Mark Chen</td>
                        <td>mark@gmail.com</td>
                        <td> +1 467 474 9303</td>
                        <td><Button className="btn-view-application">View Application</Button></td>
                        <td><Button className="btn-approve"><Image src={check} alt="" /> Approve</Button><Button className="m-1 btn-reject">Reject</Button></td>
                    </tr>
                </tbody>
            </Table>
            <Navbar className="navigation justify-content-end">
                <Form.Label className="me-2 mt-2">Rows per page:</Form.Label>
                <Form.Select className="me-5">
                    <option>8</option>
                </Form.Select>
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

//const GuideSeeAll = ()=> {
//    return (
//        <div>Hello See all</div>
//    );
//}

const GuideApproved = ()=> {
    return (
        <div>Hello Approved</div>
    );
}

const GuidePending = ()=> {
    return (
        <div>Hello Pending</div>
    );
}

const GuideRejected = ()=> {
    return (
        <div>Hello Rejected</div>
    );
}

const BecomeGuide = () =>{
    return (
        
        <Container className="guide-container">
            <Row className="mt-5">
                <Col>
                    <h2>Become a Guide</h2>
                </Col>
            </Row>
            <Row>
                <NavGuide />
            </Row>
            <Row>
                <Switch>
                    <Route path="/admin/become-guide/all">
                        <GuideSeeAll />
                    </Route>
                    <Route path="/admin/become-guide/approved">
                        <GuideApproved />
                    </Route>
                    <Route path="/admin/become-guide/pending">
                        <GuidePending />
                    </Route>
                    <Route path="/admin/become-guide/rejected">
                        <GuideRejected />
                    </Route>
                </Switch>
            </Row>
        </Container>
    )
}

export default BecomeGuide;