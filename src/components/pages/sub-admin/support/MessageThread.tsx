import { Container, Row, Col, Image } from "react-bootstrap";
import user from "../../../../assets/admin/user.png";

const messageThread = () => {

    return (
        <div className="inline-block message-thread">
          <div className='message-thread-header'>
            <Row className='ms-4 me-4'>
                <div className='inline-block header'>
                    <Image className="mb-2 mt-1 " src={user} alt="" />
                </div>
                <div className='inline-block header header-text'>
                    <h5> Mark Chen </h5>
                    <label>markchen@gmail.com</label>
                </div>
            </Row>
          </div>

          <div className='message-thread-input'>
              <input placeholder={'Write your message here'} />
          </div>
        </div>
    );
};

export default messageThread;