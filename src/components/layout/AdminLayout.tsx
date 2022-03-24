import { Outlet } from "react-router-dom";
import "./AdminLayout.scss";

import AdminNavigation from "./AdminNavigation";

//Admin dashboard layout/wrapper
const AdminLayout = () => {
  return (
    <div className="admin-wrapper">
      <AdminNavigation />

      <div id="admin-content" className="m-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
