import "./UserScreen.scss";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import UserNavigation from "./UserNavigation";
import { Outlet } from "react-router-dom";

const UserScreen = () => {
    return (
        <Container className="user-container">
            <Row className="mt-5">
                <Col>
                    <h2>End Users</h2>
                </Col>
            </Row>
            <Row className="mt-4">
                <UserNavigation />
            </Row>
            <Row>
                <Outlet />
            </Row>
        </Container>
    );
};

export default UserScreen;
