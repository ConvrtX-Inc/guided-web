import { useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import PaymentTransactionHistory from './PaymentTransactionHistory';
import Backdrop from './sub-components/backdrop';
import Payment from './Payment';
import AddCard from './modals/AddCard';
import RemoveCard from './modals/RemoveCard';
import './SubPaymentScreen.scss';

const SubPaymentScreen = () => {
  const [shouldDisplayedPaymentPage, setShouldDisplayedPaymentPage] = useState(false);
  const [shouldDisplayedAddCardModal, setShouldDisplayedAddCardModal] = useState(false);
  const [shouldDisplayedRemoveCardModal, setShouldDisplayedRemoveCardModal] = useState(false);
  const togglePaymentPage = () => { setShouldDisplayedPaymentPage(!shouldDisplayedPaymentPage) };
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
        shouldDisplayedPaymentPage
        ? <Payment
            showAddCardModal={toggleAddCardModal}
            showRemoveCardModal={toggleRemoveCardModal}
          />
        : <PaymentTransactionHistory
            showPaymentPage={togglePaymentPage}
            showAddCardModal={toggleAddCardModal}
            showRemoveCardModal={toggleRemoveCardModal}
          />
      }
    </Container>
  );
};

export default SubPaymentScreen;
