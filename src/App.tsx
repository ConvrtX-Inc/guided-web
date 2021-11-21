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
import ModalTest from "./components/ui/ModalTest";
import PageNotFound from "./components/pages/PageNotFound";

function App() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <LoginLayout>
          <SignInForm />
        </LoginLayout>
      </Route>
      <Route  exact={true} path="/signin">
        <LoginLayout>
          <SignInForm />
        </LoginLayout>
      </Route>
      <Route exact={true} path="/newpassword">
        <LoginLayout>
          <NewPassword />
        </LoginLayout>
      </Route>
      <Route exact={true} path="/phoneverification">
        <LoginLayout>
          <PhoneVerification />
        </LoginLayout>
      </Route>
      <Route exact={true} path="/continuewithphone">
        <LoginLayout>
          <ContinueWithPhone />
        </LoginLayout>
      </Route>
      <Route exact={true} path="/resetpassword">
        <LoginLayout>
          <ResetPassword />
        </LoginLayout>
      </Route>
      <Route exact={true} path="/confirm-resetpassword">
        <LoginLayout>
          <ConfirmResetPassword />
        </LoginLayout>
      </Route>
      <Route exact={true} path="/dashboard">
        <AdminLayout>
          <DashboardScreen />
        </AdminLayout>
      </Route>
      <Route exact={true} path="/become-guide/">
        <AdminLayout>
          <BecomeGuide />
        </AdminLayout>
      </Route>
      <Route path="/guides">
        <AdminLayout>
          <GuidesScreen />
        </AdminLayout>
      </Route>
      <Route exact={true} path="/post">
        <AdminLayout>
          <PostScreen />
        </AdminLayout>
      </Route>
      <Route exact={true} path="/payment">
        <AdminLayout>
          <PaymentScreen />
        </AdminLayout>
      </Route>
      <Route exact={true} path="/transaction">
        <AdminLayout>
          <TransactionScreen />
        </AdminLayout>
      </Route>
      <Route exact={true} path="/support">
        <AdminLayout>
          <SupportScreen />
        </AdminLayout>
      </Route>
      <Route exact={true} path="/end-users">
        <AdminLayout>
          <UserScreen />
        </AdminLayout>
      </Route>
      <Route exact={true} path="/badge">
        <AdminLayout>
          <BadgeScreen />
        </AdminLayout>
      </Route>
      <Route exact={true} path="/guidelines">
        <AdminLayout>
          <GuidelinesScreen />
        </AdminLayout>
      </Route>

      <Route exact={true} path="/modal-test">
        <ModalTest />
      </Route>

      <Route exact={true} component={PageNotFound} />
    </Switch>
  );
}

export default App;
