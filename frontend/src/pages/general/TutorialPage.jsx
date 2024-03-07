import React from 'react';
import Tutorial from '../../components/tutorial/Tutorial';
import BasicLayout from '../../layouts/general/BasicLayout';
import OvalNextBtn from '../../components/buttons/OvalNextBtn';
import TutorialImg from '../../assets/images/tutorial.svg';

function TutorialPage() {
  return (
    <BasicLayout>
      <div className="h-full mt-10 lg:mt-0 flex flex-col lg:justify-center items-center">
        {/* lewati button start*/}
        <div className="block lg:hidden text-b-md font-semibold text-violet-500 text-end w-[85%] mb-4 mr-4">Lewati</div>
        {/* lewati button end*/}

        <Tutorial imgSrc={TutorialImg} />

        {/* lewati button start */}
        <div className="hidden lg:block">
          <OvalNextBtn text="Lewati" linkTo="/pilihperan" />
        </div>
        {/* lewati button end */}
      </div>
    </BasicLayout>
  );
}

export default TutorialPage;
