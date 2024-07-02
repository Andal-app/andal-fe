import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import SubmitBtn from '../buttons/SubmitBtn';

function DetailGeoForm({ childId, geofenceId, geofenceShape, geofenceName, radius, startTime, endTime }) {
  const navigate = useNavigate();

  // Determine the correct geofenceShape based on the shape value
  let displayedGeofenceShape = 'Lingkaran'; // Default value
  if (geofenceShape === 'polygon') {
    displayedGeofenceShape = 'Poligon';
  }

  return (
    <div id="add__geofence__inputs" className="lg:w-72 mx-6 my-4 lg:m-3 flex flex-col gap-4">
      <div id="geonfece__shape">
        <InputLabel labelFor="geonfenceShape" content="Bentuk Area" className="font-bold" />
        <TextInput
          type="text"
          name="geonfenceShape"
          id="geonfenceShape"
          value={geofenceShape}
          readOnly
          className="bg-violet-100"
        />
      </div>

      <div className="flex gap-2">
        <div id="geonfece__name" className={`${geofenceShape === 'Lingkaran' ? 'w-[70%]' : 'w-full'} `}>
          <InputLabel labelFor="geonfenceName" content="Nama Geofence" className="font-bold" />
          <TextInput
            type="text"
            name="geofenceName"
            id="geofenceName"
            value={geofenceName}
            readOnly
            className="bg-violet-100"
          />
        </div>

        {geofenceShape == 'Lingkaran' && (
          <div id="geonfece__radius" className="w-[30%]">
            <InputLabel labelFor="radius" content="Radius (m)" className="font-bold" />
            <TextInput type="text" name="radius" id="radius" readOnly value={radius} className="bg-violet-100" />
          </div>
        )}
      </div>

      <div>
        <InputLabel labelFor="geonfenceTime" content="Waktu" className="font-bold" />
        <div className="w-full flex mt-4 lg:mt-0">
          <TextInput
            type="text"
            name="startTime"
            id="startTime"
            value={startTime}
            readOnly
            className="bg-violet-100 text-center"
          />

          <div id="hyphen" className="flex items-center">
            <div className="bg-violet-300 h-1 w-10 mx-4 rounded-full"></div>
          </div>

          <TextInput
            type="text"
            name="endTime"
            id="endTime"
            value={endTime}
            readOnly
            className="bg-violet-100 text-center"
          />
        </div>
      </div>

      <div className="mt-6 lg:mt-2">
        <SubmitBtn
          type="button"
          text="Edit"
          onClick={() => [navigate(`/editgeofence/${geofenceId}`, { state: { childId: childId } })]}
        />
      </div>
    </div>
  );
}

export default DetailGeoForm;
