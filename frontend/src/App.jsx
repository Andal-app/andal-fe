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

function App() {
  return (
    <div className="font-poppins">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<LandingPage />} />
            <Route path="/app/tutorial" element={<TutorialPage />} />
            <Route path="/app/pilihperan" element={<SelectRole />} />
            <Route path="/app/orangtua/masuk" element={<ParentLogin />} />
            <Route path="/app/anak/masuk" element={<ChildLogin />} />
            <Route path="/app/orangtua/daftar" element={<ParentRegister />} />
            <Route path="/app/anak/daftar" element={<ChildRegister />} />
            <Route path="/app/profil" element={<Profile />} />
            <Route path="/app/editprofil" element={<EditProfile />} />
            <Route path="/trial" element={<Trial />} />
            <Route path="/sheettrial" element={<BottomSheetTrial />} />
            <Route path="/app/hapusakun" element={<ConfirmDelete />} />
            <Route path="/popuptrial" element={<PopUpTrial />} />
            <Route path="/app/notifikasi" element={<NotificationPage />} />
            <Route path="/app/orangtua/riwayat" element={<GeofSchedule />} />

            <Route path="/anak/beranda" element={<ChildHome />} />
            <Route path="/app/anak/beranda/v2" element={<ChildHomeV2 />} />
            <Route path="/orangtua/beranda" element={<ParentHome />} />
            <Route path="/app/orangtua/beranda/v2" element={<ParentHomeV2 />} />
            <Route path="/parent/riwayat" element={<ParentGeofencingHistory />} />
            <Route path="/parent/history/:childname" element={<ParentHistory />} />
            <Route path="/parent/notification_history" element={<ParentNotificationHistory />} />
            <Route path="/parent/notification_history/:childname" element={<ParentNotification />} />
            <Route path="/parent/lokasianak/:childname" element={<ParentChildLocation />} />
            <Route path="/app/tambahlokasi/v2" element={<AddGeofencing />} />
            <Route path="/app/orangtua/detailposisi/v2" element={<PositionDetailV2 />} />
            <Route path="/parent/geofencing/:childname" element={<ParentGeofencing />} />
          </Route>
          <Route element={<PrivateRoute />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
