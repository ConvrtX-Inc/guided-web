import { Container, Row, Col } from "react-bootstrap";
import "./SubSupport.scss";
import InboxList from './InboxList';
import MessageThread from './MessageThread';
import SearchIcon from '../../../../assets/images/search.svg';
import CirclePlus from '../../../../assets/images/add-plus-circle.svg';
import ButtonImg from './sub-components/buttonImg';

const SubSupportScreen = () => {
  return (
    <Container className="sub-support-container">
      <Row className="mt-5">
        <Col>
          <h2>Support</h2>
        </Col>
      </Row>
      <Row className="mt-5 sub-admin-header">
        <Col>
          <h4>
            <label> Reported To Admin </label>
          </h4>
        </Col>
      </Row>
      <Row className="mt-3 chat-list-content">
        <div className="inline-block chat-list">
          <div className='chat-list-header'>
            <h5>Messages</h5>
            <ButtonImg
              cls={'search-chat-icon'}
              icon={SearchIcon}
            />
          </div>
          <div className='nav'>
            <button className='nav-buttons button-active'> All </button>
            <button className='nav-buttons'> Archive </button>
          </div>
          <InboxList />
          <ButtonImg
              cls={'add-new-msg'}
              icon={CirclePlus}
            />
        </div>
        <MessageThread />
      </Row>
    </Container>
  );
};
export default SubSupportScreen;
