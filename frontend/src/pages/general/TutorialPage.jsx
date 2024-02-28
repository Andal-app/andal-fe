import React from 'react';

import Tutorial from '../../components/tutorial/Tutorial';
import BasicLayout from '../../layouts/general/BasicLayout';

import TutorialImg from '../../assets/images/tutorial.svg';
import OvalNextBtn from '../../components/buttons/OvalNextBtn';

function TutorialPage() {
  return (
    <BasicLayout>
      <div className="h-full flex flex-col justify-center items-center">
        {/* lewati button start*/}
        <div className="block lg:hidden text-h-sm font-semibold text-violet-500 text-end w-[85%] mb-4 mr-4">Lewati</div>
        {/* lewati button end*/}

        <Tutorial imgSrc={TutorialImg} />

        {/* lewati button start */}
        <div className="hidden lg:block">
          <OvalNextBtn text="Lewati" to="" />
        </div>
        {/* lewati button end */}
      </div>
    </BasicLayout>
  );
}

export default TutorialPage;
