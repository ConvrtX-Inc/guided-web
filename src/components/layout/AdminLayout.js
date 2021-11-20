import './AdminLayout.scss';

import AdminNavigation from "./AdminNavigation";

const AdminLayout = (props) => {
  return (
    <div className="wrapper">
      <AdminNavigation />

      <div id="content" className="m-4">
        {props.children}
      </div>
    </div>
  );
};

export default AdminLayout;
