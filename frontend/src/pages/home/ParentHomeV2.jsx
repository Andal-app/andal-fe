import Sidebar from '../../components/navigation/Sidebar';
import ChildBox from '../../components/box/ChildBox';

import TopWave3 from '../../assets/waves/wave_top_3.svg';

function ParentHomeV2() {
  const ChildrenList = [
    { fullName: 'Fiorenza Celestyn', profPic: '' },
    { fullName: 'Maura Yufi Septania', profPic: '' },
    { fullName: 'Isyana Sarawati', profPic: '' }
  ];
  return (
    <div className="flex flex-col mx-6">
      <Sidebar />

      {/* top wave start */}
      <div className="z-0 lg:hidden fixed top-0 left-0 right-0 w-full">
        <img src={TopWave3} className="w-full" />
      </div>
      {/* top wave end */}

      {/* profile start */}
      <div className="z-10 mt-10 text-white flex gap-4">
        <img className="w-16 h-16 rounded-full bg-white"></img>
        <div>
          <p className="text-b-xl font-bold">Halo, Raisa!</p>
          <p className="text-b-md">Orang Tua</p>
        </div>
      </div>
      {/* profile end */}

      <main className="mt-12 lg:mt-0 w-full lg:w-fit">
        {/* page title start */}
        <h5 className="text-h-sm font-bold py-6 text-violet-900">Daftar Anak</h5>
        {/* page title end */}

        {/* children list start */}
        <div className="flex lg:flex-col flex-wrap lg:flex-nowrap w-full justify-between gap-2 lg:gap-4">
          {ChildrenList.map(({ fullName, profPic, index }) => (
            <ChildBox fullName={fullName} profPic={profPic} index={index} />
          ))}
        </div>
        {/* children list end */}
      </main>
      {/* 
      <div>
        <BottomNavbar className="h-screen flex justify-center items-center bg-gray-900" />
      </div> */}
    </div>
  );
}

export default ParentHomeV2;
