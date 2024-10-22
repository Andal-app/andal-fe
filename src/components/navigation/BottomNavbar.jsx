import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavbar = ({ user }) => {
  const ParentMenus = [
    { name: 'Beranda', icon: 'octicon:home-16', link: '/beranda/orangtua' },
    { name: 'Hubungkan', icon: 'fluent:link-multiple-20-filled', link: '/orangtua/hubungkan' },
    { name: 'Notifikasi', icon: 'mingcute:notification-line', link: '/notifikasi' },
    { name: 'Jadwal', icon: 'akar-icons:schedule', link: '/jadwalgeofence' },
    { name: 'Profil', icon: 'gg:profile', link: '/profil' }
  ];

  const ChildMenus = [
    { name: 'Beranda', icon: 'octicon:home-16', link: '/beranda/anak' },
    { name: 'Hubungkan', icon: 'fluent:link-multiple-20-filled', link: '/anak/hubungkan' },
    { name: 'Profil', icon: 'gg:profile', link: '/profil' }
  ];

  const Menus = user?.role === 'parent' ? ParentMenus : user?.role === 'child' ? ChildMenus : [];

  const location = useLocation();
  const [active, setActive] = useState(null);

  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = Menus.findIndex((menu) => menu.link === currentPath);
    setActive(activeIndex);
  }, [location.pathname, Menus]);

  return (
    <nav className="fixed z-50 bottom-0 md:hidden bg-violet-400 h-16 w-full px-6 rounded-t-3xl text-white">
      <ul className="relative flex justify-center w-full h-full">
        {Menus.map((menu, i) => (
          <Link
            to={menu.link}
            key={i} // Added key prop
            className={`w-full h-full flex flex-col text-center items-center justify-center pt-3 pb-1.5 `}
            onClick={() => setActive(i)}
            aria-label="Item Menu"
          >
            <span
              className={`absolute bottom-7 text-xl cursor-pointer ${
                active === i &&
                ' duration-200 rounded-full w-[72px] h-[72px] flex items-center justify-center border-4 border-white bg-violet-400'
              }`}
            >
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
