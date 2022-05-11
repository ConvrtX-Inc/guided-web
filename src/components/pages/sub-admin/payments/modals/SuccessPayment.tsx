import { Col, Container, Row } from "react-bootstrap";
import { useState } from 'react';
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import checkComplete from '../../../../../assets/images/check-complete.png';

interface IModal {
    message: string
}

const SuccessPayment = ({ message }: IModal) => {
    const [show, setShow] = useState(true);
    const handleShow = () => setShow(false);

    return (
        <Modal show={show} onHide={handleShow}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="col-8">
                        <label className="sub-payment-modal-label">{message}</label>
                    </Col>
                    <Card className="col-10 sub-payment-modal-card ">
                        <Card.Body className="sub-payment-modal-card-body">
                                <Row className="mt-2">
                                    <Col className="col-sm-2 sub-payment-modal-card-image-check">
                                    <Image src={checkComplete} alt="" />
                                    </Col>
                                </Row>
                            <Col className='top-line-border mt-5'> </Col>
                            <Col className="mt-3">
                                <label className='label-text'>Company</label>
                                <p><b>Payment For Any Type Of Post</b></p>
                            </Col>
                            <Col className="mt-3">
                                <label className='label-text'>Transaction  number</label>
                                <p><b>00123389239</b></p>
                            </Col>
                            </Card.Body>
                        </Card>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default SuccessPayment;
