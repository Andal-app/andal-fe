import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import BottomNavbar from '../components/navigation/BottonNavbar';

const Trial = () => {
  const Menus = [
    { name: 'Home', icon: 'home-outline', dis: 'translate-x-0' },
    { name: 'Profile', icon: 'person-outline', dis: 'translate-x-[72px]' },
    { name: 'Message', icon: 'chatbubble-outline', dis: 'translate-x-32' },
    { name: 'Photos', icon: 'camera-outline', dis: 'translate-x-48' },
    { name: 'Settings', icon: 'settings-outline', dis: 'translate-x-64' }
  ];
  const [active, setActive] = useState(0);

  return (
    <div className="h-screen flex">
      <nav className="bg-violet-400 max-h-[4.4rem] w-full px-6 rounded-t-xl fixed bottom-0">
        <ul className="flex relative w-full bg-red-200">
          <span
            className={`bg-violet-600 duration-500 ${Menus[active].dis} border-4 border-neutral-900 h-16 w-16 absolute
         -top-7 rounded-full`}
          >
            <span
              className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] 
          rounded-tr-[11px] shadow-xl"
            ></span>
            <span
              className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] 
          rounded-tl-[11px] shadow-xl"
            ></span>
          </span>
          {Menus.map((menu, i) => (
            <li key={i} className="w-16 bg-red-400">
              <a
                className={`flex flex-col text-center pt-3 pb-1.5 items-center ${i === active && ''}`}
                onClick={() => setActive(i)}
              >
                <span
                  className={`text-xl cursor-pointer duration-300 text-black ${
                    i === active && 'text-neutral-50 -mt-5 -ml-6 absolute'
                  }`}
                >
                  {/* <ion-icon name={menu.icon}></ion-icon> */}
                  <Icon icon={'bx:edit'} className={`w-6 h-6 ${i === active && 'z-10 absolute'}`} />
                </span>
                <span
                  className={`duration-0 text-black text-b-sm  ${
                    active === i ? 'translate-y-5 mt-1 text-neutral-50' : ''
                  } `}
                >
                  {menu.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Trial;
