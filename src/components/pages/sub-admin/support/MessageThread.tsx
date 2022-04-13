import { Row, Image } from "react-bootstrap";
import user from "../../../../assets/admin/user.png";
import SendIcon from '../../../../assets/images/send.svg';
import AttachmentIcon from '../../../../assets/images/paperclip.svg';
import ImageIcon from '../../../../assets/images/image.svg';
import ButtonImg from './sub-components/buttonImg';

const messageThread = () => {

  return (
    <div className="inline-block message-thread">
      <div className='message-thread-header'>
        <Row className='ms-4 me-4'>
          <Image className="chat-user-img inline-block" src={user} alt="" />
          <div className='header-text' style={{width: 'auto'}}>
            <h5> Mark Chen </h5>
            <label>markchen@gmail.com</label>
          </div>
        </Row>
      </div>
      {
        //chat field here
      }
      <div className='message-thread-input'>
        <ButtonImg cls={'add-attch-img-icon inline-block'} icon={AttachmentIcon} />
        <ButtonImg cls={'add-attch-img-icon inline-block'} icon={ImageIcon} />
        <input className='inline-block' placeholder={'Write your message here'} />
        <ButtonImg cls={'send-mgs-icon inline-block'} icon={SendIcon} />
      </div>
    </div>
  );
};

export default messageThread;