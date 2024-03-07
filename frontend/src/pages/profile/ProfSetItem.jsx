import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

function ProfSetItem({ link, icon, text, redText, index }) {
  return (
    <Link
      to={link}
      key={index}
      className="h-14 flex items-center justify-between px-8 lg:px-12 border-b border-neutral-300 hover:bg-violet-50 duration-300"
    >
      <div className="flex items-center gap-6">
        <Icon icon={icon} className={`w-6 h-6 ${redText ? 'text-red-500' : 'text-violet-600'} `} />
        <span className={`text-b-md ${redText && 'text-red-500'}`}>{text}</span>
      </div>
      <Icon icon={'uiw:right'} className="w-5 h-5 text-neutral-600" />
    </Link>
  );
}

export default ProfSetItem;
