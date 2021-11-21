import check from "../../../assets/admin/check.png";
import "./ApplicationItem.scss";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

const ApplicationItem = (props) => {
  return props.application.map((appItem) => (
    <tr key={appItem.id}>
      <td className="app-name p-4">
        <Image
          className="profile-image me-3"
          src={appItem.img}
          alt={appItem.name}
        />
        {appItem.name}
      </td>
      <td className="p-4">{appItem.email}</td>
      <td className="p-4">{appItem.contactnumber}</td>
      <td className="p-4">
        <Link
          to={{
            pathname: "/become-guide/viewapplication",
            state: {
              app: appItem
            }
          }}
          className="btn btn-light btn-view-application"
        >
          View Application
        </Link>
      </td>
      <td className="p-4">
        <Button className="btn btn-approve me-1">
          <Image className="check-image me-1" src={check} alt="" /> Approve
        </Button>
        <Button className="m-1 btn btn-reject">Reject</Button>
      </td>
    </tr>
  ));
};

export default ApplicationItem;
