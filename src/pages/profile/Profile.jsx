import Sidebar from '../../components/navigation/Sidebar';
import ProfSetItem from './ProfSetItem';
import ProfPic from '../../assets/images/profile_picture.jpeg';
import translateUserRole from '../../helpers/translateUserRole';
import BottomNavbar from '../../components/navigation/BottomNavbar';
import { useDispatch } from 'react-redux';
import { LogoutAction } from '../../redux/actions/authActions';

function Profile({ user }) {
  //autentikasi
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(LogoutAction());
  };

  const role = translateUserRole(user?.role ? user.role : null);

  const ParentSettingItems = [
    { link: '/editprofil', icon: 'bx:edit', text: 'Edit profil' },
    {
      link: '/tutorial',
      icon: 'mingcute:question-line',
      text: 'Bantuan penggunaan',
      pass_value: 'Kembali'
    },
    { link: '', icon: 'material-symbols:lock-outline', text: ' Ganti pasword' },
    { link: '', icon: 'tabler:logout', text: 'Keluar', onClick: handleLogout },
    { link: '/profil/hapusakun', icon: 'typcn:delete-outline', text: 'Hapus akun', redText: true }
  ];

  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar user={user} />

      <main className="w-full lg:w-1/2 lg:border-r lg:border-neutral-300">
        {/* page title start */}
        <h1 className="hidden lg:block text-b-lg font-bold text-center py-6">Profil Pengguna</h1>
        {/* page title end */}

        {/* user profile start */}
        <div id="user__profile" className={`flex flex-col items-center gap-4 py-6`}>
          <img id="user__profile__picture" src={ProfPic} className={`w-36 h-36 rounded-full`}></img>
          <div className="text-center">
            <p className={`text-b-md font-bold`}>{user ? user.fullname : 'Nama Lengkap'}</p>
            <p className={`text-b-sm`}>{role ? role : 'Peran'}</p>
          </div>
        </div>
        {/* user profile end */}

        {/* user setting list start */}
        <div id="user__setting__list">
          <ul>
            {ParentSettingItems.map(({ link, icon, text, redText, pass_value, onClick }, index) => (
              <ProfSetItem
                key={index}
                link={link}
                icon={icon}
                text={text}
                redText={redText}
                index={index}
                passValue={pass_value}
                onClick={onClick}
              />
            ))}
          </ul>
        </div>
        {/* user setting list end*/}
      </main>
    </div>
  );
}

export default Profile;
