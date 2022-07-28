import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function PaymentItemsAdmin({ items }) {
  const displayData = items.map((paymentItem) => (
    <tr key={paymentItem.id}>
      <td className="p-3 text-center">
        <input type="checkbox" id={items.id} />
      </td>
      <td className="p-3">
        <Image
          roundedCircle
          className="post-img"
          src={paymentItem.Image}
          alt=""
        />{" "}
        {paymentItem.name}
      </td>
      <td className="p-3 text-center">{paymentItem.orgName}</td>
      <td className="p-3 text-center">{paymentItem.orgType}</td>
      <td className="p-3 text-center">{paymentItem.fromDate}</td>
      <td className="p-3 text-center">{paymentItem.toDate}</td>
      <td className="p-3 text-center">{`$${paymentItem.amount}`}</td>
      <td className="p-3 text-center">
        <p
          style={{
            color:
              paymentItem.status == 0
                ? "red"
                : paymentItem.status == 1
                ? "green"
                : "orange",
          }}
        >
          {paymentItem.status == 0
            ? "Rejected"
            : paymentItem.status == 1
            ? "Approved"
            : "Pending"}
        </p>
      </td>
      <td className="p-3 text-center">
        <Link to="." className="btn-view">
          <p>View</p>
        </Link>
      </td>
    </tr>
  ));

  return (
    <tbody>
      {items.length === 0 && (
        <tr>
          <td colSpan={8} className="text-center">
            No data
          </td>
        </tr>
      )}
      {items.length > 0 && displayData}
    </tbody>
  );
}

export default PaymentItemsAdmin;
