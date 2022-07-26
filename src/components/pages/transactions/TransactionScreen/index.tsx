import ContentWrapper from "../../../shared/ContentWrapper";
import FilterHeader from "../FilterHeader/";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { Button, Tab, ToggleButton } from "react-bootstrap";
import { TransactionUserFilter } from "../../../../shared/enums/TransactionUserFIlter";
import { useSelector, RootState, useDispatch } from "../../../../redux/store";
import { onUserFilterChange } from "../../../../redux/slices/transaction";
import "./styles.scss";
import TransactionTable from "../TransactionTable";

const TransactionScreen = () => {
  const { userFilter } = useSelector((state: RootState) => state.transaction);
  const dispatch = useDispatch();

  const handleButtonGroupChange = (e: TransactionUserFilter) => {
    dispatch(onUserFilterChange(e));
  };
  return (
    <ContentWrapper headerTitle="Transaction History">
      <div className="d-flex w-100 justify-content-between align-items-center mb-5">
        <ToggleButtonGroup
          name="userFilter"
          value={userFilter}
          type="radio"
          onChange={handleButtonGroupChange}
        >
          <ToggleButton
            name="userFilter"
            value={TransactionUserFilter.GUIDES_AND_PARTNERS}
            id={TransactionUserFilter.GUIDES_AND_PARTNERS}
          >
            {TransactionUserFilter.GUIDES_AND_PARTNERS}
          </ToggleButton>
          <ToggleButton
            name="userFilter"
            value={TransactionUserFilter.END_USER}
            id={TransactionUserFilter.END_USER}
          >
            {TransactionUserFilter.END_USER}
          </ToggleButton>
        </ToggleButtonGroup>
        <Button id="csv-download">Download CSV</Button>
      </div>

      <FilterHeader />
      <TransactionTable />
    </ContentWrapper>
  );
};

export default TransactionScreen;
