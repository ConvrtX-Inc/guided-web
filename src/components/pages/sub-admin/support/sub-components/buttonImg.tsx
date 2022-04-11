import { Image } from "react-bootstrap";

interface IButtonImg {
    cls: string;
    icon: string;
};

const buttonImg = ({ cls, icon }: IButtonImg) => {
  return (
    <div className={cls}>
      <button>
        <Image src ={icon} alt='' />
      </button>
    </div>
  );
};

export default buttonImg;