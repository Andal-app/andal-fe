import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EditCuti from './pages/EditCuti';
import EditUser from './pages/EditUser';
import PengajuanCuti from './pages/PengajuanCuti';
import Register from './pages/Register';
import Users from './pages/Users';
import Login from './components/Login';
import InputCuti from './pages/InputCuti';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/daftar" element={<Register />} />
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
