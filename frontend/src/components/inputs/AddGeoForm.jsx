import React from 'react';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import ResponsiveTimePicker from './ResponsiveTimePicker';
import SubmitBtn from '../buttons/SubmitBtn';

function AddGeoForm() {
  return (
    <form id="add__geofence__inputs" className="mx-8 lg:mx-4 my-4 flex flex-col gap-4">
      <div id="geonfece__name">
        <InputLabel labelFor="geonfenceName" content="Nama Geofence" className="font-bold" />
        <TextInput type="text" name="geofenceName" id="geofenceName" placeholder="SD Nusantara" required="true" />
      </div>

      <div>
        <InputLabel labelFor="geonfenceTime" content="Waktu" className="font-bold" />
        <ResponsiveTimePicker />
      </div>

      <div className="mt-6 lg:mt-2">
        <SubmitBtn type="submit" text="Tambah" />
      </div>
    </form>
  );
}

export default AddGeoForm;
