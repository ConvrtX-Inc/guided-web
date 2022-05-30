import React, { useEffect } from "react";
import { fetchTransactionHistory } from "../../../../redux/slices/transaction";
import { useDispatch, useSelector } from "../../../../redux/store";
import AppTable from "../../../shared/Table";
import TablePagination from "../../../shared/TablePagination";
import "./styles.scss";
type Props = {};

const testImgSrc =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80";
const tableHeaders = [
  "Transaction Number",
  "Customer Name",
  "Organization Name",
  "Organization Type",
  "Date Posted",
  "Type Of Post",
  "1% Group",
  "Amount",
  "Status",
];

const TransactionTable = (props: Props) => {
  const { transactionHistory } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactionHistory());
  }, []);
  console.log(transactionHistory);
  const rowDataBuilder = (item: any) => {
    return (
      <tr>
        <td>00123</td>
        <td>
          <img className="user-avatar me-1" src={testImgSrc} /> Lisa Watson
        </td>
        <td>Sample org name</td>
        <td>Guide / Influencers</td>
        <td>12/10/2021</td>
        <td>Event</td>
        <td>Yes</td>
        <td>$100</td>
        <td className={`user-status approved`}>Approved</td>
      </tr>
    );
  };
  return (
    <div className="table-wrapper">
      <AppTable
        tableHeaders={tableHeaders}
        rowDataBuilder={rowDataBuilder}
        items={[1, 2]}
      />
      <TablePagination count={1} />
    </div>
  );
};

export default TransactionTable;
