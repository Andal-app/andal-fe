import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TopNavigation from '../components/TopNavigation';
import LeftNavigation from '../components/LeftNavigation';
import Modal from '../components/Modal';
import { logoutParent } from '../features/parentSlice';
import { logoutChild } from '../features/childSlice';

const Layout = ({ children, roleTitle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { parent } = useSelector((state) => state.parent);
  const { child } = useSelector((state) => state.child);
  const [showModal, setShowModal] = useState({
    show: false
  });

  const logout = () => {
    if (parent) dispatch(logoutParent());
    if (child) dispatch(logoutChild());
    navigate('/');
  };

  return (
    <>
      <div className="cuti-app">
        <header>
          <TopNavigation roleTitle={roleTitle} />
        </header>
        <div id="layoutSidenav">
          <div id="layoutSidenav_content">
            <main>
              <LeftNavigation setShowModal={setShowModal} roleTitle={roleTitle} />
              <Modal
                activateFunction={logout}
                show={showModal}
                buttonShow={true}
                buttonMessage="Keluar"
                buttonColor="is-danger"
                onClose={() => setShowModal({ show: false })}
                title="Konfirmasi Logout"
              >
                Apakah Anda yakin ingin keluar?
              </Modal>
              <div className="container-fluid px-4">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
