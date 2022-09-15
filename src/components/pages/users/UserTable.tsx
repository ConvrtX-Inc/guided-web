import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";

interface Props {
    PaginatorComponent: JSX.Element;
    items: any[];
}

const UserTable = (props: Props) => {

    const displayUser = props.items.map((user: any) => (
        <tr key={user.id}>
            <td className="p-4">{user.full_name}</td>
            <td className="p-4">
                <Image
                    className="profile-image app-application-item-image ml-3"
                    src={`${"data:image/png;base64,"}${user.badge ? user.badge.firebase_snapshot_img : null}`}
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

            {props.PaginatorComponent}
        </Col>
    );
}

export default UserTable;
