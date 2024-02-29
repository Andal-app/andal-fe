import React from 'react';
import HomeLayout from '../../layouts/home/HomeLayout';

function ChildHomeV2() {
  return (
    <HomeLayout>
      <div className="flex flex-col gap-4">
        {/* page title start */}
        <div className="bg-violet-700 w-fit px-5 py-0.5 text-b-md font-bold rounded-md text-white">Posisi saya</div>
        {/* page title end */}

        {/* map start */}
        <div className="bg-neutral-400 h-72">MAP</div>
        {/* map end */}

        {/* location detail start */}
        <div className="">
          <p className="text-b-lg font-bold text-violet-900">Detail Posisi</p>
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
        {/* location detail end */}
      </div>
    </HomeLayout>
  );
}

export default ChildHomeV2;
