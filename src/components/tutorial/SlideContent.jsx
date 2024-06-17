import React from 'react';

const SlideContent = ({ imgSrc, title, description }) => {
  return (
    <div className="slide-content flex flex-col items-center gap-4">
      <div className="flex items-center justify-center mb-4">
        <img src={imgSrc} alt="Tutorial Step" className="" />
      </div>
      <div className="text-center flex flex-col items-center gap-4">
        <h4 className="text-h-sm lg:text-h-md font-semibold text-violet-900">{title}</h4>
        <p className="text-b-sm lg:text-b-md text-neutral-800 max-w-[420px]">{description}</p>
      </div>
    </div>
  );
};

export default SlideContent;
