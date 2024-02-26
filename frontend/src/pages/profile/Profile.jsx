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
    <div>
      <Sidebar />

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
    </div>
  );
}

export default Profile;
