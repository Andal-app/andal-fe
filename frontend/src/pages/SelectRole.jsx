import React, { useEffect } from 'react';
import { MdPersonOutline, MdChildCare } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { reset } from '../features/parentSlice';
import { resetChild } from '../features/childSlice';
import RoleBox from '../components/role/RoleBox';

import RoleOrangtua from '../assets/images/role_orangtua.svg';
import RoleAnak from '../assets/images/role_anak.svg';
import BottomWave from '../assets/waves/wave_bottom_1.svg';

function SelectRole() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(resetChild());
  }, []);

  return (
    <div className="flex justify-center h-screen">
      {/* role__container start */}
      <div id="role__container" className="my-24 flex flex-col gap-y-6 w-10/12">
        {/* role__title start */}
        <div id="role__title">
          <h3 className="text-h-lg font-bold text-violet-900">Pilih Peran</h3>
        </div>
        {/* role__title end */}

        {/* role__content start */}
        <main id="role__content" className="flex flex-col gap-8">
          <RoleBox
            link="/parent/login"
            id="box__parents"
            imgSrc={RoleOrangtua}
            imgAlt="Role Orang Tua"
            title="Orang Tua"
            detail="Pantau posisi anak untuk menjaga keamanan anak"
          />
          <RoleBox
            link="/child/childlogin"
            id="box__child"
            imgSrc={RoleAnak}
            imgAlt="Role Anak"
            title="Anak"
            detail="Kirim lokasi ke orang tua untuk keamanan diri"
          />
        </main>

        {/* role__content end */}
      </div>
      {/* role__container end */}

      {/* wave footer start */}
      <div className="fixed bottom-0 left-0 w-full">
        <img src={BottomWave} className="w-full" />
      </div>
      {/* wave footer end */}
    </div>
  );
}

export default SelectRole;
