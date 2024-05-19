import React from 'react';
import { Link } from 'react-router-dom';

function RoleBox({ link, id, imgSrc, imgAlt, title, detail }) {
  return (
    <Link to={link}>
      <div
        id={id}
        className="py-3 px-4 flex flex-row w-full min-h-32 rounded-lg border border-violet-500  bg-violet-300 hover:bg-violet-200 duration-700"
      >
        <div className="basis-1/3 flex items-center justify-center">
          <img src={imgSrc} alt={imgAlt} className="h-full" />
        </div>
        <div className="basis-2/3">
          <h5 className="text-h-sm font-bold text-violet-900">{title}</h5>
          <p className="text-b-md">{detail}</p>
        </div>
      </div>
    </Link>
  );
}

export default RoleBox;
