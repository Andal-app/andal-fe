import React from 'react';

function PositionDetailBox() {
  return (
    <div className="">
      <p className="text-b-md font-bold text-violet-900">Detail Posisi</p>
      <div className="container mx-auto text-b-sm">
        <table className="table-auto">
          <tbody>
            <tr>
              <td className="pr-8">Alamat</td>
              <td className="pr-2">:</td>
              <td className=" ">Jalan Grafika No. 2, Sleman</td>
            </tr>
            <tr>
              <td className="">Longitude</td>
              <td className="">:</td>
              <td className="">B-7.767722745243223</td>
            </tr>
            <tr>
              <td className="">Latitude</td>
              <td className="">:</td>
              <td className="">110.37243623854161</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PositionDetailBox;
