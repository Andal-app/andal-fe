import React from 'react';
import FormLogin from '../components/FormLogin';

import Tutorial from '../assets/images/tutorial.svg';
import Blob1 from '../assets/shapes/blob_1.svg';
import Blob2 from '../assets/shapes/blob_2.svg';
import RingDouble from '../assets/shapes/ring_double.svg';
import VectorZigzag from '../assets/vectors/vector_zigzag.svg';
import VectorPlus from '../assets/vectors/vector_plus.svg';
import TopWave1 from '../assets/waves/wave_top_1.svg';

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
          className="z-30 flex w-screen h-screen lg:w-[85%] lg:h-[80%] px-6 py-20 lg:p-14 lg:rounded-3xl lg:drop-shadow-2xl"
        >
          <div id="left__pane__container" className="hidden lg:basis-1/2 lg:flex justify-center items-center px-16">
            {/* tutorial start */}
            <div id="tutorial__container" className="py-8 px-20 flex flex-col gap-8">
              <div id="tutorial__image" className="flex items-center justify-center">
                <img src={Tutorial}></img>
              </div>
              <div id="tutorial__text" className="text-center flex flex-col gap-4">
                <h4 className="text-h-md font-semibold text-violet-900">Heading tutorial satu tutorial satu</h4>
                <p className="text-b-md text-neutral-800">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam
                </p>
              </div>
              <div id="tutorial__progress" className="flex items-center justify-center">
                progress
              </div>
              <div id="tutorial__next__btn" className="flex items-center justify-end">
                <p className="text-b-md font-semibold text-violet-500">Lanjut</p>
              </div>
            </div>
            {/* tutorial end */}
          </div>

          <div id="right__pane__container" className="w-full lg:basis-1/2 flex justify-center items-end">
            {/* login start */}
            <div className="w-full lg:w-[60%] lg:h-full flex flex-col items-center justify-center">
              {/* logo start */}
              <a href="#" className="hidden lg:flex items-center mb-6">
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
                        <label for="email" className="block mb-2 text-b-lg">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="h-14 px-2.5 border-2 border-neutral-400 text-gray-900 sm:text-sm rounded-lg focus:border-neutral-500 w-full"
                          placeholder="fiorenza@xmail.com"
                          required=""
                        />
                      </div>
                      {/* email end */}

                      {/* password start */}
                      <div className="space-y-1">
                        <div>
                          <label for="password" className="block mb-2 text-b-lg">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="h-14 px-2.5 border-2 border-neutral-400 text-gray-900 sm:text-sm rounded-lg focus:border-neutral-500 w-full"
                            required=""
                          />
                        </div>
                        {/* lupa password start */}
                        <div className="bg-white text-b-md text-end">Lupa password?</div>
                        {/* lupa password end */}
                      </div>
                      {/* password end */}
                    </div>

                    {/* submit button start */}
                    <div className="my-4 mt-10">
                      <button
                        type="submit"
                        className="h-14 w-full text-white bg-violet-700 hover:bg-violet-800 focus:ring-2 focus:outline-none focus:ring-violet-300 font-bold rounded-lg text-b-lg px-5 py-2.5 text-center"
                      >
                        Masuk
                      </button>
                    </div>
                    {/* submit button end */}

                    {/* sign up? start */}
                    <p className="text-b-lg text-center">
                      Belum memiliki akun?{' '}
                      <a href="#" className="font-bold hover:underline">
                        Daftar sekarang
                      </a>
                    </p>
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
