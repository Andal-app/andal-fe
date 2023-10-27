import React, { useState } from 'react';
import Layout from './Layout';
import TimePickerComponent from '../components/TimePickerComponent';

const ParentSchedule = () => {
  const [startTime, setStartTime] = useState(new Date().setSeconds(0));
  const [endTime, setEndTime] = useState(new Date().setSeconds(0));

  return (
    <Layout roleTitle="Parent">
      <div className="column">
        <h1 className="title mt-4 is-2">Set Schedule</h1>
      </div>
      <div>
        <TimePickerComponent
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
      </div>
      <div className="mt-3">
        <button className="button has-text-weight-semibold is-success">Simpan</button>
      </div>
    </Layout>
  );
};

export default ParentSchedule;
