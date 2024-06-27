import React from 'react';
import './../node_modules/tailwindcss/tailwind.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ParentLogin from './pages/login/ParentLogin';
import ChildLogin from './pages/login/ChildLogin';
import ParentRegister from './pages/ParentRegister';
import ChildRegister from './pages/ChildRegister';
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
import NoAccess from './components/routes/NoAccess';
import ParentRouter from './components/routes/ParentRouter';
import ChildRouter from './components/routes/ChildRouter';
import ForceRedirect from './components/routes/ForceRedirect';

import jwt_decode from 'jwt-decode';
import store from './redux/store';
import { setUser } from './redux/actions/authActions';
import { useSelector } from 'react-redux';
import ConnectAccount from './pages/connect/ConnectAccount';

import { Toaster } from 'react-hot-toast';
import PrivateRouter from './components/routes/PrivateRouter';
import InsertConnectCode from './pages/connect/InsertConnectCode';
import DetailGeofencing from './pages/location/DetailGeofencing';
import EditGeofencing from './pages/location/EditGeofencing';
import SelectChildSchedule from './pages/location/SelectChildSchedule';
import GoogleMapsWrapper from './wrappers/GoogleMapsWrapper';
import { LocationProvider } from './context/LocationContext';
import ShowChildCode from './pages/connect/ShowChildCode';
import ScanQRCode from './pages/connect/ScanQRCode';

if (localStorage.jwt) {
  const decode = jwt_decode(localStorage.jwt);
  store.dispatch(setUser(decode));
}

function App() {
  const auth = useSelector((state) => state.auth);

  const username = localStorage.getItem('username');
  const fullname = localStorage.getItem('fullname');

  const user = {
    isConnected: auth?.isConnected || false,
    role: auth?.user?.role || '',
    parentId: auth?.user?.user?._id || '',
    username: username || '',
    fullname: fullname || ''
  };

  // console.log(user);

  return (
    <div className="font-poppins">
      <LocationProvider user={user}>
        <BrowserRouter>
          <Toaster
            position="top-center"
            containerStyle={
              {
                // top: '40px'
              }
            }
            toastOptions={{
              duration: 5000,
              style: {
                minHeight: '60px',
                minWidth: '300px',
                background: '#F5F3FF',
                fontWeight: '600'
                // color: '#555c5d',
                // fontSize: '1rem'
              }
            }}
          />
          <Routes>
            {/* -------------- routes baru start -------------- */}
            {/* ------ general routes (unprotected)*/}
            <Route path="/" element={<LandingPage />} />
            <Route path="/tutorial" element={<TutorialPage />} />
            <Route path="/pilihperan" element={<SelectRole />} />
            <Route path="/daftar/orangtua" element={<ParentRegister />} />
            <Route path="/daftar/anak" element={<ChildRegister />} />
            {/* <Route path="/sheettrial" element={<BottomSheetTrial />} /> */}
            {/* <Route path="/trial" element={<Trial />} /> */}
            {/* <Route path="/popuptrial" element={<PopUpTrial />} /> */}

            {/* ------ errors routes (unprotected)*/}
            <Route path="*" element={<NotFound />} />
            <Route path="/noaccess" element={<NoAccess />} />

            {/* ------ private (parent & child) routes start (protected) */}
            <Route
              path="/profil"
              element={
                <PrivateRouter user={user}>
                  <Profile user={user} />
                </PrivateRouter>
              }
            />
            <Route
              path="/editprofil"
              element={
                <PrivateRouter user={user}>
                  <EditProfile user={user} />
                </PrivateRouter>
              }
            />
            <Route
              path="/profil/hapusakun"
              element={
                <PrivateRouter user={user}>
                  <ConfirmDelete user={user} />
                </PrivateRouter>
              }
            />
            {/* ------private routes end */}

            {/* ------ parent routes start (protected) */}
            <Route
              path="/masuk/orangtua"
              element={
                <ForceRedirect user={user}>
                  <ParentLogin />
                </ForceRedirect>
              }
            />
            <Route
              path="/beranda/orangtua"
              element={
                <ParentRouter user={user}>
                  <ParentHomeV2 user={user} />
                </ParentRouter>
              }
            />
            <Route
              path="/orangtua/hubungkan"
              element={
                <ParentRouter user={user}>
                  <ConnectAccount user={user} />
                </ParentRouter>
              }
            />
            <Route
              path="/orangtua/hubungkan/scan"
              element={
                <ParentRouter user={user}>
                  <ScanQRCode user={user} />
                </ParentRouter>
              }
            />

            <Route
              path="/jadwalgeofence"
              element={
                <ParentRouter user={user}>
                  <SelectChildSchedule user={user} />
                </ParentRouter>
              }
            />
            <Route
              path="/notifikasi"
              element={
                <ParentRouter user={user}>
                  <NotificationPage user={user} />
                </ParentRouter>
              }
            />
            <Route
              path="/tambahgeofence/:childUsername"
              element={
                <ParentRouter user={user}>
                  <GoogleMapsWrapper>
                    <AddGeofencing user={user} />
                  </GoogleMapsWrapper>
                </ParentRouter>
              }
            />
            <Route
              path="/detailgeofence/:geofenceId"
              element={
                <ParentRouter user={user}>
                  <GoogleMapsWrapper>
                    <DetailGeofencing user={user} />
                  </GoogleMapsWrapper>
                </ParentRouter>
              }
            />
            <Route
              path="/editgeofence/:geofenceId"
              element={
                <ParentRouter user={user}>
                  <GoogleMapsWrapper>
                    <EditGeofencing user={user} />
                  </GoogleMapsWrapper>
                </ParentRouter>
              }
            />
            <Route
              path="/detailposisi/:childUsername"
              element={
                <ParentRouter user={user}>
                  <GoogleMapsWrapper>
                    <PositionDetailV2 user={user} />
                  </GoogleMapsWrapper>
                </ParentRouter>
              }
            />
            <Route
              path="/kelolajadwal/:childUsername"
              element={
                <ParentRouter user={user}>
                  <GeofSchedule user={user} />
                </ParentRouter>
              }
            />
            {/* ------parent routes end */}

            {/* ------ child routes start (protected)*/}
            <Route
              path="/masuk/anak"
              element={
                <ForceRedirect user={user}>
                  <ChildLogin />
                </ForceRedirect>
              }
            />
            <Route
              path="/beranda/anak"
              element={
                <ChildRouter user={user}>
                  <GoogleMapsWrapper>
                    <ChildHomeV2 user={user} />
                  </GoogleMapsWrapper>
                </ChildRouter>
              }
            />
            <Route
              path="/anak/hubungkan"
              element={
                <ChildRouter user={user}>
                  <ShowChildCode user={user} />
                </ChildRouter>
              }
            />
            <Route
              path="/anak/hubungkan/masukkankode"
              element={
                <ChildRouter user={user}>
                  <InsertConnectCode user={user} />
                </ChildRouter>
              }
            />
            {/* ------ child routes end */}

            {/* -------------- routes baru end -------------- */}
          </Routes>
        </BrowserRouter>
      </LocationProvider>
    </div>
  );
}

export default App;
