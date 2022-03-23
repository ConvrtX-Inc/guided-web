import { Outlet } from "react-router-dom";
import SubAdminNavigation from "./SubAdminNavigation";

const SubAdminLayout = () => {
  return (
    <div className="wrapper">
      <SubAdminNavigation />
      <div id="subadmin-content" className="">
        <Outlet />
      </div>
    </div>
  );
};

export default SubAdminLayout;
