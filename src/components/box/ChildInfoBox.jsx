import React from 'react';
import PositionDetailBox from './PositionDetailBox';
import ScheduleItem from './ScheduleItem';

function ChildInfoBox({ data }) {
  return (
    <div className="py-2 px-4 lg:p-3 flex flex-col gap-2">
      <div className="bg-violet-300 px-4 py-2 text-violet-900 rounded-xl border border-violet-500">
        <div id="latest__location" className="flex text-b-md font-medium">
          <p>{`${data?.child?.fullname?.split(' ')[0]} berada di ${'Fakultas Teknik'}`} </p>
        </div>

        <div id="latest__time" className="flex gap-2 text-b-sm">
          <p>08.00</p>
          <p>WIB</p>
        </div>
      </div>

      <div id="location__detail" className="text-b-sm">
        <PositionDetailBox />
      </div>

      {/* status start */}
      <div id="status" className="text-b-sm">
        <div id="location__status" className="flex gap-2">
          <p className="font-bold text-violet-900">Status:</p>
          <p>Berada dalam geofence sesuai jadwal</p>
        </div>

        {/* battery and gps status start */}
        <div id="battery__gps__status" className="flex gap-4">
          {/* battery status start */}
          <div id="battery__status" className="flex gap-2">
            <p className="text-violet-900 font-bold">kotak</p>
            <p>
              100<span>%</span>
            </p>
          </div>
          {/* battery status end */}

          {/* gps status start */}
          <div id="gps__status" className="flex gap-2">
            <p className="text-violet-900 font-bold">GPS</p>
            <p>Aktif</p>
          </div>
          {/* gps status end */}
        </div>
        {/* battery and gps status end */}
      </div>
      {/* status end */}

      {/* schedule box start */}
      <div className="flex flex-col gap-2">
        <p className="font-bold text-violet-900 text-b-sm">Jadwal</p>

        {/* schedule items start */}
        <ul className="min-h-min max-h-[110px] flex flex-col gap-2 overflow-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 scrollbar-thumb-rounded-full">
          {data?.geofences?.map(({ _id, geofenceName, startTime, endTime }) => (
            <ScheduleItem key={_id} _id={_id} geofenceName={geofenceName} startTime={startTime} endTime={endTime} />
          ))}
        </ul>
        {/* schedule items end */}
      </div>
      {/* schedule box end */}
    </div>
  );
}

export default ChildInfoBox;
