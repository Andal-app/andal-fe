import React from 'react';
import HomeLayout from '../../layouts/home/HomeLayout';

function ChildHomeV2() {
  return (
    <HomeLayout>
      <div className="relative mx-6 lg:mx-0 flex flex-col gap-4">
        {/* page title start */}
        <div className="lg:absolute lg:top-8 lg:left-8 lg:z-10 bg-violet-700 w-fit px-5 py-0.5 text-b-md font-bold rounded-md text-white">
          Posisi saya
        </div>
        {/* page title end */}

        {/* map start */}
        <div className="lg:z-0 bg-neutral-400 h-72 lg:h-screen">MAP MAP MAP MAP MAP MAP</div>
        {/* map end */}

        {/* location detail start */}
        <div className="bg-white lg:absolute lg:top-20 lg:left-8 lg:z-10 lg:rounded-xl lg:drop-shadow-xl lg:p-5 lg">
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
