import Image from 'react-bootstrap/Image'
import user from "../../../../assets/admin/user.png";

const inboxList = () => {
  const arr = [1];

  const inboxBlock = () => {
    return (
      <div className='inbox-block'>
        <Image className="mb-2 mt-1 inline-block inbox-user-img" src={user} alt="" />
        <div className='inline-block inbox-block-text'>
          <label> 5 mins ago </label>
          <h5> Mark Chen </h5>
          <p>
            Lorem Ipsum is simply dummy text of the printing.
            Lorem Ipsum is simply dummy text of the printing. 
            Lorem Ipsum is simply dummy text of the printing. 
            Lorem Ipsum is simply dummy text of the printing. 
            Lorem Ipsum is simply dummy text of the printing. 
            Lorem Ipsum is simply dummy text of the printing. 
            Lorem Ipsum is simply dummy text of the printing. 
            Lorem Ipsum is simply dummy text of the printing. 
            Lorem Ipsum is simply dummy text of the printing. 
          </p>
          <label className='inbox-msg-notif'>1</label>
        </div>
      </div>
    );
  };

  return (
    <div className='ms-4 me-4'>
      { arr.map(() => inboxBlock()) }
    </div>
  );
};

export default inboxList;