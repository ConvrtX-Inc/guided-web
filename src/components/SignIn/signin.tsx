import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import './signin.scss';

import image from '../../assets/images/image.png';
import signin from '../../assets/images/signin.png';
import logo from '../../assets/images/logo.png';

const ImageSection = () => {
    return (
        <Container>
            <Row className="img-wrapper">
                <div>
                    <Image src={logo} alt="Guided Logo" />
                </div>
                <Image src={signin} alt="Guided Signin to Sub Admin Portal" />
                <Image src={image} alt="Guided" />
            </Row>
        </Container>
    )
}

const LoginFormSection = () => {
    return (
        <div className="login-form col-sm-12 col-md">
            <Form>
                <h2>Sign in</h2>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Control type="email" placeholder="Username"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Control type="password" placeholder="Password"></Form.Control>
                </Form.Group>
                <Link to={{
                    pathname: '/change-pwd'}}>
                    Forget password?
                </Link>
                <Button className="login-btn mt-3" type="submit">Sign In</Button>
            </Form>
        </div>
    )
}

const SignIn = () => {
    return (
        <Container className="signin-wrapper">
            <Row>
                <Col className="d-flex justify-content-center align-items-center">
                    <ImageSection />
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <LoginFormSection />
                </Col>
            </Row>
        </Container>
    )
}

export default SignIn