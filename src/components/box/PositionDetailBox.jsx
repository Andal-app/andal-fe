import React from 'react';

function PositionDetailBox({ address, lat, lng }) {
  return (
    <div className="">
      <p className="text-b-sm font-bold text-violet-900">Detail Posisi</p>
      <div className="container mx-auto text-b-sm">
        <table className="table-auto">
          <tbody>
            <tr>
              <td className="pr-8">Alamat</td>
              <td className="pr-2">:</td>
              <td className=" ">{address ? address : '-'}</td>
            </tr>
            <tr>
              <td className="">Latitude</td>
              <td className="">:</td>
              <td className="">{lat ? lat : '-'}</td>
            </tr>
            <tr>
              <td className="">Longitude</td>
              <td className="">:</td>
              <td className="">{lng ? lng : '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PositionDetailBox;
