import { Col, Container, Row } from "react-bootstrap";

interface IAddCard {
  showAddCardModal: any
}

const AddCard = ({ showAddCardModal }: IAddCard) => {
  return (
    <Container className='add-card-modal'>
      <h5 className='add-card-modal-header'>Add Card</h5>
      <button
        className='add-card-modal-close-btn'
        onClick={showAddCardModal}
      >
        X
      </button>
      <Row className='add-card-modal-content'>
        <Col>
          <Container>
            <Row> <label className='add-card-modal-col-header'> Billing Information </label> </Row>
            <Row className='add-card-modal-rows'>
              <label className='add-card-modal-labels'>Full Name</label>
              <input className='add-card-modal-input-1' placeholder='Aycan Doganlar' />
            </Row>
            <Row className='add-card-modal-rows'>
              <label className='add-card-modal-labels'>Address</label>
              <input className='add-card-modal-input-1' placeholder='3819 Lynden Road' />
            </Row>
            <Row className='add-card-modal-rows'>
              <div className='inline-block add-card-modal-group-field'>
                <label className='inline-block-block add-card-modal-labels'>
                    City
                </label>
                <input
                  className='
                    inline-block-block
                    add-card-modal-input-1
                    add-card-modal-input-2
                  '
                  placeholder=''
                />
              </div>
              <div className='inline-block add-card-modal-group-field'>
                <label
                  className='inline-block-block add-card-modal-labels'>
                  Postal Code
                </label>
                <input
                  className='
                    inline-block-block
                    add-card-modal-input-1
                    add-card-modal-input-2
                  '
                  placeholder=''
                />
              </div>
            </Row>
            <Row className='add-card-modal-rows'>
              <label className='add-card-modal-labels'>Country</label>
              <input className='add-card-modal-input-1'  placeholder='3819 Lynden Road' />
            </Row>
          </Container>
        </Col>
        <Col>
         <Container>
            <Row>
              <label className='add-card-modal-col-header'>
                Card Information
              </label>
            </Row>
            <Row className='add-card-modal-rows'>
              <label className='add-card-modal-labels'>Name on card</label>
              <input className='add-card-modal-input-1'  placeholder='Aycan Doganlar' />
            </Row>
            <Row className='add-card-modal-rows'>
              <label className='inline-block add-card-modal-labels'>
                Card number
              </label>
              <input className='inline-block add-card-modal-input-1'
                placeholder='1234 4567 7890 1234'
              />
            </Row>
            <Row className='add-card-modal-rows'>
              <div className='inline-block add-card-modal-group-field'>
                <label
                  className='
                    inline-block-block
                    add-card-modal-labels
                  '>
                    Expiry date
                  </label>
                <input
                  className='
                    inline-block-block
                    add-card-modal-input-1
                    add-card-modal-input-2
                  '
                  placeholder='02/24' />
              </div>
              <div className='inline-block add-card-modal-group-field'>
                <input
                  className='
                    add-card-modal-input-1
                    add-card-modal-input-2
                    add-card-modal-input-3
                  '
                  placeholder='dd'
                />
              </div>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <button className='add-card-modal-save-button'> Submit </button>
      </Row>
    </Container>
  );
};

export default AddCard;
