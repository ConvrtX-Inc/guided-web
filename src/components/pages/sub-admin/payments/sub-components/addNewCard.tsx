import circlePlus from '../../../../../assets/images/plus-circle.svg';
import compactRight from '../../../../../assets/images/chevron-compact-right.svg';

interface IAddNewCardParams {
  cls : string;
};

const AddNewCard = ({ cls }: IAddNewCardParams) => {
  return (
    <button className={`add-new-card-button ${cls}`}>
      Add new card
      <img className='circe-plus-img' src={circlePlus} alt={''} />
      <img className='compact-right' src={compactRight} alt={''} />
    </button>
  );
};

export default AddNewCard;
