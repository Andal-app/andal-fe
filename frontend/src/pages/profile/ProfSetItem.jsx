// profile setting list
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import ProfPic from '../../assets/images/profile_picture.jpeg';

import { BiEdit } from 'react-icons/bi';
import { FaChevronRight } from 'react-icons/fa6';

function ProfSetItem({ link, icon, text, redText, index }) {
  return (
    <li
      key={index}
      className="h-16 flex items-center justify-between px-12 border-b border-neutral-300 hover:bg-violet-50 duration-300"
    >
      <Link to={link} className="flex items-center gap-6">
        <Icon icon={icon} className={`w-6 h-6 ${redText ? 'text-red-500' : 'text-violet-600'} `} />
        <span className={`text-b-xl ${redText && 'text-red-500'}`}>{text}</span>
      </Link>
      <Icon icon={'uiw:right'} className="w-6 h-6 text-neutral-600" />
    </li>
  );
}

export default ProfSetItem;
