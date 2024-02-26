import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import Sidebar from '../../components/navigation/Sidebar';
import ProfPic from '../../assets/images/profile_picture.jpeg';

import { BiEdit } from 'react-icons/bi';
import { FaChevronRight } from 'react-icons/fa6';

function Profile() {
  return (
    <div>
      <Sidebar />

      {/* user profile start */}
      <div id="user__profile" className={`bg-red-300 flex flex-col items-center gap-6 py-12`}>
        <img id="user__profile__picture" src={ProfPic} className={`w-36 h-36 rounded-full`}></img>
        <div className="bg-neutral-200 text-center">
          <p className={`text-b-xl font-bold`}>Raisa Salsabil Yusriyya</p>
          <p className={`text-b-lg`}>Orang tua</p>
        </div>
      </div>
      {/* user profile end */}

      {/* user setting list start */}
      <div id="user__setting__list">
        <ul>
          <li className="h-16 flex items-center justify-between px-12 border-b border-neutral-300 hover:bg-violet-50 duration-300">
            <Link to="" className="flex items-center gap-6">
              <Icon icon={'bx:edit'} className="w-6 h-6 text-violet-600" />
              <span className="text-b-xl">Edit profil</span>
            </Link>
            <Icon icon={'uiw:right'} className="w-6 h-6 text-neutral-600" />
          </li>
        </ul>
      </div>
      {/* user setting list end*/}
    </div>
  );
}

export default Profile;
