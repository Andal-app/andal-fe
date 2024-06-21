import React, { useState } from 'react';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import ResponsiveTimePicker from './ResponsiveTimePicker';
import SubmitBtn from '../buttons/SubmitBtn';
import ToggleBtn from '../buttons/ToggleBtn';

function AddGeoForm({
  formData,
  handleInputChange,
  handleSubmit,
  setStartTime,
  setEndTime,
  handleShapeChange,
  btnText
}) {
  return (
    <form id="add__geofence__inputs" onSubmit={handleSubmit} className="lg:w-72 mx-6 my-4 lg:m-3 flex flex-col gap-4">
      <div>
        <InputLabel content="Bentuk Area" className="font-bold" />
        <ToggleBtn onChange={handleShapeChange} value1="Lingkaran" value2="Poligon" />
      </div>

      <div className="flex gap-2">
        <div id="geonfece__name" className={`${formData.shape === 'Lingkaran' ? 'w-[70%]' : 'w-full'} `}>
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

        {formData.shape === 'Lingkaran' ? (
          <div id="geonfece__radius" className="w-[30%]">
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
        ) : null}
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
