import Sidebar from '../../components/navigation/Sidebar';
import ChildBox from '../../components/box/ChildBox';

function ParentHomeV2() {
  const ChildrenList = [
    { fullName: 'Fiorenza Celestyn', profPic: '' },
    { fullName: 'Maura Yufi Septania', profPic: '' },
    { fullName: 'Isyana Sarawati', profPic: '' }
  ];
  return (
    <div className="flex">
      <Sidebar />

      <main className="m-10 w-full lg:w-fit">
        {/* page title start */}
        <h5 className="text-h-sm font-bold py-6 text-violet-900">Daftar Anak</h5>
        {/* page title end */}

        {/* children list start */}
        <div className="flex flex-col w-full">
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
