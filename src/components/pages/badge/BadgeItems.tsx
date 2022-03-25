import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

const BadgeItems = (props: any) => {
  const displayData = props.items.map((badgeItem: any) => (
    <tr key={badgeItem.id}>
      <td>
        <Image
          className="table-row-img"
          src={badgeItem.imgBase64}
          alt="alt text here"
        />
      </td>
      <td className="badge-name">{badgeItem.badge_name}</td>
      <td>{badgeItem.badge_description}</td>
      <td>
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
            <th>Icon</th>
            <th>Badge Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{displayData}</tbody>
      </Table>
    </Col>
  );
};

export default BadgeItems;
