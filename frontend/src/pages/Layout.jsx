import React from 'react';
import TopNavigation from '../components/TopNavigation';
import LeftNavigation from '../components/LeftNavigation';

const Layout = ({ children, roleTitle }) => {
  return (
    <>
      <div className="cuti-app">
        <header>
          <TopNavigation roleTitle={roleTitle} />
        </header>
        <div id="layoutSidenav">
          <div id="layoutSidenav_content">
            <main>
              <LeftNavigation roleTitle={roleTitle} />
              <div className="container-fluid px-4">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
