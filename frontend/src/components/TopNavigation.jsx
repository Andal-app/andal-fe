import React from 'react';
import { FaBars } from 'react-icons/fa';
import Logo from '../assets/images/logo.png';

function TopNavigation({ roleTitle }) {
  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* <!-- Navbar Brand--> */}
        {roleTitle === 'Parent' ? (
          <a className="navbar-brand order-2" href="/parent/home">
            <img className="logo" src={Logo} />
            Andal
          </a>
        ) : (
          <a className="navbar-brand order-2" href="/child/home">
            <img className="logo" src={Logo} />
            Andal
          </a>
        )}
        {/* <!-- Sidebar Toggle--> */}
        <button
          className="btn btn-link btn-sm order-1 me-4 me-lg-0"
          id="sidebarToggle"
          onClick={() => document.body.classList.toggle('sb-sidenav-toggled')}
        >
          <FaBars />
        </button>
        <form className="d-none d-md-inline-block ms-auto me-0 me-md-3 my-2 my-md-0 order-3"></form>
      </nav>
    </>
  );
}

export default TopNavigation;
