import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { FaAngleLeft } from 'react-icons/fa6';

function Sidebar() {
  const [open, setOpen] = useState(true);
  const MenuUtamaItems = [
    { title: 'Beranda', icon: 'octicon:home-16', cat: 'menu_utama', link: '/' },
    { title: 'Riwayat Geofencing', icon: 'tdesign:location', cat: 'menu_utama', link: '/' },
    { title: 'Notifikasi', icon: 'mingcute:notification-line', cat: 'menu_utama', link: '/notifikasi' }
  ];

  const PengaturanItems = [
    { title: 'Profil Pengguna', icon: 'gg:profile', cat: 'pengaturan', link: '/profil' },
    { title: 'Keluar ', icon: 'humbleicons:logout', cat: 'pengaturan', redText: true, link: '/keluar' }
  ];

  return (
    <nav
      className={` ${
        open ? 'min-w-60 duration-700' : 'w-20 duration-700'
      }  hidden lg:block h-screen  py-8 relative duration-300 shadow-2xl`}
    >
      {/* open close button start */}
      <div
        className={`z-50 bg-violet-200 h-10 w-10 p-2 absolute cursor-pointer -right-3 top-9 rounded-full shadow-md shadow-neutral-700/80  `}
        onClick={() => setOpen(!open)}
      >
        <FaAngleLeft className={`w-full h-full ${!open && 'rotate-180'}`} />
      </div>
      {/* open close button end */}

      {/* andal logo start */}
      <div className="px-6 flex gap-x-4 items-center">
        {/* <img src="./src/assets/logo.png" className={`cursor-pointer duration-500 ${open && 'rotate-[360deg]'}`} /> */}
        <div className="w-10 h-10 bg-violet-500 rounded-full"></div>
        <h1 className={`text-violet-700 origin-left font-semibold text-h-sm duration-200 ${!open && 'scale-0'}`}>
          Andal
        </h1>
      </div>
      {/* andal logo end */}

      {/* user profile start */}
      <div className={`flex gap-4 px-6 my-4 py-4 ${!open && 'hidden'}`}>
        <div id="profile__picture" className="w-14 h-14 rounded-full bg-black"></div>
        <div className="flex flex-col justify-center">
          <p className="text-b-sm font-semibold">Raisa Salsabil Y</p>
          <p className="text-b-xsm">Orang tua</p>
        </div>
      </div>
      {/* user profile end */}

      {/* unordered list start */}
      <div>
        {/* menu utama start */}
        <p id="menu__title" className={`px-6 uppercase text-b-sm font-semibold ${!open && 'hidden'}`}>
          menu utama
        </p>

        <ul id="menu__list" className="pt-1">
          {MenuUtamaItems.map((Item, index) => (
            <Link
              to={Item.link}
              key={index}
              className={`flex px-6 py-3 cursor-pointer hover:bg-violet-50 text-neutral-700 text-b-sm items-center gap-x-4 ${
                !open && 'py-6'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-neutral-50 flex items-center justify-center">
                <Icon icon={Item.icon} className="w-4 h-4 text-neutral-700" />
              </div>
              <span className={`${!open && 'hidden'} origin-left duration-200`}>{Item.title}</span>
            </Link>
          ))}
        </ul>
        {/* menu utama end */}

        {/* pengaturan start */}
        <p id="menu__title" className={`px-6 uppercase text-b-sm font-semibold ${!open && 'hidden'}`}>
          pengaturan
        </p>

        <ul id="menu__list" className="pt-1">
          {PengaturanItems.map((Item, index) => (
            <Link
              to={Item.link}
              key={index}
              className={`flex px-6 py-3 cursor-pointer hover:bg-violet-50 text-b-sm items-center gap-x-4 
              ${!open && 'py-6'} ${Item.redText ? 'text-red-500' : 'text-neutral-700'}`}
            >
              <div className="w-7 h-7 rounded-lg bg-neutral-50 flex items-center justify-center">
                <Icon icon={Item.icon} className={`w-4 h-4 `} />
              </div>
              <span className={`${!open && 'hidden'} origin-left duration-200`}>{Item.title}</span>
            </Link>
          ))}
        </ul>
        {/* pengaturan end */}
      </div>
      {/* unordered list start */}
    </nav>
  );
}

export default Sidebar;
