import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Scanner } from '@yudiel/react-qr-scanner';
import Sidebar from '../../components/navigation/Sidebar';
import BottomNavbar from '../../components/navigation/BottomNavbar';
import TopBackNav from '../../components/navigation/TopBackNav';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import ShowConnectCode from '../../components/connect/ShowConnectCode/ShowConnectCode';

const ScanQRCode = ({ user }) => {
  const COUNTDOWN_TIME = 300; // 300 detik = 5 menit

  const [scanResult, setScanResult] = useState('');
  const [isScannerActive, setIsScannerActive] = useState(true);
  const [otp, setOtp] = useState('');
  const [isScanSuccess, setIsScanSuccess] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);
  const [isCodeExpired, setIsCodeExpired] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Send scanResult to server when it has a value
    if (scanResult) {
      console.log('scanresult: ' + scanResult);
      sendScanResultToServer();
    }
  }, [scanResult]);

  useEffect(() => {
    let timer;
    if (isScanSuccess && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // Setiap 1 detik
    } else if (countdown === 0) {
      // Ubah status menjadi kedaluwarsa ketika hitungan mundur selesai
      setIsCodeExpired(true);
    }
    return () => clearInterval(timer);
  }, [isScanSuccess, countdown]);

  const handleScan = (result) => {
    if (result && result.length > 0) {
      const rawValue = result[0].rawValue;
      setScanResult(rawValue); // Mengambil nilai rawValue sebagai hasil scan
      console.log(rawValue); // Mengambil nilai rawValue sebagai hasil scan
    } else {
      console.log('Tidak ada QR Code terdeteksi');
    }
  };

  const handleError = (err) => {
    console.error('Error scanning QR code:', err); // Tangani error pemindai QR code
  };

  const toggleScanner = () => {
    setIsScannerActive(!isScannerActive);
    setError('');
    setScanResult('');
    setIsScanSuccess(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsScannerActive(false);
    setError('');
    setScanResult('');
    setIsScanSuccess(false);
    navigate('/orangtua/hubungkan');
  };

  const sendScanResultToServer = async () => {
    console.log('scanresult: ' + scanResult);
    try {
      await axios
        .post(process.env.REACT_APP_API_URL + 'parent/check-child-code', {
          code: scanResult
        })
        .then((res) => {
          // console.log(res.data);
          setOtp(res.data.code);
          console.log('new otp: ' + res.data.code);
          setIsScanSuccess(true);
          setIsCodeExpired(false);
          setCountdown(COUNTDOWN_TIME);
          setError('');
        });
    } catch (err) {
      setIsScannerActive(false);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Terjadi kesalahan. Coba cek koneksi internet Anda.');
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* page title start */}
        <TopBackNav title="Hubungkan Akun Anak" navigateTo="/beranda/orangtua" />
        {/* page title end */}

        {!isScanSuccess ? (
          <div
            id="scanner__container"
            className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-8 mt-10 px-8"
          >
            {/* scan QR start */}
            <div className="w-full max-w-md h-96 flex flex-col items-center justify-center">
              {isScannerActive ? (
                <Scanner onScan={handleScan} onError={handleError} style={{ width: '100%', height: '100%' }} />
              ) : (
                <div className="flex flex-col justify-center items-center gap-4">
                  <p className="w-1/2">
                    <Icon icon="fluent:camera-off-16-regular" className="w-full h-full text-violet-300" />
                  </p>
                  <p>Kamera dimatikan</p>
                  {error || (error?.length === 0 && <p className="text-red-500 font-medium">{error}</p>)}
                </div>
              )}
            </div>
            {/* scan QR end */}
            <SubmitBtn text={isScannerActive ? 'Matikan Kamera' : 'Aktifkan Kamera'} onClick={toggleScanner} />
          </div>
        ) : (
          <div id="otp__container" className={`w-[85%] lg:w-1/2 h-screen flex flex-col items-center gap-6 py-12`}>
            {/* masukkan username anak start */}
            <div id="show__otp" className="w-full flex flex-col gap-8">
              <ShowConnectCode verifCode={otp} subtitle="Masukkan kode pada akun anak" />
            </div>

            <div className="text-b-lg text-center">
              {isCodeExpired ? (
                <div>
                  <p className="text-red-500">Kode kedaluwarsa</p>
                  <p>Pindai ulang QR Code untuk memuat OTP baru</p>
                </div>
              ) : (
                <div>
                  Kode berlaku selama <span className="text-violet-900">{formatTime(countdown)}</span>
                </div>
              )}
            </div>

            <div className="w-full">
              <SubmitBtn
                text="Pindai Ulang QR Code"
                onClick={handleClick}
                bgColor="bg-yellow-700"
                bgColorHover="bg-yellow-800"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanQRCode;
