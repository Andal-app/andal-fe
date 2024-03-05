import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const ResponsiveTimePicker = ({ startTime, setStartTime, endTime, setEndTime }) => {
  return (
    <div className="w-full flex mt-4">
      <LocalizationProvider dateAdapter={AdapterDateFns} className="">
        <TimePicker
          label="waktu mulai"
          value={startTime}
          onChange={(time) => setStartTime(time)}
          ampm={false}
          className="mr-4 timepicker"
        />

        <div id="hyphen" className="flex items-center">
          <div className="bg-violet-300 h-1.5 w-10 mx-4 rounded-full"></div>
        </div>

        <TimePicker label="waktu selesai" value={endTime} onChange={(time) => setEndTime(time)} ampm={false} />
      </LocalizationProvider>
    </div>
  );
};

export default ResponsiveTimePicker;
