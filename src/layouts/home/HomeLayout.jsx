import Sidebar from '../../components/navigation/Sidebar';
import TopWave3 from '../../assets/waves/wave_top_3.svg';
import BottomNavbar from '../../components/navigation/BottomNavbar';

function HomeLayout({ children, user }) {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar user={user} />
      <BottomNavbar />

      {/* top wave start */}
      <div className="z-0 lg:hidden fixed top-0 left-0 right-0 w-full">
        <img src={TopWave3} className="w-full" />
      </div>
      {/* top wave end */}

      {/* profile start */}
      <div className="fixed lg:hidden z-10 mt-10 mx-4 text-white flex gap-2">
        <img className="w-12 h-12 rounded-full bg-white"></img>
        <div>
          <p className="text-b-md font-bold">Halo, Raisa!</p>
          <p className="text-b-sm">Orang Tua</p>
        </div>
      </div>
      {/* profile end */}

      {/* main start */}
      <main className="mt-40 lg:mt-0 w-full">{children}</main>
      {/* main end */}
    </div>
  );
}

export default HomeLayout;
