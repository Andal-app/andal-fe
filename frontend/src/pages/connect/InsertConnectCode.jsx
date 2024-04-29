import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import TextInput from '../../components/inputs/TextInput';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import CodeInput from '../../components/inputs/CodeInput';

const ConnectAccount = ({ user }) => {
  const [formData, setFormData] = useState({
    code: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(process.env.REACT_APP_API_URL + 'child/verif-parent', {
          role: 'child',
          code: formData.code
        })
        .then((res) => {
          console.log('Response:', res);
        });
    } catch (err) {
      if (err.response) {
        // console.log(err.response.data.message);
        setChildStatus(err.response.data.message);
      } else {
        // console.log(err.message);
        setChildStatus('Terjadi kesalahan. Coba cek koneksi internet Anda.');
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* page title start */}
        <TopBackNav title="Hubungkan Akun Orang Tua" link="/beranda/anak/v2" />
        {/* page title end */}

        {/* hubungkan start */}
        <div id="user__profile" className={`mt-10 w-[85%] h-screen flex flex-col items-center gap-4 py-6`}>
          {/* modal title start */}
          <div className="text-violet-900 text-center">
            <p className="font-bold text-h-md">MASUKKAN KODE</p>
            <p className="text-b-md">dari Ponsel Orang Tua</p>
          </div>
          {/* modal title end */}

          <div className="flex justify-center">
            <CodeInput />
          </div>

          <p id="error__message" className="hidden text-red-600 text-b-sm">
            Username tidak ditemukan
          </p>

          <div className="w-full lg:w-[50%] mt-10">
            <SubmitBtn type="submit" text="Hubungkan" />
          </div>
        </div>
        {/* hubungkan end */}
      </div>
      {/* 
  <div>
    <BottomNavbar className="h-screen flex justify-center items-center bg-gray-900" />
  </div> */}
    </div>
  );
};

export default ConnectAccount;
