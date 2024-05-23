import React from 'react';
import { Icon } from '@iconify/react';
import PositionDetailBox from './PositionDetailBox';
import ScheduleItem from './ScheduleItem';
import IconBtn from '../buttons/IconBtn';
import { useNavigate } from 'react-router-dom';

function ChildInfoBox({ address, gpsStatus, data, error, isLoading }) {
  const navigate = useNavigate();

  return (
    <div className="py-2 px-4 lg:p-3 flex flex-col gap-2">
      <div className="bg-violet-300 px-4 py-2 text-violet-900 rounded-xl border border-violet-500">
        <div id="latest__location" className="flex text-b-md font-medium">
          <p>{`${data?.child?.fullname?.split(' ')[0]}  ${data?.status?.toLowerCase()}`} </p>
        </div>
      </div>

      <div id="location__detail" className="text-b-sm">
        <PositionDetailBox
          address={address}
          lat={data?.child?.latestLat}
          lng={data?.child?.latestLong}
          error={error}
          isLoading={isLoading}
        />
      </div>

      {/* status start */}
      <div id="status" className="text-b-sm">
        {/* <div id="location__status" className="flex gap-2">
          <p className="font-bold text-violet-900">Status:</p>
          <p>Berada dalam geofence sesuai jadwal</p>
        </div> */}

        {/* battery and gps status start */}
        <div id="battery__gps__status" className="flex gap-4">
          {/* battery status start */}
          <div id="battery__status" className="flex gap-2">
            <p className="text-violet-900 font-bold">
              {' '}
              <Icon icon="fluent:battery-6-24-regular" className="w-5 h-5" />
            </p>
            <p>
              100<span>%</span>
            </p>
          </div>
          {/* battery status end */}

          {/* gps status start */}
          <div id="gps__status" className="flex gap-2">
            <p className="text-violet-900 font-bold">GPS</p>
            <p>{gpsStatus}</p>
          </div>
          {/* gps status end */}
        </div>
        {/* battery and gps status end */}
      </div>
      {/* status end */}

      {/* schedule box start */}
      <div className="flex flex-col gap-2">
        {/* jadwal title & buttons start */}
        <div className="w-full flex">
          <p className="w-[30%] font-bold text-violet-900 text-b-xl">Jadwal</p>

          <div className="w-full md:hidden flex gap-2">
            <div className="w-1/2 h-[40px]">
              <IconBtn
                icon="tabler:plus"
                text="Tambah jadwal"
                onClick={() => [
                  navigate(`/tambahgeofence/${data?.child?.username}`, {
                    state: {
                      childId: data?.child?._id,
                      childUsername: data?.child?.username,
                      childFullname: data?.child?.fullname
                    }
                  })
                ]}
              />
            </div>
            <div className="w-1/2 h-[40px]">
              <IconBtn
                icon="bx:edit"
                text="Kelola jadwal"
                onClick={() => [
                  navigate(`/kelolajadwal/${data?.child?.username}`, {
                    state: {
                      childId: data?.child?._id,
                      childUsername: data?.child?.username,
                      childFullname: data?.child?.fullname
                    }
                  })
                ]}
              />
            </div>
          </div>
        </div>
        {/* jadwal title & buttons end */}

        {/* schedule items start */}
        <ul className="min-h-min max-h-[110px] flex flex-col gap-2 overflow-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 scrollbar-thumb-rounded-full">
          {error ? (
            <p className="text-black text-center text-b-sm">{error}</p>
          ) : isLoading ? (
            <div className="space-y-1">
              <div className="h-4 w-full animate-pulse bg-neutral-100"></div>
              <div className="h-4 w-full animate-pulse bg-neutral-100"></div>
            </div>
          ) : data?.geofences?.length === 0 ? (
            <p className="text-black text-center text-b-sm">Tambahkan data baru</p>
          ) : (
            data?.geofences?.map(({ _id, geofenceName, startTime, endTime }) => (
              <ScheduleItem key={_id} _id={_id} geofenceName={geofenceName} startTime={startTime} endTime={endTime} />
            ))
          )}
        </ul>
        {/* schedule items end */}
      </div>
      {/* schedule box end */}
    </div>
  );
}

export default ChildInfoBox;
