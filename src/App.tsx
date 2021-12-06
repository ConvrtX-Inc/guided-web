import { Switch, Route } from "react-router-dom";

import PhoneVerification from "./components/pages/login/PhoneVerification";
import SignInForm from "./components/pages/login/SignIn";
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
import ContWithPhone from "./components/pages/login/ContWithPhone";
import NewPassword from "./components/pages/login/NewPassword";

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
          <ContWithPhone />
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
      <Route path="/dashboard">
        <AdminLayout>
          <DashboardScreen />
        </AdminLayout>
      </Route>
      <Route path="/become-guide">
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

      <Route path="/modal-test">
        <ModalTest />
      </Route>

      <Route exact={true} component={PageNotFound} />
    </Switch>
  );
}

export default App;
