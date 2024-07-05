import React from 'react';
import BasicLayout from './general/BasicLayout';
import TutorialImg from '../assets/images/tutorial.svg';
import TopWave1 from '../assets/waves/wave_top_1.svg';
import Tutorial from '../components/tutorial/Tutorial';

function LoginLayout({ children }) {
  return (
    <BasicLayout>
      <div id="left__pane__container" className="hidden lg:w-1/2 lg:flex justify-center items-center px-16">
        {/* tutorial start */}
        <Tutorial imgSrc={TutorialImg} />
        {/* tutorial end */}
      </div>

      <div id="right__pane__container" className="h-screen w-full lg:w-1/2 flex justify-center items-center">
        {/* top wave decoration start */}
        <div className="z-50 lg:hidden fixed top-0 left-0 right-0 w-full">
          <img src={TopWave1} alt="Top Wave 1" className="w-full" />
        </div>
        {/* top wave decoration end */}

        {/* right pane content start */}
        {children}
        {/* right pane content end */}
      </div>
    </BasicLayout>
  );
}

export default LoginLayout;
