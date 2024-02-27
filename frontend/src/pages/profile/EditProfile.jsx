import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import ProfPic from '../../assets/images/profile_picture.jpeg';
import InputLabel from '../../components/inputs/InputLabel';
import TextInput from '../../components/inputs/TextInput';
import SubmitBtn from '../../components/buttons/SubmitBtn';

function EditProfile() {
  return (
    <div className="h-screen flex flex-col items-center">
      {/* top nav start */}
      <nav className="w-full relative h-24 flex justify-center items-center">
        {/* back button start */}

        <Link className="absolute left-0 top-0 w-14 h-full flex items-center justify-center">
          <div className="flex justify-center items-center w-8 h-8 rounded-full bg-neutral-200">
            <Icon icon={'ic:round-arrow-back'} className="w-6 h-6 text-black" />
          </div>
        </Link>
        {/* back button end */}

        <h1 className="font-bold text-b-xl text-center">Ubah Profil</h1>
      </nav>
      {/* top nav end */}

      <main className="w-[90%] h-[80%] flex flex-col items-center">
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
          <div id="edit__inputs">
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
            <SubmitBtn />
          </div>
        </form>
        {/* edit form start */}
      </main>
    </div>
  );
}

export default EditProfile;
