import React, { useReducer } from "react";
import "./styles.scss";
type Props = {
  count: number;
  onPageChange?: any;
  onNext?: any;
  onPrev?: any;
};

const VoidCallBack = () => null;
const rowsPerPage = [5, 15, 25];
interface InitState {
  numbersOfRows: number;
}
const initState: InitState = {
  numbersOfRows: rowsPerPage[0],
};

function reducer(state: InitState, action: any) {
  switch (action.type) {
    case "handleRowsPerPage":
      return { ...state, numbersOfRows: action.payload };
    default:
      throw new Error();
  }
}

const TablePagination = ({
  count,
  onPageChange = VoidCallBack,
  onNext = VoidCallBack,
  onPrev = VoidCallBack,
}: Props) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const handlePageCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "handleRowsPerPage", payload: e.target.value });
    onPageChange();
  };
  return (
    <div className="table-pagination">
      <div className="me-5">
        <span className="me-3">Rows per page: </span>
        <select
          className="me-5"
          value={state.numbersOfRows}
          onChange={handlePageCountChange}
        >
          {rowsPerPage.map((rowsNo) => (
            <option value={rowsNo}>{rowsNo}</option>
          ))}
        </select>
      </div>
      <div>
        <span className="me-3">
          1-{Math.ceil(count / state.numbersOfRows)} of {count}
        </span>
        <span className="pagination-icons">
          <img
            src="/svgs/left-pagination.svg"
            className="me-3 nav-pagination left"
            onClick={(e: React.MouseEvent<HTMLImageElement>) => onPrev()}
          />
          <img
            src="/svgs/right-pagination.svg"
            className="nav-pagination right"
            onClick={(e: React.MouseEvent<HTMLImageElement>) => onNext()}
          />
        </span>
      </div>
    </div>
  );
};

export default TablePagination;
