import React from 'react';
import './../node_modules/tailwindcss/tailwind.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ParentLogin from './pages/login/ParentLogin';
import ChildLogin from './pages/login/ChildLogin';
import ParentRegister from './pages/ParentRegister';
import ChildRegister from './pages/ChildRegister';
import ParentHome from './pages/ParentHome';
import ChildHome from './pages/ChildHome';
import ParentGeofencingHistory from './pages/ParentGeofencingHistory';
import ParentHistory from './pages/ParentHistory';
import ParentNotificationHistory from './pages/ParentNotificationHistory';
import ParentNotification from './pages/ParentNotification';
import ParentChildLocation from './pages/ParentChildLocation';
import ParentGeofencing from './pages/ParentGeofencing';
import PrivateRoute from './routes/PrivateRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import Profile from './pages/profile/Profile';
import Trial from './pages/Trial';
import EditProfile from './pages/profile/EditProfile';
import ConfirmDelete from './pages/alert/ConfirmDelete';
import SelectRole from './pages/SelectRole';
import LandingPage from './pages/general/LandingPage';
import TutorialPage from './pages/general/TutorialPage';
import ParentHomeV2 from './pages/home/ParentHomeV2';
import ChildHomeV2 from './pages/home/ChildHomeV2';
import PositionDetailV2 from './pages/location/PositionDetailV2';
import BottomSheetTrial from './pages/BottomSheetTrial';
import AddGeofencing from './pages/location/AddGeofencing';

function App() {
  return (
    <div className="font-poppins">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<LandingPage />} />
            <Route path="/app/tutorial" element={<TutorialPage />} />
            <Route path="/selectrole" element={<SelectRole />} />
            <Route path="/parent/login" element={<ParentLogin />} />
            <Route path="/child/childlogin" element={<ChildLogin />} />
            <Route path="/parent/register" element={<ParentRegister />} />
            <Route path="/child/register" element={<ChildRegister />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/trial" element={<Trial />} />
            <Route path="/sheettrial" element={<BottomSheetTrial />} />
            <Route path="/deleteaccount" element={<ConfirmDelete />} />

            <Route path="/child/home" element={<ChildHome />} />
            <Route path="/child/home/v2" element={<ChildHomeV2 />} />
            <Route path="/parent/home" element={<ParentHome />} />
            <Route path="/parent/home/v2" element={<ParentHomeV2 />} />
            <Route path="/parent/history" element={<ParentGeofencingHistory />} />
            <Route path="/parent/history/:childname" element={<ParentHistory />} />
            <Route path="/parent/notification_history" element={<ParentNotificationHistory />} />
            <Route path="/parent/notification_history/:childname" element={<ParentNotification />} />
            <Route path="/parent/lokasianak/:childname" element={<ParentChildLocation />} />
            <Route path="/tambahlokasi/v2" element={<AddGeofencing />} />
            <Route path="/parent/positiondetail/v2" element={<PositionDetailV2 />} />
            <Route path="/parent/geofencing/:childname" element={<ParentGeofencing />} />
          </Route>
          <Route element={<PrivateRoute />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
