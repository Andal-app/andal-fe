import React from 'react';

function Tutorial({ imgSrc }) {
  return (
    <div id="tutorial__container" className="py-8 px-20 flex flex-col gap-8">
      <div id="tutorial__image" className="flex items-center justify-center">
        <img src={imgSrc}></img>
      </div>
      <div id="tutorial__text" className="text-center flex flex-col gap-4">
        <h4 className="text-h-md font-semibold text-violet-900">Heading tutorial satu tutorial satu</h4>
        <p className="text-b-md text-neutral-800 max-w-[420px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam
        </p>
      </div>
      <div id="tutorial__progress" className="flex items-center justify-center">
        progress
      </div>
      <div id="tutorial__next__btn" className="flex items-center justify-end">
        <p className="text-b-md font-semibold text-violet-500">Lanjut</p>
      </div>
    </div>
  );
}

export default Tutorial;
