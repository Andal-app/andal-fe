import React from 'react';
import Tutorial from '../../components/tutorial/Tutorial';
import BasicLayout from '../../layouts/general/BasicLayout';
import OvalNextBtn from '../../components/buttons/OvalNextBtn';
import TutorialImg from '../../assets/images/tutorial.svg';
import { Link } from 'react-router-dom';

function TutorialPage() {
  return (
    <BasicLayout>
      <div className="h-full lg:mt-0 flex flex-col justify-center items-center gap-36 lg:gap-0">
        {/* lewati button start*/}
        <Link
          to="/pilihperan"
          className="block lg:hidden text-b-xl font-semibold text-violet-500 text-end w-[85%] mb-4 mt-24"
        >
          Lewati
        </Link>
        {/* lewati button end*/}

        <Tutorial imgSrc={TutorialImg} />

        {/* lewati button start (LARGE SCREEN) */}
        <div className="hidden lg:block">
          <OvalNextBtn text={'Lewati'} linkTo="/pilihperan" />
        </div>
        {/* lewati button end */}
      </div>
    </BasicLayout>
  );
}

export default TutorialPage;
