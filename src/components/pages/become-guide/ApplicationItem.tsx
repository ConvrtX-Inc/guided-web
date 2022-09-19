import "./ApplicationItem.scss";
import { Link, useNavigate } from "react-router-dom";
import check from "../../../assets/admin/check.png";
import Image from "react-bootstrap/Image";
import UserGuideRequestService from "../../../services/user-guide-request/UserGuideRequest.Service";

const ApplicationItem = (props: any) => {
  const navigate = useNavigate();

  const updateApproved = (id: any) => {
    const postData = {
      is_approved: true
    }
    UserGuideRequestService.patchData(id, postData).then(
      (res) => {
        if (res.status === 200) {
          navigate("/become-guide/approved", {
            state: {
              status: true,
              message: "Become A Guide successfully Approved.",
            },
            replace: true,
          });
        }
      }
    );
  }

  const updateReject = (id: any) => {
    const postData = {
      is_approved: false
    }
    UserGuideRequestService.patchData(id, postData).then(
      (res) => {
        if (res.status === 200) {
          navigate("/become-guide/rejected", {
            state: {
              status: true,
              message: "Become A Guide successfully rejected.",
            },
            replace: true,
          });
        }
      }
    );
  }

  return props.application.map((appItem: any) => (
    <tr key={appItem.id}>
      <td className="app-name p-4 app-application-item-td">
        <Image
          className="profile-image app-application-item-image"
          src={appItem.image_firebase_url}
          alt={''}
        />
        {appItem.first_name + ' ' + appItem.last_name}
      </td>
      <td className="p-4">{appItem.email}</td>
      <td className="p-4">{appItem.phone_no}</td>
      <td className="p-4">
          {appItem.is_approved ? 'Approved' : 'Rejected'}
      </td>
      <td className="p-4">
        <Link
          to={{
            pathname: "/become-guide/viewapplication",
          }}
          state={{ app: appItem }}
          className="btn btn-light btn-view-application"
        >
          View Application
        </Link>
      </td>
      <td className="p-4">
          {
              !appItem.is_approved ?
                  <button onClick={() => updateApproved(appItem.id)} className="btn btn-approve me-1">
                      <Image className="check-image me-1" src={check} alt="" /> Approve
                  </button>
                  :
                  <button onClick={() => updateReject(appItem.id)} className="m-1 btn btn-reject">Reject</button>
          }
      </td>
    </tr>
  ));
};

export default ApplicationItem;
