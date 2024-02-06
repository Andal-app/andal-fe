import React, { useEffect } from 'react';
import { MdPersonOutline, MdChildCare } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { reset } from '../features/parentSlice';
import { resetChild } from '../features/childSlice';

function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(resetChild());
  }, []);

  return (
    <>
      <div id="role__container">
        <div id="role__title">
          <h3>Pilih Peran</h3>
        </div>
        <main id="role__content">
          <div id="box__parents">Orang Tua</div>
          <div id="box__child">Anak</div>
        </main>
      </div>
    </>
  );
}

export default LandingPage;
