import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavigation from "../components/layout/AdminNavigation";
import SignInForm from "../components/pages/login/signin";
import "../components/layout/AdminLayout.scss";

const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.token;
};
const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const isAuth = useAuth();

  return isAuth ? (
    <div className="wrapper">
      <AdminNavigation />

      <div id="content" className="m-4">
        <Outlet />
      </div>
    </div>
  ) : (
    <SignInForm />
  );
};
export default ProtectedRoutes;
