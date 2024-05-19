import React from 'react';

function ScheduleItem({ _id, geofenceName, startTime, endTime }) {
  return (
    <li className="flex justify-between py-1 px-2 bg-yellow-50 rounded-xl border border-yellow-300 text-yellow-900 text-b-sm drop-shadow-md">
      <p>{geofenceName}</p>
      <p>{`${startTime} - ${endTime}`}</p>
    </li>
  );
}

export default ScheduleItem;
