import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import right from "../../../assets/admin/right.png";
import left from "../../../assets/admin/left2.png";

const UserTable = (props: any) => {
    const displayUser = props.items.map((user: any) => (
        <tr key={user.id}>
            <td className="p-4">{user.full_name}</td>
            <td className="p-4">
                <Image
                className="profile-image app-application-item-image ml-3"
                    src={`${"data:image/png;base64,"}${user.badge.badge_img_icon}`}
                alt={''}
                />
            </td>
            <td className="p-4">{user.phone_no}</td>
            <td className="p-4">{user.email}</td>
            <td className="p-4">{user.total_booking}</td>
            <td className="p-4">
                <div className="form-check form-switch">
                    <input
                        className="form-check-input me-2"
                        type="checkbox"
                        defaultChecked={user.is_online}
                        id="flexSwitchCheckDefault"
                    />
                </div>
            </td>
        </tr>
    ));

    return (
        <Col>
            <Table responsive borderless className="mt-4 post-table">
                <thead>
                    <tr>
                        <th className="ps-4">End User</th>
                        <th className="ps-4">Selected Badges</th>
                        <th className="ps-4">Contact Number</th>
                        <th className="ps-4">Email</th>
                        <th className="ps-4">Total Number Of Bookings</th>
                        <th className="ps-4">Active</th>
                    </tr>
                </thead>
                <tbody>
                    {props.items.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center">
                                No data
                            </td>
                        </tr>
                    )}
                    {props.items.length > 0 && displayUser}
                </tbody>
            </Table>
            <Navbar className="navigation justify-content-end">
                <Form.Label className="me-2 mt-2">Rows per page:</Form.Label>
                <Col xs={1}>
                    <Form.Select className="me-1">
                        <option>8</option>
                    </Form.Select>
                </Col>
                <Form.Label className="ms-5 mt-2 me-2">1-8 of 150:</Form.Label>
                <Button className="btn btn-light me-1">
                    <Image src={left} alt="" />
                </Button>
                <Button className="btn btn-light me-4">
                    <Image src={right} alt="" />
                </Button>
            </Navbar>
        </Col>
    );
}

export default UserTable;
