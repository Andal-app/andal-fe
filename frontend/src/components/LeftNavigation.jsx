import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaBell, FaMap, FaSignOutAlt, FaUser, FaEdit } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Logout, reset } from '../features/authSlice';
import { useGlobalState } from '../state/index.js';

function LeftNavigation() {
  // const [isLogin, setIsLogin] = useGlobalState('isLogin');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(Logout());
    dispatch(reset());
    navigate('/');
    // setIsLogin(false);
  };

  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Main Menu</div>
            <NavLink to="/home" className="nav-link">
              <div className="sb-nav-link-icon">
                <FaHome />
              </div>
              Home
            </NavLink>
            <NavLink to="/notifikasi" className="nav-link">
              <div className="sb-nav-link-icon">
                <FaBell />
              </div>
              Notification
            </NavLink>
            <NavLink to="/lokasianak" className="nav-link">
              <div className="sb-nav-link-icon">
                <FaMap />
              </div>
              Child Location
            </NavLink>
            <NavLink to="/geofencing" className="nav-link">
              <div className="sb-nav-link-icon">
                <FaMapLocationDot />
              </div>
              Geofencing
            </NavLink>
            {/* {user && user.role === 'Kepegawaian' && (
              <>
                <div className="sb-sidenav-menu-heading">Admin</div>
                <NavLink to="/users" className="nav-link">
                  <div className="sb-nav-link-icon">
                    <FaUser />
                  </div>
                  Daftar Pegawai
                </NavLink>
              </>
            )} */}
            <div className="sb-sidenav-menu-heading">Settings</div>
            {/* <NavLink to={`/users/edit/${user && user.uuid}`} className="nav-link">
              <div className="sb-nav-link-icon">
                <FaEdit />
              </div>
              Edit Profile
            </NavLink> */}
            <a className="nav-link">
              <div className="sb-nav-link-icon">
                <FaSignOutAlt />
              </div>
              <button onClick={logout} className="btn-logout">
                Logout
              </button>
            </a>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          {user && user} <br />
        </div>
      </nav>
    </div>
  );
}

export default LeftNavigation;
