import Image from 'react-bootstrap/Image'
import user from "../../../../assets/admin/user.png";

const inboxList = () => {
    const arr = [1,2,3];

    const inboxBlock = () => {
        return (
            <div className='inbox-block'>
                <div className='inline-block'>
                    <Image className="mb-2 mt-1 " src={user} alt="" />
                </div>
               <div className='inline-block inbox-block-text'>
                    <label> 5 mins ago </label>
                    <h5> Mark Chen </h5>
                    <p> Lorem Ipsum is simply dummy text of the printing. </p>
                </div>
            </div>
        );
    };

    return (
        <div className='ms-4 me-4'>
            {
                arr.map(() => inboxBlock())
            }
        </div>
    )
};

export default inboxList;