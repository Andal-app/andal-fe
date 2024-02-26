import { useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';

function Profile() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: 'Beranda', src: 'Chart_fill', cat: 'menu_utama' },
    { title: 'Riwayat Geofencing', src: 'Chat', cat: 'menu_utama' },
    { title: 'Notifikasi', src: 'Chat', cat: 'menu_utama' },
    { title: 'Profil Pengguna', src: 'User', gap: true, cat: 'pengaturan' },
    { title: 'Keluar ', src: 'Calendar', cat: 'pengaturan' }
  ];

  return (
    <div className="flex">
      <div className={` ${open ? 'w-72' : 'w-20 '}  h-screen  py-8 relative duration-300 shadow-2xl`}>
        {/* open close button start */}
        <div
          className={`bg-violet-200 h-10 w-10 p-2 absolute cursor-pointer -right-3 top-9
           rounded-full drop-shadow-md  ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        >
          <FaAngleLeft className="w-full h-full" />
        </div>
        {/* open close button end */}

        {/* andal logo start */}
        <div className="px-6 flex gap-x-4 items-center">
          {/* <img src="./src/assets/logo.png" className={`cursor-pointer duration-500 ${open && 'rotate-[360deg]'}`} /> */}
          <div className="w-10 h-10 bg-violet-500 rounded-full"></div>
          <h1 className={`text-violet-700 origin-left font-semibold text-h-md duration-200 ${!open && 'scale-0'}`}>
            Andal
          </h1>
        </div>
        {/* andal logo end */}

        {/* user profile start */}
        <div className={`flex gap-4 px-6 my-4 py-4 bg-red-300 ${!open && 'hidden'}`}>
          <div id="profile__picture" className="w-14 h-14 rounded-full bg-black"></div>
          <div>
            <p className="text-b-lg font-semibold">Raisa Salsabil Y</p>
            <p className="text-b-md">Orang tua</p>
          </div>
        </div>
        {/* user profile end */}

        {/* unordered list start */}
        <div>
          <p id="menu__title" className={`px-6 uppercase text-b-lg font-semibold ${!open && 'hidden'}`}>
            menu utama
          </p>

          <ul id="menu__list" className="pt-1">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex px-6 py-3 cursor-pointer hover:bg-violet-50 text-neutral-700 text-b-lg items-center gap-x-4 ${
                  !open && 'py-6'
                }`}
              >
                <img src={`./src/assets/${Menu.src}.png`} />
                <span className={`${!open && 'hidden'} origin-left duration-200`}>{Menu.title}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* unordered list start */}
      </div>
    </div>
  );
}

export default Profile;
