import Sidebar from '../../components/navigation/Sidebar';
import TopWave3 from '../../assets/waves/wave_top_3.svg';

function HomeLayout({ children }) {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />

      {/* top wave start */}
      <div className="z-0 lg:hidden fixed top-0 left-0 right-0 w-full">
        <img src={TopWave3} className="w-full" />
      </div>
      {/* top wave end */}

      {/* profile start */}
      <div className="lg:hidden z-10 mt-10 mx-6 text-white flex gap-4">
        <img className="w-16 h-16 rounded-full bg-white"></img>
        <div>
          <p className="text-b-xl font-bold">Halo, Raisa!</p>
          <p className="text-b-md">Orang Tua</p>
        </div>
      </div>
      {/* profile end */}

      {/* main start */}
      <main className="mt-16 lg:mt-0 w-full">{children}</main>
      {/* main end */}

      {/* 
  <div>
    <BottomNavbar className="h-screen flex justify-center items-center bg-gray-900" />
  </div> */}
    </div>
  );
}

export default HomeLayout;
