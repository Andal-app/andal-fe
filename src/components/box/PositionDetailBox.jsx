import React from 'react';

function PositionDetailBox({ address, lat, lng, error, isLoading }) {
  return (
    <div className="">
      <p className="text-b-sm font-bold text-violet-900">Detail Posisi</p>
      <div className="container mx-auto text-b-sm">
        <table className="table-auto">
          <tbody>
            <tr className="">
              <td className="pr-8 table-cell align-top">Alamat</td>
              <td className="pr-2 table-cell align-top">:</td>
              {error ? (
                <td className="text-black">{error}</td>
              ) : isLoading ? (
                <td className="h-2 w-full animate-pulse bg-neutral-100"></td>
              ) : (
                <td className=" ">{address ? address : '-'}</td>
              )}
            </tr>

            <tr>
              <td className="">Latitude</td>
              <td className="">:</td>
              {error ? (
                <td className="text-black">{error}</td>
              ) : isLoading ? (
                <td className="h-2 w-full animate-pulse bg-neutral-100"></td>
              ) : (
                <td className="">{lat ? lat : '-'}</td>
              )}
            </tr>

            <tr>
              <td className="">Longitude</td>
              <td className="">:</td>
              {error ? (
                <td className="text-black">{error}</td>
              ) : isLoading ? (
                <td className="h-2 w-full animate-pulse bg-neutral-100"></td>
              ) : (
                <td className="">{lng ? lng : '-'}</td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PositionDetailBox;
