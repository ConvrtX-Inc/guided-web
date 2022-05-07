import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

const BadgeItems = (props: any) => {
  const displayData = props.items.map((badgeItem: any) => (
    <tr key={badgeItem.id}>
      <td className="p-4">
        <Image
          className="table-row-img"
          //src={badgeItem.imgBase64}
          src={badgeItem.firebase_snapshot_img}
          alt="alt text here"
        />
      </td>
      <td className="badge-name p-4">{badgeItem.badge_name}</td>
      <td className="p-4">{badgeItem.badge_description}</td>
      <td className="p-4">
        <Link
          to={`/badge/${badgeItem.id}`}
          state={{
            badge: badgeItem,
          }}
          className="btn btn-edit"
        >
          Edit
        </Link>
      </td>
    </tr>
  ));

  return (
    <Col>
      <Table responsive borderless className="mt-4">
        <thead>
          <tr>
            <th className="col-2 p-4">Icon</th>
            <th className="col-2 p-4">Badge Name</th>
            <th className=" p-4">Description</th>
            <th className="col-2 p-4">Action</th>
          </tr>
        </thead>
        <tbody>{displayData}</tbody>
      </Table>
    </Col>
  );
};

export default BadgeItems;
