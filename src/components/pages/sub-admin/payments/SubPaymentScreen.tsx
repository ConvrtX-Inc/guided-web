import { useState } from 'react';
import { Container } from "react-bootstrap";
import PaymentTransactionHistory from './PaymentTransactionHistory';
import Backdrop from './sub-components/backdrop';
import AddCard from './modals/AddCard';
import RemoveCard from './modals/RemoveCard';
import './SubPaymentScreen.scss';

const SubPaymentScreen = () => {
  const [shouldDisplayedAddCardModal, setShouldDisplayedAddCardModal] = useState(false);
  const [shouldDisplayedRemoveCardModal, setShouldDisplayedRemoveCardModal] = useState(false);
  const toggleAddCardModal = () => { setShouldDisplayedAddCardModal(!shouldDisplayedAddCardModal) };
  const toggleRemoveCardModal = () => { setShouldDisplayedRemoveCardModal(!shouldDisplayedRemoveCardModal) };

  return (
    <Container>
      {
        shouldDisplayedAddCardModal
          ? <Backdrop>
            <AddCard showAddCardModal={toggleAddCardModal} />
          </Backdrop>
          : null
      }
      {
        shouldDisplayedRemoveCardModal
          ? <Backdrop>
            <RemoveCard showRemoveCardModal={toggleRemoveCardModal} />
          </Backdrop>
          : null
      }
      {
        <PaymentTransactionHistory
          showAddCardModal={toggleAddCardModal}
          showRemoveCardModal={toggleRemoveCardModal}
          status={false}
          message={''}
        />
      }
    </Container>
  );
};

export default SubPaymentScreen;
