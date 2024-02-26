import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import Sidebar from '../../components/navigation/Sidebar';
import ProfPic from '../../assets/images/profile_picture.jpeg';

import { BiEdit } from 'react-icons/bi';
import { FaChevronRight } from 'react-icons/fa6';
import ProfSetItem from './ProfSetItem';

function Profile() {
  const ParentSettingItems = [
    { link: '', icon: 'bx:edit', text: 'Edit profil' },
    { link: '', icon: 'mingcute:question-line', text: 'Bantuan penggunaan' },
    { link: '', icon: 'material-symbols:lock-outline', text: ' Ganti pasword' },
    { link: '', icon: 'tabler:logout', text: 'Keluar' },
    { link: '', icon: 'typcn:delete-outline', text: 'Hapus akun', redText: true }
  ];

  return (
    <div className="flex">
      <Sidebar />

      <main className="w-full lg:w-1/2 lg:border-r lg:border-neutral-300">
        {/* page title start */}
        <h1 className="hidden lg:block text-b-xl font-bold bg-violet-200 text-center py-6">Profil Pengguna</h1>
        {/* page title end */}

        {/* user profile start */}
        <div id="user__profile" className={`flex flex-col items-center gap-6 py-12`}>
          <img id="user__profile__picture" src={ProfPic} className={`w-36 h-36 rounded-full`}></img>
          <div className="text-center">
            <p className={`text-b-xl font-bold`}>Raisa Salsabil Yusriyya</p>
            <p className={`text-b-lg`}>Orang tua</p>
          </div>
        </div>
        {/* user profile end */}

        {/* user setting list start */}
        <div id="user__setting__list">
          <ul>
            {ParentSettingItems.map(({ link, icon, text, redText, index }) => (
              <ProfSetItem link={link} icon={icon} text={text} redText={redText} index={index} />
            ))}
          </ul>
        </div>
        {/* user setting list end*/}
      </main>
    </div>
  );
}

export default Profile;
