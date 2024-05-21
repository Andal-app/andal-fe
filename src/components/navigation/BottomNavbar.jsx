import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const BottomNavbar = () => {
  const Menus = [
    { name: 'Beranda', icon: 'octicon:home-16', link: '/beranda/orangtua' },
    { name: 'Hubungkan', icon: 'fluent:link-multiple-20-filled', link: '/anak/hubungkan' },
    { name: 'Notifikasi', icon: 'mingcute:notification-line', link: '/notifikasi' },
    { name: 'Jadwal', icon: 'akar-icons:schedule', link: '/jadwalgeofence' },
    { name: 'Profil', icon: 'gg:profile', link: '/profil' }
  ];
  const [active, setActive] = useState(0);

  return (
    <nav className="fixed bottom-0 md:hidden bg-violet-400 h-16 w-full px-6 rounded-t-3xl text-white">
      <ul className="relative flex justify-center w-full h-full">
        {Menus.map((menu, i) => (
          <Link
            to={menu.link}
            className={`w-full h-full flex flex-col text-center items-center justify-center pt-3 pb-1.5 `}
            onClick={() => setActive(i)}
          >
            <span
              className={`absolute bottom-7 text-xl cursor-pointer ${
                active === i &&
                ' duration-200 rounded-full w-[72px] h-[72px] flex items-center justify-center border-4 border-white bg-violet-400'
              }`}
            >
              {/* <ion-icon name={menu.icon}></ion-icon> */}
              <Icon icon={menu.icon} className={`w-6 h-6`} />
            </span>

            <span className={`absolute bottom-1 duration-0 text-b-sm`}>{menu.name}</span>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
