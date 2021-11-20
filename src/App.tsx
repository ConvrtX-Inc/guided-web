import React from "react";
import { Switch, Route } from "react-router-dom";

import NewPassword from "./components/pages/login/newpassword";
import PhoneVerification from "./components/pages/login/phoneverification";
import ContinueWithPhone from "./components/pages/login/contwithphone";
import SignInForm from "./components/pages/login/signin";
import ResetPassword from "./components/pages/login/ResetPassword";
import ConfirmResetPassword from "./components/pages/login/ConfirmResetPassword";
import LoginLayout from "./components/layout/LoginLayout";
import AdminLayout from "./components/layout/AdminLayout";
import DashboardScreen from "./components/pages/dashboard/DashboardScreen";
import BecomeGuide from "./components/pages/become-guide/Guide";
import GuidesScreen from "./components/pages/guides/GuidesScreen";
import PostScreen from "./components/pages/post/PostScreen";
import PaymentScreen from "./components/pages/payments/PaymentScreen";
import TransactionScreen from "./components/pages/transactions/TransactionScreen";
import SupportScreen from "./components/pages/support/SupportScreen";
import UserScreen from "./components/pages/users/UserScreen";
import BadgeScreen from "./components/pages/badge/BadgeScreen";
import GuidelinesScreen from "./components/pages/guidelines/GuidelinesScreen";

function App() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <LoginLayout>
          <SignInForm />
        </LoginLayout>
      </Route>
      <Route path="/signin">
        <LoginLayout>
          <SignInForm />
        </LoginLayout>
      </Route>
      <Route path="/newpassword">
        <LoginLayout>
          <NewPassword />
        </LoginLayout>
      </Route>
      <Route path="/phoneverification">
        <LoginLayout>
          <PhoneVerification />
        </LoginLayout>
      </Route>
      <Route path="/continuewithphone">
        <LoginLayout>
          <ContinueWithPhone />
        </LoginLayout>
      </Route>
      <Route path="/resetpassword">
        <LoginLayout>
          <ResetPassword />
        </LoginLayout>
      </Route>
      <Route path="/confirm-resetpassword">
        <LoginLayout>
          <ConfirmResetPassword />
        </LoginLayout>
      </Route>
      <Route path="/dashboard">
        <AdminLayout>
          <DashboardScreen />
        </AdminLayout>
      </Route>
      <Route path="/become-guide/">
        <AdminLayout>
          <BecomeGuide />
        </AdminLayout>
      </Route>
      <Route path="/guides">
        <AdminLayout>
          <GuidesScreen />
        </AdminLayout>
      </Route>
      <Route path="/post">
        <AdminLayout>
          <PostScreen />
        </AdminLayout>
      </Route>
      <Route path="/payment">
        <AdminLayout>
          <PaymentScreen />
        </AdminLayout>
      </Route>
      <Route path="/transaction">
        <AdminLayout>
          <TransactionScreen />
        </AdminLayout>
      </Route>
      <Route path="/support">
        <AdminLayout>
          <SupportScreen />
        </AdminLayout>
      </Route>
      <Route path="/end-users">
        <AdminLayout>
          <UserScreen />
        </AdminLayout>
      </Route>
      <Route path="/badge">
        <AdminLayout>
          <BadgeScreen />
        </AdminLayout>
      </Route>
      <Route path="/guidelines">
        <AdminLayout>
          <GuidelinesScreen />
        </AdminLayout>
      </Route>
    </Switch>
  );
}

export default App;
