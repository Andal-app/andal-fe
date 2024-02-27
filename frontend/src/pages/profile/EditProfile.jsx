import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import ProfPic from '../../assets/images/profile_picture.jpeg';
import InputLabel from '../../components/inputs/InputLabel';
import TextInput from '../../components/inputs/TextInput';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import TopBackNav from '../../components/navigation/TopBackNav';
import Sidebar from '../../components/navigation/Sidebar';

function EditProfile() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center">
        {/* top back nav start */}
        <TopBackNav title="Ubah Profil" />
        {/* top back nav end */}

        <main className="w-[90%] lg:w-[80%] h-[80%] flex flex-col items-center">
          <div id="edit__profile__picture__container" className="w-full py-12 flex items-center justify-center">
            <div id="edit__profile__picture" className=" relative">
              <img id="user__profile__picture" src={ProfPic} className={`w-36 h-36 rounded-full`}></img>

              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-violet-500 flex justify-center items-center">
                <Icon icon={'ph:camera-bold'} className="w-6 h-6 text-violet-500" />
              </div>
            </div>
          </div>

          {/* edit form start */}
          <form className="w-full h-full flex flex-col justify-between">
            <div id="edit__inputs" className="flex flex-col gap-4">
              <div id="edit__fullname">
                <InputLabel labelFor="fullname" content="Nama lengkap" />
                <TextInput type="text" name="fullname" id="fullname" placeholder="" required />
              </div>

              <div id="edit__email">
                <InputLabel labelFor="email" content="Email" />
                <TextInput type="text" name="email" id="email" placeholder="" required />
              </div>
            </div>

            <div id="edit__save__btn">
              <SubmitBtn text="Simpan" />
            </div>
          </form>
          {/* edit form start */}
        </main>
      </div>
    </div>
  );
}

export default EditProfile;
