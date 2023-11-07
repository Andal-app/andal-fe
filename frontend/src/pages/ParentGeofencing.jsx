import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';
import TimePickerComponent from '../components/TimePickerComponent';
import GetCurrentPosition from '../components/GetCurrentPosition';
import { useGlobalState } from '../state';

const ParentSchedule = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [searchResult] = useState(null);

  const navigate = useNavigate();
  const { childname } = useParams();
  const [latitude] = useGlobalState('latitude');
  const [longitude] = useGlobalState('longitude');
  const [geofenceLat, setGeofenceLat] = useState(0.0);
  const [geofenceLng, setGeofenceLng] = useState(0.0);

  const updateGeofenceData = async () => {
    const newStartTime = getHoursMinutes(startTime);
    const newEndTime = getHoursMinutes(endTime);
    try {
      await axios.put(process.env.REACT_APP_linkNgrok + `/geofence/data/${childname}`, {
        username: childname,
        latitude: geofenceLat,
        longitude: geofenceLng,
        radius: '100',
        start_time: newStartTime,
        end_time: newEndTime
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getHoursMinutes = (time) => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return `${hours}:${minutes}`;
  };

  return (
    <Layout roleTitle="Parent">
      <div className="column">
        <h1 className="title mt-4 is-2">Set Geofence</h1>
      </div>
      <div>
        <TimePickerComponent
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
      </div>
      <div className="row mt-5">
        <GetCurrentPosition
          setGeofenceLat={setGeofenceLat}
          setGeofenceLng={setGeofenceLng}
          isShowButton={false}
          isShowSearch={true}
          latitude={latitude}
          longitude={longitude}
          searchResult={searchResult}
        />
      </div>
      <div className="mt-3">
        <button
          onClick={() => {
            updateGeofenceData();
            navigate(`/parent/lokasianak/${childname}`);
          }}
          disabled={geofenceLat === 0.0 || geofenceLng === 0.0 ? true : false}
          className="button has-text-weight-semibold verdigris text-eerie-black back mb-4"
        >
          Pasang Geofence
        </button>
      </div>
    </Layout>
  );
};

export default ParentSchedule;
