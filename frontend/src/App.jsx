import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ParentLogin from './pages/ParentLogin';
import ChildLogin from './pages/ChildLogin';
import ParentRegister from './pages/ParentRegister';
import ChildRegister from './pages/ChildRegister';
import ParentHome from './pages/ParentHome';
import ChildHome from './pages/ChildHome';
import History from './pages/History';
import LokasiAnak from './pages/LokasiAnak';
import Geofencing from './pages/Geofencing';
// import { useGlobalState } from './state/index.js';

function App() {
  // const [isLogin] = useGlobalState('isLogin');
  // console.log(isLogin);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/parent/login" element={<ParentLogin />} />
        <Route path="/child/childlogin" element={<ChildLogin />} />
        <Route path="/parent/register" element={<ParentRegister />} />
        <Route path="/child/register" element={<ChildRegister />} />
        <Route path="/child/home" element={<ChildHome />} />
        <Route path="/parent/home" element={<ParentHome />} />
        <Route path="/parent/history" element={<History />} />
        <Route path="/parent/lokasianak" element={<LokasiAnak />} />
        <Route path="/parent/geofencing" element={<Geofencing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
