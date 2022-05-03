import Col from "react-bootstrap/Col";
import ToastNotificationBasic from "../../ui/ToastNotificationBasic";
import { useLocation } from "react-router-dom";

interface LocationState {
  status: boolean;
  message: string;
}

const GuideRejected = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  return (
    <div>
      <Col>
        {state?.status && <ToastNotificationBasic message={state?.message} />}
      </Col>
      Rejected!
    </div>
  );
};

export default GuideRejected;
