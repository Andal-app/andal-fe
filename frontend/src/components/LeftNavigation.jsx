import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaTable, FaSignOutAlt, FaUser, FaUserEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Logout, reset } from '../features/authSlice';

function LeftNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const logout = () => {
    dispatch(Logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Menu Utama</div>
            <NavLink to="/dashboard" className="nav-link">
              <div className="sb-nav-link-icon">
                <FaTachometerAlt />
              </div>
              Beranda
            </NavLink>
            <NavLink to="/pengajuan_cuti" className="nav-link">
              <div className="sb-nav-link-icon">
                <FaTable />
              </div>
              Pengajuan Cuti
            </NavLink>
            {user && user.role === 'Kepegawaian' && (
              <>
                <div className="sb-sidenav-menu-heading">Admin</div>
                <NavLink to="/users" className="nav-link">
                  <div className="sb-nav-link-icon">
                    <FaUser />
                  </div>
                  Daftar Pegawai
                </NavLink>
              </>
            )}
            <div className="sb-sidenav-menu-heading">Pengaturan</div>
            <NavLink to={`/users/edit/${user && user.uuid}`} className="nav-link">
              <div className="sb-nav-link-icon">
                <FaUserEdit />
              </div>
              Edit Profil
            </NavLink>
            <div className="nav-link">
              <div className="sb-nav-link-icon">
                <FaSignOutAlt />
              </div>
              <button onClick={logout} className="btn-logout">
                Keluar
              </button>
            </div>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Masuk sebagai:</div>
          {user && user.name} <br />
          {user && user.role}
        </div>
      </nav>
    </div>
  );
}

export default LeftNavigation;
