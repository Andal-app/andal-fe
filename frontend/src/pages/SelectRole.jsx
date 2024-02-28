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
import BasicLayout from '../layouts/general/BasicLayout';
import Tutorial from '../components/tutorial/Tutorial';

import TutorialImg from '../assets/images/tutorial.svg';

function SelectRole() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(resetChild());
  }, []);

  return (
    <BasicLayout>
      <div id="left__pane__container" className="hidden lg:basis-1/2 lg:flex justify-center items-center px-16">
        {/* tutorial start */}
        <Tutorial imgSrc={TutorialImg} />
        {/* tutorial end */}
      </div>

      <div
        id="right__pane__container"
        className="bg-red-300 w-full lg:basis-1/2 h-screen lg:h-min flex justify-center items-end"
      >
        {/* right pane content start */}
        {/* role__container start */}
        <div id="role__container" className="bg-red-200 my-24 flex flex-col items-center gap-y-6 w-10/12">
          {/* role__title start */}
          <div id="role__title">
            <h3 className="text-h-lg font-bold text-violet-900 text-start lg:text-center">Pilih Peran</h3>
          </div>
          {/* role__title end */}

          {/* role__content start */}
          <main id="role__content" className="bg-violet-50 flex flex-col gap-8 w-full lg:w-[70%]">
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
        {/* right pane content end */}
      </div>
    </BasicLayout>
  );
}

export default SelectRole;
