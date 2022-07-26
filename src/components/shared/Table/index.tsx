import React from "react";
import { Table } from "react-bootstrap";
import "./styles.scss";

type Props = {
  tableHeaders: string[];
  rowDataBuilder: (item: any) => JSX.Element;
  items: any[];
};

const AppTable = ({ tableHeaders, items, rowDataBuilder }: Props) => {
  return (
    <Table responsive>
      <thead>
        {tableHeaders.map((h) => (
          <th>{h}</th>
        ))}
      </thead>
      <tbody>{items.map((item) => rowDataBuilder(item))}</tbody>
    </Table>
  );
};

export default AppTable;
