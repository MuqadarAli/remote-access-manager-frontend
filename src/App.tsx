import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SuperAdminLogin';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './pages/Dashboard';
import CommunityDetail from './pages/Community/communities-detail';
import ApprovedCommunities from './pages/Community/approved-communities';
import PendingCommunities from './pages/Community/pending-communities';
import AddCommunity from './pages/Community/add-community';
import SuperAdminLogin from './pages/Authentication/SuperAdminLogin';
import ProfileDetail from './pages/ProfileDetail';
import Login from './pages/Authentication/Login';
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import { PendingUsers } from './pages/Users/PendingUsers';
import { UserDetail } from './pages/Users/UserDetail';
import { ApprovedUsers } from './pages/Users/ApprovedUsers';
import { VisitorDetail } from './pages/VisitorsAirbnb/VisitorDetail';
import { ApprovedVisitors } from './pages/VisitorsAirbnb/ApprovedVisitor';
import { ApprovedAirbnb } from './pages/VisitorsAirbnb/ApprovedAirbnb';
import { IsAuth } from './components/IsAuth';
import { SuperAdminChangePass } from './pages/ChangePassword';
import { AdminChangePass } from './pages/ChangePassword/AdminChangePass';
import AdminProfile from './pages/AdminProfile';
import { PendingProducts } from './pages/Products/PendingProducts';
import { ProductDetail } from './pages/Products/ProductDetail';
import { ApprovedProducts } from './pages/Products/ApprovedProducts';
import { PendingBusiness } from './pages/Business/PendingBusiness';
import { BusinessDetail } from './pages/Business/BusinessDetail';
import { ApprovedBusiness } from './pages/Business/ApprovedBusiness';
import { PendingVehicles } from './pages/Vehicle/PendingVehicles';
import { VehicleDetail } from './pages/Vehicle/VehicleDetail';
import { ApprovedVehicles } from './pages/Vehicle/ApproveVehicles';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { FoundItem } from './pages/CommunityAlert/FoundItem';
import { FoundItemDetail } from './pages/CommunityAlert/FoundItemDetail';
import { LostItem } from './pages/CommunityAlert/LostItem';
import { Alert } from './pages/CommunityAlert/Alert';
import { AlertDetail } from './pages/CommunityAlert/AlertDetail';
import { Featured } from './pages/Featured';
import { AddFeatured } from './pages/Featured/AddFeatured';
import { Meeting } from './pages/Meeting';
import { MeetingDetail } from './pages/Meeting/MeetingDetail';
import { AddMeeting } from './pages/Meeting/AddMeeting';
import { PageNotFound } from './pages/PageNotFound';
import { UpdateFeatured } from './pages/Featured/UpdateFeatured';
import { LostItemDetail } from './pages/CommunityAlert/LostItemDetail';
import { CommunityLeader } from './pages/CommunityLeader';
import { AddCommunityLeader } from './pages/CommunityLeader/AddcommunityLeader';
import { CommunityLeaderDetail } from './pages/CommunityLeader/CommunityLeaderDetail';
import { ApprovedWorker } from './pages/VisitorsAirbnb/ApprovedWorker';
import { SecurityGuard } from './pages/SecurityGuard';
import { VisitorsMenu } from './pages/SecurityGuard/VisitorsMenu';
import { IncomingVisitors } from './pages/SecurityGuard/InComingVisitors';

function App() {
  // const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  return (
    // <DefaultLayout>
    <Routes>
      <Route
        path="/"
        element={
          <>
            <PageTitle title="Login | Home Access Manager" />
            <Login />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <PageTitle title="Login | Home Access Manager" />
            <SuperAdminLogin />
          </>
        }
      />
      <Route
        path="/super-admin/dashboard"
        element={
          <IsAuth>
            <DefaultLayout>
              <PageTitle title="Dashboard | Home Access Manager" />
              <Dashboard />
            </DefaultLayout>
          </IsAuth>
        }
      />
      <Route
        path="/dashboard"
        element={
          <IsAuth>
            <AdminLayout>
              <PageTitle title="Dashboard | Home Access Manager" />
              <AdminDashboard />
            </AdminLayout>
          </IsAuth>
        }
      />
      <Route
        path="/security-guard/dashboard"
        element={
          <IsAuth>
            <SecurityGuard/>
          </IsAuth>
        }
      />
      <Route
        path="/super-admin/communities/pending-communities"
        element={
          <IsAuth>
            <DefaultLayout>
              <PageTitle title="Community | Home Access Manager" />
              <PendingCommunities />
            </DefaultLayout>
          </IsAuth>
        }
      />
      <Route
        path="/super-admin/communities/approved-communities"
        element={
          <IsAuth>
            <DefaultLayout>
              <PageTitle title="Community | Home Access Manager" />
              <ApprovedCommunities />
            </DefaultLayout>
          </IsAuth>
        }
      />
      <Route
        path="/super-admin/communities/community-detail"
        element={
          <IsAuth>
            <DefaultLayout>
              <PageTitle title="Community Detail| Home Access Manager" />
              <CommunityDetail />
            </DefaultLayout>
          </IsAuth>
        }
      />
      <Route
        path="/super-admin/communities/add-community"
        element={
          <IsAuth>
            <DefaultLayout>
              <PageTitle title="Add Community | Home Access Manager" />
              <AddCommunity />
            </DefaultLayout>
          </IsAuth>
        }
      />
      <Route
        path="/super-admin/change-password"
        element={
          <IsAuth>
            <SuperAdminChangePass />
          </IsAuth>
        }
      />
      <Route
        path="/change-password"
        element={
          <IsAuth>
            <AdminChangePass />
          </IsAuth>
        }
      />
      <Route
        path="users/pending-users"
        element={
          <IsAuth>
            <PendingUsers />
          </IsAuth>
        }
      />
      <Route
        path="users/user-detail"
        element={
          <IsAuth>
            <UserDetail />
          </IsAuth>
        }
      />
      <Route
        path="users/approved-users"
        element={
          <IsAuth>
            <ApprovedUsers />
          </IsAuth>
        }
      />
      {/* //--------------------------------------------Visitors, Airbnb and Workers-----------------------------------------// */}

      <Route
        path="/visitors/visitor-detail"
        element={
          <IsAuth>
            <VisitorDetail />
          </IsAuth>
        }
      />
      <Route
        path="/visitors/visitors"
        element={
          <IsAuth>
            <ApprovedVisitors />
          </IsAuth>
        }
      />
      <Route
        path="/visitors/airbnb"
        element={
          <IsAuth>
            <ApprovedAirbnb />
          </IsAuth>
        }
      />
      <Route
        path="/visitors/workers"
        element={
          <IsAuth>
            <ApprovedWorker />
          </IsAuth>
        }
      />
      <Route
        path="/products/pending-products"
        element={
          <IsAuth>
            <PendingProducts />
          </IsAuth>
        }
      />
      <Route
        path="/products/approved-products"
        element={
          <IsAuth>
            <ApprovedProducts />
          </IsAuth>
        }
      />
      <Route
        path="/products/product-detail"
        element={
          <IsAuth>
            <ProductDetail />
          </IsAuth>
        }
      />
      <Route
        path="/businesses/pending-businesses"
        element={
          <IsAuth>
            <PendingBusiness />
          </IsAuth>
        }
      />
      <Route
        path="/businesses/approved-businesses"
        element={
          <IsAuth>
            <ApprovedBusiness />
          </IsAuth>
        }
      />
      <Route
        path="/businesses/business-detail"
        element={
          <IsAuth>
            <BusinessDetail />
          </IsAuth>
        }
      />
      <Route
        path="/vehicles/pending-vehicles"
        element={
          <IsAuth>
            <PendingVehicles />
          </IsAuth>
        }
      />
      <Route
        path="/vehicles/vehicle-detail"
        element={
          <IsAuth>
            <VehicleDetail />
          </IsAuth>
        }
      />
      <Route
        path="/vehicles/approved-vehicles"
        element={
          <IsAuth>
            <ApprovedVehicles />
          </IsAuth>
        }
      />
      <Route
        path="/forgot-password/:name"
        element={
          <>
            <PageTitle title="Forgot Password | Home Access Manager" />
            <ForgotPassword />
          </>
        }
      />
      <Route
        path="/reset-password/:name"
        element={
          <>
            <PageTitle title="Reset Password | Home Access Manager" />
            <ResetPassword />
          </>
        }
      />
      <Route
        path="/calendar"
        element={
          <>
            <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Calendar />
          </>
        }
      />
      {/* //------------------------Community Alert----------------// */}
      <Route
        path="/alerts/found-items"
        element={
          <IsAuth>
            <FoundItem />
          </IsAuth>
        }
      />
      <Route
        path="/alerts/found-items/found-item-detail"
        element={
          <IsAuth>
            <FoundItemDetail />
          </IsAuth>
        }
      />

      <Route
        path="/alerts/lost-items/lost-item-detail"
        element={
          <IsAuth>
            <LostItemDetail />
          </IsAuth>
        }
      />

      <Route
        path="/alerts/lost-items"
        element={
          <IsAuth>
            <LostItem />
          </IsAuth>
        }
      />
      <Route
        path="/alerts/community-alerts"
        element={
          <IsAuth>
            <Alert />
          </IsAuth>
        }
      />
      <Route
        path="/alerts/alert-detail"
        element={
          <IsAuth>
            <AlertDetail />
          </IsAuth>
        }
      />

      {/* //------------------------Featured----------------// */}
      <Route
        path="/super-admin/featured/added-featured"
        element={
          <IsAuth>
            <Featured />
          </IsAuth>
        }
      />

      <Route
        path="/super-admin/featured/add-featured"
        element={
          <IsAuth>
            <AddFeatured />
          </IsAuth>
        }
      />

      <Route
        path="/super-admin/featured/update-featured"
        element={
          <IsAuth>
            <UpdateFeatured />
          </IsAuth>
        }
      />

      {/* //------------------------Meeting----------------// */}
      <Route
        path="/meeting/added-meeting"
        element={
          <IsAuth>
            <Meeting />
          </IsAuth>
        }
      />

      <Route
        path="/meeting/meeting-detail"
        element={
          <IsAuth>
            <MeetingDetail />
          </IsAuth>
        }
      />

      <Route
        path="/meeting/add-meeting"
        element={
          <IsAuth>
            <AddMeeting />
          </IsAuth>
        }
      />

      {/* //------------------------Community Leader----------------// */}
      <Route
        path="/community-leader"
        element={
          <IsAuth>
            <CommunityLeader />
          </IsAuth>
        }
      />

      <Route
        path="/add-community-leader"
        element={
          <IsAuth>
            <AddCommunityLeader />
          </IsAuth>
        }
      />
      <Route
        path="/community-leader/detail"
        element={
          <IsAuth>
            <CommunityLeaderDetail />
          </IsAuth>
        }
      />

      {/* //--------------------------------------------Security Guard-----------------------------------------// */}

      <Route
        path="/security-guard/visitors-menu"
        element={
          <IsAuth>
            <VisitorsMenu />
          </IsAuth>
        }
      />
      <Route
        path="/security-guard/incoming-visitors"
        element={
          <IsAuth>
            <IncomingVisitors />
          </IsAuth>
        }
      />


      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />}></Route>

      {/* <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        /> */}
      <Route
        path="/forms/form-elements"
        element={
          <>
            <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <FormElements />
          </>
        }
      />
      <Route
        path="/forms/form-layout"
        element={
          <>
            <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <FormLayout />
          </>
        }
      />
      <Route
        path="/tables"
        element={
          <>
            <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Tables />
          </>
        }
      />
      <Route
        path="/super-admin/profile"
        element={
          <IsAuth>
            <DefaultLayout>
              <PageTitle title="Profile | Home Access Manager" />
              <ProfileDetail />
            </DefaultLayout>
          </IsAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <IsAuth>
            <AdminLayout>
              <PageTitle title="Profile | Home Access Manager" />
              <AdminProfile />
            </AdminLayout>
          </IsAuth>
        }
      />
      <Route
        path="/chart"
        element={
          <>
            <PageTitle title="Basic Chart |  Home Access Manager" />
            <Chart />
          </>
        }
      />
      <Route
        path="/ui/alerts"
        element={
          <>
            <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Alerts />
          </>
        }
      />
      <Route
        path="/ui/buttons"
        element={
          <>
            <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Buttons />
          </>
        }
      />
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SignUp />
          </>
        }
      />
    </Routes>
    // </DefaultLayout>
  );
}

export default App;
