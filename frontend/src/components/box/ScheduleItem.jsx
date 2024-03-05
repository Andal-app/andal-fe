import React from 'react';

function ScheduleItem({ location, time, index }) {
  return (
    <li
      key={index}
      className="flex justify-between py-1 px-2 bg-yellow-50 rounded-xl border border-yellow-300 text-yellow-900 text-b-lg drop-shadow-md"
    >
      <p>{location}</p>
      <p>{time}</p>
    </li>
  );
}

export default ScheduleItem;
