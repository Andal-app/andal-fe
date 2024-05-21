import React from 'react';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import ResponsiveTimePicker from './ResponsiveTimePicker';
import SubmitBtn from '../buttons/SubmitBtn';

function AddGeoForm({ formData, handleInputChange, handleSubmit, setStartTime, setEndTime, btnText }) {
  return (
    <form id="add__geofence__inputs" onSubmit={handleSubmit} className="lg:w-72 mx-6 my-4 lg:m-3 flex flex-col gap-4">
      <div className="flex gap-2">
        <div id="geonfece__name" className="basis-[70%]">
          <InputLabel labelFor="geonfenceName" content="Nama Geofence" className="font-bold" />
          <TextInput
            type="text"
            name="geofenceName"
            id="geofenceName"
            placeholder="SD Nusantara"
            required
            onChange={handleInputChange}
            value={formData.geofenceName}
          />
        </div>

        <div id="geonfece__radius" className="basis-[30%]">
          <InputLabel labelFor="radius" content="Radius (m)" className="font-bold" />
          <TextInput
            type="text"
            name="radius"
            id="radius"
            placeholder="100"
            required
            onChange={handleInputChange}
            value={formData.radius}
          />
        </div>
      </div>

      <div>
        <InputLabel labelFor="geonfenceTime" content="Waktu" className="font-bold" />
        <ResponsiveTimePicker
          startTime={formData.startTime}
          setStartTime={setStartTime}
          endTime={formData.endTime}
          setEndTime={setEndTime}
        />
      </div>

      <div className="mt-6 lg:mt-2">
        <SubmitBtn type="submit" text={btnText} />
      </div>
    </form>
  );
}

export default AddGeoForm;