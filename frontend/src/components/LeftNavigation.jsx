import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaHistory, FaSignOutAlt, FaBell } from 'react-icons/fa';

function LeftNavigation({ setShowModal, roleTitle }) {
  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Main Menu</div>
            {roleTitle === 'Parent' ? (
              <NavLink to="/parent/home" className="nav-link">
                <div className="sb-nav-link-icon">
                  <FaHome />
                </div>
                Home
              </NavLink>
            ) : (
              <NavLink to="/child/home" className="nav-link">
                <div className="sb-nav-link-icon">
                  <FaHome />
                </div>
                Home
              </NavLink>
            )}
            {roleTitle === 'Parent' && (
              <>
                <NavLink to="/parent/history" className="nav-link">
                  <div className="sb-nav-link-icon">
                    <FaHistory />
                  </div>
                  Geofence History
                </NavLink>
                <NavLink to="/parent/notification_history" className="nav-link">
                  <div className="sb-nav-link-icon">
                    <FaBell />
                  </div>
                  Notification History
                </NavLink>
              </>
            )}
            <div className="sb-sidenav-menu-heading">Settings</div>
            <a className="nav-link">
              <div className="sb-nav-link-icon">
                <FaSignOutAlt />
              </div>
              <button
                onClick={() => {
                  setShowModal({ show: true });
                }}
                onKeyDown={(e) => e.key === 'Escape' && setShowModal({ show: false })}
                className="btn-logout"
              >
                Logout
              </button>
            </a>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          {localStorage.getItem('username')}
        </div>
      </nav>
    </div>
  );
}

export default LeftNavigation;
