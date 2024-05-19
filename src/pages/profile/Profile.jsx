import Sidebar from '../../components/navigation/Sidebar';
import ProfSetItem from './ProfSetItem';
import ProfPic from '../../assets/images/profile_picture.jpeg';
import translateUserRole from '../../helpers/translateUserRole';

function Profile({ user }) {
  //autentikasi
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
    { link: '', icon: 'tabler:logout', text: 'Keluar' },
    { link: '/profil/hapusakun', icon: 'typcn:delete-outline', text: 'Hapus akun', redText: true }
  ];

  return (
    <div className="flex">
      <Sidebar user={user} />

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
            {ParentSettingItems.map(({ link, icon, text, redText, index, pass_value }) => (
              <ProfSetItem link={link} icon={icon} text={text} redText={redText} index={index} passValue={pass_value} />
            ))}
          </ul>
        </div>
        {/* user setting list end*/}
      </main>
      {/* 
      <div>
        <BottomNavbar className="h-screen flex justify-center items-center bg-gray-900" />
      </div> */}
    </div>
  );
}

export default Profile;
