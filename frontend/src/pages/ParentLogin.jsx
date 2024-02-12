import React from 'react';

import TutorialImg from '../assets/images/tutorial.svg';
import Blob1 from '../assets/shapes/blob_1.svg';
import Blob2 from '../assets/shapes/blob_2.svg';
import RingDouble from '../assets/shapes/ring_double.svg';
import VectorZigzag from '../assets/vectors/vector_zigzag.svg';
import VectorPlus from '../assets/vectors/vector_plus.svg';
import TopWave1 from '../assets/waves/wave_top_1.svg';
import TextInput from '../components/inputs/TextInput';
import InputLabel from '../components/inputs/InputLabel';
import PasswordInput from '../components/inputs/PasswordInput';
import ForgotPass from '../components/buttons/ForgotPass';
import SubmitBtn from '../components/buttons/SubmitBtn';
import RegisterNowBtn from '../components/buttons/RegisterNowBtn';
import Tutorial from '../components/tutorial/Tutorial';

const ParentLogin = () => {
  return (
    <div>
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

        <div
          id="main__box"
          className="z-30 bg-white flex w-screen h-screen lg:w-[85%] lg:h-[80%] px-6 py-20 lg:p-14 lg:rounded-3xl lg:drop-shadow-2xl"
        >
          <div id="left__pane__container" className="hidden lg:basis-1/2 lg:flex justify-center items-center px-16">
            {/* tutorial start */}
            <Tutorial imgSrc={TutorialImg} />
            {/* tutorial end */}
          </div>

          <div id="right__pane__container" className="w-full lg:basis-1/2 flex justify-center items-end">
            {/* login start */}
            <div className="w-full lg:w-[60%] lg:h-full flex flex-col items-center justify-center">
              {/* logo start */}
              <a href="#" className="hidden lg:flex items-center mb-6 bg-violet-300 rounded-full">
                <div className="h-32 w-32 rounded-full"></div>
              </a>
              {/* logo end */}

              {/* greetings and form start */}
              <div className="w-full bg-white">
                <div className="">
                  <h1 className="text-b-lg mb-12 lg:mb-5">
                    Halo, <br /> Selamat datang kembali
                  </h1>

                  <form className="w-full" action="#">
                    <div id="form__inputs" className="space-y-4 my-4">
                      {/* email start */}
                      <div>
                        <InputLabel labelFor="email" content="Email" />
                        <TextInput
                          type="email"
                          name="email"
                          id="email"
                          placeholder="fiorenza@xmail.com"
                          required="true"
                        />
                      </div>
                      {/* email end */}

                      {/* password start */}
                      <div className="space-y-1">
                        <div>
                          <InputLabel labelFor="password" content="Password" />
                          <PasswordInput />
                        </div>
                        {/* lupa password start */}
                        <div>
                          <ForgotPass />
                        </div>
                        {/* lupa password end */}
                      </div>
                      {/* password end */}
                    </div>

                    {/* submit button start */}
                    <div className="my-4 mt-10">
                      <SubmitBtn />
                    </div>
                    {/* submit button end */}

                    {/* sign up? start */}
                    <div>
                      <RegisterNowBtn />
                    </div>
                    {/* sign up? end */}
                  </form>
                </div>
              </div>
            </div>

            {/* login end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentLogin;
