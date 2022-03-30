import { Container, Row, Col } from "react-bootstrap";
import "./SubSupport.scss";
import InboxList from './InboxList';
import MessageThread from './MessageThread';

const SubSupportScreen = () => {
  return (
    <Container className="sub-support-container">
      <Row className="mt-5">
        <Col>
          <h2>Support</h2>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h4>Reported To Admin</h4>
        </Col>
      </Row>
      <Row className="mt-3 chat-list-content">
        <div className="inline-block chat-list">
          <div className='chat-list-header'>
            <h5>Messages</h5>
          </div>
          <div className='nav'>
            <button className='nav-buttons button-active'> All </button>
            <button className='nav-buttons'> Archive </button>
          </div>
          <InboxList />
        </div>
       <MessageThread />
      </Row>
    </Container>
  );
};
export default SubSupportScreen;
