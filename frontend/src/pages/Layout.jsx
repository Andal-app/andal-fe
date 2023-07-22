import React from 'react';
import TopNavigation from '../components/TopNavigation';
import LeftNavigation from '../components/LeftNavigation';

const Layout = ({ children }) => {
  return (
    <>
      <div className="cuti-app">
        <header>
          <TopNavigation />
        </header>
        <div id="layoutSidenav">
          <div id="layoutSidenav_content">
            <main>
              <LeftNavigation />
              <div className="container-fluid px-4">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
