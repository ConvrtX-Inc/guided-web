import { Outlet } from "react-router-dom";
import SubAdminNavigation from "./SubAdminNavigation";
import "./SubAdminLayout.scss";

const SubAdminLayout = () => {
  return (
    <div className="sub-admin-wrapper">
      <SubAdminNavigation />
      <div id="sub-admin-content" className="m-4">
        <Outlet />
      </div>
    </div>
  );
};

export default SubAdminLayout;
