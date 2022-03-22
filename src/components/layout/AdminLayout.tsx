import { Outlet } from "react-router-dom";
import "./AdminLayout.scss";

import AdminNavigation from "./AdminNavigation";

//Admin dashboard layout/wrapper
const AdminLayout = () => {
  return (
    <div className="wrapper">
      <AdminNavigation />

      <div id="content" className="m-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
