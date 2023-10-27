import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ParentLogin from './pages/ParentLogin';
import ChildLogin from './pages/ChildLogin';
import ParentRegister from './pages/ParentRegister';
import ChildRegister from './pages/ChildRegister';
import ParentHome from './pages/ParentHome';
import ChildHome from './pages/ChildHome';
import History from './pages/ParentHistory';
import LokasiAnak from './pages/LokasiAnak';
import Geofencing from './pages/Geofencing';
import PrivateRoute from './routes/PrivateRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import ParentSchedule from './pages/ParentSchedule';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/parent/login" element={<ParentLogin />} />
          <Route path="/child/childlogin" element={<ChildLogin />} />
          <Route path="/parent/register" element={<ParentRegister />} />
          <Route path="/child/register" element={<ChildRegister />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/child/home" element={<ChildHome />} />
          <Route path="/parent/home" element={<ParentHome />} />
          <Route path="/parent/history" element={<History />} />
          <Route path="/parent/lokasianak/:id" element={<LokasiAnak />} />
          <Route path="/parent/geofencing" element={<Geofencing />} />
          <Route path="/parent/set_schedule" element={<ParentSchedule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
