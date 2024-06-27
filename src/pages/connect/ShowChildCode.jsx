import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import BottomNavbar from '../../components/navigation/BottomNavbar';
import { useNavigate } from 'react-router-dom';

const ShowChildCode = ({ user }) => {
  const navigate = useNavigate();
  const REFRESH_INTERVAL = 60000;
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/anak/hubungkan/masukkankode');
  };

  useEffect(() => {
    const fetchQROTP = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `child/code`);
        setQrCodeValue(response.data.code);
        setErrorMessage('');
      } catch (err) {
        if (err.response) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage('Terjadi kesalahan. Coba cek koneksi internet Anda.');
        }
        setQrCodeValue(''); // Clear the QR code value
      }
    };

    fetchQROTP();

    const interval = setInterval(fetchQROTP, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [REFRESH_INTERVAL]);

  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* page title start */}
        <TopBackNav title="Hubungkan Akun Orang Tua" navigateTo="/beranda/anak" />
        {/* page title end */}

        {/* show QR code start */}
        <div className="w-[85%] lg:w-1/2 py-8 space-y-4">
          {/* qr code start */}
          <div className="flex justify-center items-center">
            <div className="min-w-[55%] min-h-[200px] border border-dashed border-violet-600 rounded-xl flex justify-center items-center p-6">
              {qrCodeValue ? (
                <QRCode value={qrCodeValue} style={{ width: '100%', height: 'auto' }} />
              ) : (
                <p className="text-black text-center">{errorMessage || 'Terjadi Kesalahan'}</p>
              )}
            </div>
          </div>
          {/* qr code end */}

          {/* tutorial start */}
          <div className="space-y-2">
            <p className="text-h-md font-bold text-violet-900 text-center">QR Code Hubungkan</p>

            <div
              id="tutorial"
              className="w-full bg-white rounded-xl drop-shadow-xl px-12 py-6 text-b-md flex flex-col items-center"
            >
              <p>Pindai QR Code dengan akun orang tua</p>
              <ul className="list-disc text-b-md">
                <li>Buka menu ‘Hubungkan’</li>
                <li>Klik Pindai QR Code anak’</li>
              </ul>
            </div>
          </div>
          {/* tutorial end */}

          {/* button start */}
          <div className="space-y-2">
            <div className="text-b-md text-center">
              <p className="font-semibold">Sudah menerima OTP di akun orang tua?</p>
              <p>Klik tombol berikut</p>
            </div>

            <SubmitBtn text="Masukkan OTP" onClick={handleClick} />
          </div>
          {/* button end */}
        </div>
        {/* show QR code end */}
      </div>
      {/* 
  <div>
    <BottomNavbar className="h-screen flex justify-center items-center bg-gray-900" />
  </div> */}
    </div>
  );
};

export default ShowChildCode;
