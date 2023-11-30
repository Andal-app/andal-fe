import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

const TimePickerComponent = ({ startTime, setStartTime, endTime, setEndTime }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopTimePicker
        label="Start time"
        value={startTime}
        onChange={(time) => setStartTime(time)}
        ampm={false}
        className="mr-4"
      />
      <DesktopTimePicker label="End time" value={endTime} onChange={(time) => setEndTime(time)} ampm={false} />
    </LocalizationProvider>
  );
};

export default TimePickerComponent;
