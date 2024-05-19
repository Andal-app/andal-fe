import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { parseISO } from 'date-fns';

const ResponsiveTimePicker = ({ startTime, setStartTime, endTime, setEndTime }) => {
  return (
    <div className="w-full flex mt-4 lg:mt-0">
      <LocalizationProvider dateAdapter={AdapterDateFns} className="">
        <TimePicker
          label="Mulai"
          value={startTime ? parseISO(`2024-01-01T${startTime}:00`) : null}
          onChange={(time) => setStartTime(time)}
          ampm={false}
          className="mr-4 timepicker"
        />

        <div id="hyphen" className="flex items-center">
          <div className="bg-violet-300 h-1 w-10 mx-4 rounded-full"></div>
        </div>

        <TimePicker
          label="Selesai"
          value={endTime ? parseISO(`2024-01-01T${endTime}:00`) : null}
          onChange={(time) => setEndTime(time)}
          ampm={false}
        />
      </LocalizationProvider>
    </div>
  );
};

export default ResponsiveTimePicker;
