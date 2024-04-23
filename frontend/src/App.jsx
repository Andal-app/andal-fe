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
import PopUpTrial from './pages/PopUpTrial';
import NotificationPage from './pages/general/NotificationPage';
import GeofSchedule from './pages/location/GeofSchedule';
import NotFound from './components/routes/NotFound';
import PrivateRouter from './components/routes/PrivateRouter';
import NoAccess from './components/routes/NoAccess';
import ParentRouter from './components/routes/ParentRouter';
import ForceRedirect from './components/routes/ForceRedirect';

function App() {
  const user = {
    isConnected: false,
    role: 'parent'
  };

  return (
    <div className="font-poppins">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/tutorial" element={<TutorialPage />} />
            <Route path="/pilihperan" element={<SelectRole />} />
            <Route path="/daftar/orangtua" element={<ParentRegister />} />
            <Route path="/daftar/anak" element={<ChildRegister />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/editprofil" element={<EditProfile />} />
            <Route path="/trial" element={<Trial />} />
            <Route path="/sheettrial" element={<BottomSheetTrial />} />
            <Route path="/profil/hapusakun" element={<ConfirmDelete />} />
            <Route path="/popuptrial" element={<PopUpTrial />} />
            <Route path="/notifikasi" element={<NotificationPage />} />
            <Route path="/riwayat" element={<GeofSchedule />} />
            <Route path="/anak/beranda" element={<ChildHome />} />
            <Route path="/orangtua/beranda" element={<ParentHome />} />
            <Route path="/parent/history" element={<ParentGeofencingHistory />} />
            <Route path="/parent/history/:childname" element={<ParentHistory />} />
            <Route path="/parent/notification_history" element={<ParentNotificationHistory />} />
            <Route path="/parent/notification_history/:childname" element={<ParentNotification />} />
            <Route path="/parent/lokasianak/:childname" element={<ParentChildLocation />} />
            <Route path="/tambahlokasi/v2" element={<AddGeofencing />} />
            <Route path="/posisianak/v2" element={<PositionDetailV2 />} />
            <Route path="/parent/geofencing/:childname" element={<ParentGeofencing />} />

            <Route path="*" element={<NotFound />} />
            <Route path="/noaccess" element={<NoAccess />} />

            <Route
              path="/beranda/orangtua/v2"
              element={
                <ParentRouter user={user}>
                  <ParentHomeV2 />
                </ParentRouter>
              }
            />
            <Route
              path="/beranda/anak/v2"
              element={
                <PrivateRouter user={user}>
                  <ChildHomeV2 />
                </PrivateRouter>
              }
            />
            <Route
              path="/masuk/orangtua"
              element={
                <ForceRedirect user={user}>
                  <ParentLogin />
                </ForceRedirect>
              }
            />
            <Route
              path="/masuk/anak"
              element={
                <ForceRedirect user={user}>
                  <ChildLogin />
                </ForceRedirect>
              }
            />
          </Route>

          {/* <Route
            path="/beranda/anak/v2"
            element={
              <PrivateRouter user={user}>
                <ChildHomeV2 />
              </PrivateRouter>
            }
          /> */}

          <Route element={<PrivateRoute />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
