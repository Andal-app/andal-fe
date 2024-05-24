import Sidebar from '../../components/navigation/Sidebar';
import TopWave3 from '../../assets/waves/wave_top_3.svg';
import BottomNavbar from '../../components/navigation/BottomNavbar';
import translateUserRole from '../../helpers/translateUserRole';
import User06bSvg from '../../assets/dummy_data/user_06b.svg';
import User01aSvg from '../../assets/dummy_data/user_01a.svg';

function HomeLayout({ children, user }) {
  const role = translateUserRole(user?.role ? user.role : null);

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar user={user} />
      <BottomNavbar user={user} />

      {/* top wave start */}
      <div className="z-0 lg:hidden fixed top-0 left-0 right-0 w-full">
        <img src={TopWave3} className="w-full" />
      </div>
      {/* top wave end */}

      {/* profile start */}
      <div className="fixed lg:hidden z-10 mt-10 mx-4 text-white flex gap-2">
        <img className="w-12 h-12 rounded-full" src={user?.role === 'parent' ? User06bSvg : User01aSvg}></img>
        <div>
          <p className="text-b-md font-bold">{`Halo, ${user?.fullname?.split(' ')[0]}!`}</p>
          <p className="text-b-sm">{role}</p>
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
