import React from 'react';

import Tutorial from '../../components/tutorial/Tutorial';
import BasicLayout from '../../layouts/general/BasicLayout';

import TutorialImg from '../../assets/images/tutorial.svg';
import OvalNextBtn from '../../components/buttons/OvalNextBtn';

function TutorialPage() {
  return (
    <BasicLayout>
      <Tutorial imgSrc={TutorialImg} />

      {/* lewati button start */}
      <OvalNextBtn text="Lewati" to="" />
      {/* lewati button end */}
    </BasicLayout>
  );
}

export default TutorialPage;
