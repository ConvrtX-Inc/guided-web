import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import user from "../../../assets/admin/user-1.png";
import { useState } from "react";

const SubAdminItems = (props: any) => {
  const [isActive, setIsActive] = useState(false);

  const handleSwitchChange = (event: any) => {
    if (event.target.checked) {
      setIsActive(() => true);
    } else {
      setIsActive(() => false);
    }
  };

  const displayData = props.items.map((postItem: any) => (
    <tr key={postItem.id}>
      <td className="p-4">
        <Image
          style={{ width: 30, height: 30 }}
          src={user}
          alt={postItem.full_name}
        />{" "}
        {postItem.full_name}
      </td>
      <td className="p-4 text-center">{postItem.organization_name}</td>
      <td className="p-4 text-center">
        {postItem.is_subadmin_guide && "Guide / Influencers"}
        {postItem.is_subadmin_nonprofit && "Non-Profit / Conserv"}
        {postItem.is_subadmin_others && "Others"}
      </td>
      <td className="p-4 text-center">
        {!postItem.is_for_the_planet && "No"}
        {postItem.is_for_the_planet && "Yes"}
      </td>
      <td className="p-4 text-center"></td>
      <td className="p-4 text-center">
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <div className="form-switch form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={postItem.id}
                value={postItem.id}
                onChange={(e) => handleSwitchChange(e)}
                //checked={postItem.is_active || isActive}
              />
            </div>
          </Col>
        </Row>
      </td>
    </tr>
  ));
  return (
    <tbody>
      {props.items.length === 0 && (
        <tr>
          <td colSpan={6} className="text-center">
            No data
          </td>
        </tr>
      )}
      {props.items.length > 0 && displayData}
    </tbody>
  );
};
export default SubAdminItems;
