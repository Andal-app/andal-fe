import React from 'react';
import Tutorial from '../../components/tutorial/Tutorial';
import BasicLayout from '../../layouts/general/BasicLayout';

import TutorialImg from '../../assets/images/tutorial.svg';

function TutorialPage() {
  return (
    <BasicLayout>
      <Tutorial imgSrc={TutorialImg} />
    </BasicLayout>
  );
}

export default TutorialPage;
