import PhoneVerification from "./components/pages/login/phoneverification";
import SignInForm from "./components/pages/login/signin";
import ResetPassword from "./components/pages/login/ResetPassword";
import ConfirmResetPassword from "./components/pages/login/ConfirmResetPassword";
import DashboardScreen from "./components/pages/dashboard/DashboardScreen";
import GuidesScreen from "./components/pages/guides/GuidesScreen";
import PostScreen from "./components/pages/post/PostScreen";
import PaymentScreen from "./components/pages/payments/PaymentScreen";
import TransactionScreen from "./components/pages/transactions/TransactionScreen";
import SupportScreen from "./components/pages/support/SupportScreen";
import UserScreen from "./components/pages/users/UserScreen";
import BadgeScreen from "./components/pages/badge/BadgeScreen";
import GuidelinesScreen from "./components/pages/guidelines/GuidelinesScreen";
import ContWithPhone from "./components/pages/login/contwithphone";
import NewPassword from "./components/pages/login/newpassword";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GuideSeeAll from "./components/pages/become-guide/GuideSeeAll";
import ViewApplication from "./components/pages/become-guide/ViewApplication";
import FAQ from "./components/pages/guidelines/FAQ";
import Tncs from "./components/pages/guidelines/Tncs";
import WaiverForm from "./components/pages/guidelines/WaiverForm";
import CancellationPolicy from "./components/pages/guidelines/CancellationPolicy";
import GuidedPayment from "./components/pages/guidelines/GuidedPayment";
import LocalLaws from "./components/pages/guidelines/LocalLaws";
import LoginLayout from "./components/layout/LoginLayout";
import GuideApproved from "./components/pages/become-guide/GuideApproved";
import GuidePending from "./components/pages/become-guide/GuidePending";
import GuideRejected from "./components/pages/become-guide/GuideRejected";
import GuideContainer from "./components/pages/become-guide/GuideContainer";
import CreateBadge from "./components/pages/badge/CreateBadge";
import EditBadge from "./components/pages/badge/EditBadge";
import AdminLayout from "./components/layout/AdminLayout";
import AuthContext from "./context/AuthContext";
import SubAdminLayout from "./components/layout/sub-admin/SubAdminLayout";
import SubDashboardScreen from "./components/pages/sub-admin/dashboard/SubDashboardScreen";
import SubPostScreen from "./components/pages/sub-admin/post/SubPostScreen";
import SubPaymentScreen from "./components/pages/sub-admin/payments/SubPaymentScreen";
import SubSupportScreen from "./components/pages/sub-admin/support/SubSupportScreen";
import ViewPost from "./components/pages/sub-admin/post/ViewPost";
import CreatePostArticleNewsfeed from "./components/pages/post/CreatePostArticleNewsfeed";
import CreatePostActivityPackage from "./components/pages/post/CreatePostActivityPackageEvent";
import EditPostArticleNewsfeed from "./components/pages/post/EditPostArticleNewsfeed";
import EditPostActivityPackage from "./components/pages/post/EditPostActivityPackage";
import { UserAccess } from "./shared/interfaces/UserAccess.interface";
import { useContext } from "react";
import ScrollToTop from "./components/layout/ScrollToTop";
import CreatePostAdsOutfitter from "./components/pages/post/CreatePostAdsOutfitter";

function App() {
  const authCtx = useContext(AuthContext);
  const userAccess: UserAccess = authCtx.userRole;
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/*Login pages */}
        {!authCtx.isLoggedIn && (
          <Route element={<LoginLayout />}>
            <Route index element={<SignInForm />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="/phoneverification" element={<PhoneVerification />} />
            <Route path="/continuewithphone" element={<ContWithPhone />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route
              path="/confirm-resetpassword"
              element={<ConfirmResetPassword />}
            />
            <Route path="*" element={<Navigate to="/signin" />} />
          </Route>
        )}

        {/*Admin pages */}
        {authCtx.isLoggedIn && userAccess.user_type_name === "Admin" && (
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardScreen />} />
            <Route path="guides" element={<GuidesScreen />} />
            <Route path="post" element={<PostScreen />} />
            <Route path="payment" element={<PaymentScreen />} />
            <Route path="transaction" element={<TransactionScreen />} />
            <Route path="support" element={<SupportScreen />} />
            <Route path="end-users" element={<UserScreen />} />
            <Route path="badge">
              <Route index element={<BadgeScreen />} />
              <Route path="/badge/create" element={<CreateBadge />} />
              <Route path="/badge/:id" element={<EditBadge />} />
            </Route>

            <Route path="/guidelines/" element={<GuidelinesScreen />}>
              <Route path="/guidelines/faq" element={<FAQ />} />
              <Route path="/guidelines/tncs" element={<Tncs />} />
              <Route path="/guidelines/waiver-form" element={<WaiverForm />} />
              <Route
                path="/guidelines/cancellation"
                element={<CancellationPolicy />}
              />
              <Route
                path="/guidelines/guided-payment"
                element={<GuidedPayment />}
              />
              <Route path="/guidelines/taxes" element={<LocalLaws />} />
            </Route>
            <Route path="/become-guide" element={<GuideContainer />}>
              <Route path="/become-guide/all" element={<GuideSeeAll />} />
              <Route
                path="/become-guide/approved"
                element={<GuideApproved />}
              />
              <Route path="/become-guide/pending" element={<GuidePending />} />
              <Route
                path="/become-guide/rejected"
                element={<GuideRejected />}
              />
            </Route>
            <Route
              path="/become-guide/viewapplication"
              element={<ViewApplication />}
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        )}

        {/*Sub-admin pages */}
        {authCtx.isLoggedIn && userAccess.user_type_name === "SubAdmin" && (
          <Route element={<SubAdminLayout />}>
            <Route path="dashboard" element={<SubDashboardScreen />} />
            <Route path="post">
              <Route index element={<SubPostScreen />} />
              <Route path="/post/:id" element={<ViewPost />} />
              <Route
                path="/post/article"
                element={<CreatePostArticleNewsfeed />}
              />
              <Route
                path="/post/edit-article"
                element={<EditPostArticleNewsfeed />}
              />
              <Route
                path="/post/edit-newsfeed"
                element={<EditPostArticleNewsfeed />}
              />
              <Route
                path="/post/newsfeed"
                element={<CreatePostArticleNewsfeed />}
              />
              <Route
                path="/post/activity-package"
                element={<CreatePostActivityPackage />}
              />
              <Route
                path="/post/edit-activity-package"
                element={<EditPostActivityPackage />}
              />
              <Route
                path="/post/event"
                element={<CreatePostActivityPackage />}
              />
              <Route
                path="/post/edit-event"
                element={<EditPostActivityPackage />}
              />
              <Route
                path="/post/advertistment"
                element={<CreatePostAdsOutfitter />}
              />
              <Route
                path="/post/outfitter"
                element={<CreatePostAdsOutfitter />}
              />
            </Route>
            <Route path="payment" element={<SubPaymentScreen />} />
            <Route path="support" element={<SubSupportScreen />} />

            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
