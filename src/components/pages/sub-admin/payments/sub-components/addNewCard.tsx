import circlePlus from '../../../../../assets/images/plus-circle.svg';
import compactRight from '../../../../../assets/images/chevron-compact-right.svg';

interface IAddNewCardParams {
  cls : string;
  showAddCardModal: any;
};

const AddNewCard = ({ cls, showAddCardModal }: IAddNewCardParams) => {
  return (
    <button
      className={`add-new-card-button ${cls}`}
      onClick={showAddCardModal}
    >
      Add new card
      <img className='circe-plus-img' src={circlePlus} alt={''} />
      <img className='compact-right' src={compactRight} alt={''} />
    </button>
  );
};

export default AddNewCard;
