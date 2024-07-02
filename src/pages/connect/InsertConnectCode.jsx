import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import CodeInput from '../../components/inputs/CodeInput';
import TutorialImg from '../../assets/images/tutorial.svg';
import BottomNavbar from '../../components/navigation/BottomNavbar';
import { Link } from 'react-router-dom';

const ConnectAccount = ({ user }) => {
  const [isConnectSuccess, setIsConnectSuccess] = useState(false);

  const [formData, setFormData] = useState({
    code: ''
  });

  const handleCodeChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      code: value // Memperbarui state formData dengan nilai kode baru
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
          // console.log('Response:', res);
          toast.success(res.data.message);
          setIsConnectSuccess(true);
        });
    } catch (err) {
      if (err.response) {
        // console.log(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        // console.log(err.message);
        toast.error('Terjadi kesalahan. Coba cek koneksi internet Anda.');
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* page title start */}
        <TopBackNav title="Masukkan OTP" navigateTo="/anak/hubungkan" />
        {/* page title end */}

        {/* hubungkan start */}
        {isConnectSuccess ? (
          <div className="mt-10 w-[85%] flex flex-col justify-center items-center text-center gap-10 py-6">
            <p className="font-semibold text-violet-800 text-h-sm">Akun berhasil dihubungkan dengan akun orang tua</p>

            <img src={TutorialImg} alt="Akun berhasil dihubungkan" className="w-[80%] lg:w-[50%]" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            id="user__profile"
            className={`mt-10 w-[85%] h-screen flex flex-col items-center gap-6 py-6`}
          >
            {/* modal title start */}
            <div className="text-violet-900 text-center">
              <p className="font-bold text-h-md">MASUKKAN KODE OTP</p>
              <p className="text-b-md">Kode dari Akun Orang Tua</p>
            </div>
            {/* modal title end */}

            <div className="flex justify-center">
              <CodeInput onChange={handleCodeChange} />
            </div>

            <p id="error__message" className="hidden text-red-600 text-b-sm">
              Pengguna tidak ditemukan
            </p>

            <div className="w-full lg:w-[50%] mt-6">
              <SubmitBtn type="submit" text="Hubungkan" />
            </div>

            <Link to="/anak/hubungkan" className="text-b-md font-semibold text-violet-900 underline">
              Klik untuk tampilkan QR Code
            </Link>
          </form>
        )}
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
