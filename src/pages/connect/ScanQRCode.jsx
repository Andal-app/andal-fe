import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import Sidebar from '../../components/navigation/Sidebar';
import BottomNavbar from '../../components/navigation/BottomNavbar';
import TopBackNav from '../../components/navigation/TopBackNav';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import { Icon } from '@iconify/react';

const ScanQRCode = ({ user }) => {
  const [scanResult, setScanResult] = useState('');
  const [isScannerActive, setIsScannerActive] = useState(true);

  const handleScan = (result) => {
    if (result && result.length > 0) {
      const rawValue = result[0].rawValue;
      setScanResult(rawValue); // Mengambil nilai rawValue sebagai hasil scan
      console.log(rawValue); // Mengambil nilai rawValue sebagai hasil scan
    } else {
      console.log('No QR code detected');
    }
  };

  const handleError = (err) => {
    console.error('Error scanning QR code:', err); // Tangani error pemindai QR code
  };

  const toggleScanner = () => {
    setIsScannerActive(!isScannerActive);
  };

  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* page title start */}
        <TopBackNav title="Hubungkan Akun Anak" navigateTo="/beranda/orangtua" />
        {/* page title end */}

        <div id="scanner__container" className="w-1/2 flex flex-col items-center justify-center gap-8 mt-10">
          {/* scan QR start */}
          <div className="w-full h-[400px] flex flex-col items-center justify-center">
            {isScannerActive ? (
              <Scanner onScan={handleScan} onError={handleError} style={{ width: '100%' }} />
            ) : (
              <div className="flex flex-col justify-center items-center gap-4">
                <p className="w-1/2">
                  <Icon icon="fluent:camera-off-16-regular" className="w-full h-full text-violet-300" />
                </p>
                <p>Kamera dimatikan</p>
              </div>
            )}
            {/* {scanResult && (
            <div className="mt-4">
              <p className="text-lg font-semibold">Hasil Scan:</p>
              <p className="mt-2 text-blue-600">{scanResult}</p>
            </div>
          )} */}
          </div>
          {/* scan QR end */}

          <SubmitBtn text={isScannerActive ? 'Matikan Kamera' : 'Aktifkan Kamera'} onClick={toggleScanner} />
        </div>
      </div>
    </div>
  );
};

export default ScanQRCode;
