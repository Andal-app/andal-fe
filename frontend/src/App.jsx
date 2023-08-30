import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ParentLogin from './pages/ParentLogin';
import ChildLogin from './pages/ChildLogin';
import ParentRegister from './pages/ParentRegister';
import ChildRegister from './pages/ChildRegister';
import Dashboard from './pages/Dashboard';
import PengajuanCuti from './pages/PengajuanCuti';
import Users from './pages/Users';
import EditCuti from './pages/EditCuti';
import EditUser from './pages/EditUser';
import InputCuti from './pages/InputCuti';
import { useGlobalState } from './state/index.js';

function App() {
  const [isLogin] = useGlobalState('isLogin');
  console.log(isLogin);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/parent/login" element={<ParentLogin />} />
        <Route path="/child/childlogin" element={<ChildLogin />} />
        <Route path="/parent/register" element={<ParentRegister />} />
        <Route path="/child/register" element={<ChildRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pengajuan_cuti" element={<PengajuanCuti />} />
        <Route path="/users" element={<Users />} />
        <Route path="/cuti/edit/:id" element={<EditCuti />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/users/inputcuti/:id" element={<InputCuti />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
