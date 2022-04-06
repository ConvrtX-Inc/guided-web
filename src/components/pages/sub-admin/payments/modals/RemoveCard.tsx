import { Container, Row } from "react-bootstrap";

interface IRemoveCard {
  showRemoveCardModal: any
}

const RemoveCard = ({ showRemoveCardModal }: IRemoveCard) => {
  return (
    <Container className='remove-card-div'>
      <Row>
        <label className='remove-card-header'>Remove Card</label>
      </Row>
      <Row>
        <p>Are you sure you want to remove card?</p>
      </Row>
      <Row>
        <label>Ending in 0212 01/23</label>
      </Row>
      <Row>
        <button
          className='remove-card-btn remove-card-cancel-btn'
          onClick={showRemoveCardModal}
        >
          Cancel
        </button>
        <button className='remove-card-btn remove-card-continue-btn'> Continue </button>
      </Row>
    </Container>
  );
}

export default RemoveCard;