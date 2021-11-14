
import './guide.scss';

//import { Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import Navbar from 'react-bootstrap/Navbar'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { NavLink, Switch, Route } from 'react-router-dom';

const NavGuide =()=>{
    return(
        <Navbar>
            <Form className="container-fluid justify-content-start">
                <NavLink to="/guide/see-all" activeClassName='active' className="btn btn-light btn-guide me-2">See All</NavLink>
                <NavLink to="/guide/approved" activeClassName='active' className="btn btn-light btn-guide me-2">Approved</NavLink>
                <NavLink to="/guide/pending" activeClassName='active' className="btn btn-light btn-guide me-2">Pending</NavLink>
                <NavLink to="/guide/rejected" activeClassName='active' className="btn btn-light btn-guide me-2">Rejected</NavLink>
            </Form>
        </Navbar>
    )
}

const GuideSeeAll = ()=> {
    return (
        <NavGuide />
    );
}

const GuideApproved = ()=> {
    return (
        <NavGuide />
    );
}

const GuidePending = ()=> {
    return (
        <NavGuide />
    );
}

const GuideRejected = ()=> {
    return (
        <NavGuide />
    );
}

const BecomeGuide = () =>{
    return (
        
        <Container>
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
                    <Route exact path="/guide/see-all" component={GuideSeeAll} />
                    <Route exact path="/guide/approved" component={GuideApproved} />
                    <Route exact path="/guide/pending" component={GuidePending} />
                    <Route exact path="/guide/rejected" component={GuideRejected} />
                </Switch>
                
            </Row>
        </Container>
    )
}

export default BecomeGuide;