import React from 'react';
import TutorialImg from '../../assets/images/tutorial.svg';
import Blob1 from '../../assets/shapes/blob_1.svg';
import Blob2 from '../../assets/shapes/blob_2.svg';
import RingDouble from '../../assets/shapes/ring_double.svg';
import VectorZigzag from '../../assets/vectors/vector_zigzag.svg';
import VectorPlus from '../../assets/vectors/vector_plus.svg';
import TopWave1 from '../../assets/waves/wave_top_1.svg';

function BasicLayout({ children }) {
  return (
    <div id="main__container" className="z-0 h-screen flex justify-center items-center">
      {/* background start */}
      <style>
        {`
      body {
        overflow: hidden;
      }
    `}
      </style>

      <div className="hidden absolute z-10 lg:flex w-full h-screen">
        <div className="basis-1/2 bg-violet-400"></div>
        <div className="basis-1/2 bg-white"></div>
      </div>
      {/* background end */}

      {/* decorations start */}
      {/* top wave decoration start */}
      <div className="z-50 lg:hidden fixed top-0 left-0 right-0 w-full">
        <img src={TopWave1} className="w-full" />
      </div>
      {/* top wave decoration end */}

      <div className="hidden lg:block">
        <div className="absolute z-20 left-[-50px] bottom-[-110px]">
          <img src={Blob1} className="w-80" />
        </div>
        <div className="absolute z-20 right-[-50px] top-[-110px]">
          <img src={Blob2} className="w-80" />
        </div>
        <div className="absolute z-20 right-[-120px] bottom-[-200px]">
          <img src={RingDouble} className="w-[450px]" />
        </div>
        <div className="absolute z-40 left-14 top-32">
          <img src={VectorZigzag} className="w-32" />
        </div>
        <div className="absolute z-40 left-[800px] top-10">
          <img src={VectorPlus} className="w-24" />
        </div>
      </div>
      {/* decorations end */}

      {/* main box start */}
      <main
        id="main__box"
        className="z-30 bg-white flex justify-center w-screen h-screen lg:w-[85%] lg:h-[80%] lg:rounded-3xl lg:drop-shadow-2xl overflow-hidden"
      >
        {children}
      </main>
      {/* main box end */}
    </div>
  );
}

export default BasicLayout;
