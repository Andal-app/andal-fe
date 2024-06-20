import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import TextInput from '../../components/inputs/TextInput';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import ProfPic from '../../assets/images/profile_picture.jpeg';
import ShowConnectCodeModal from '../../components/connect/ShowConnectCodeModal';
import BottomNavbar from '../../components/navigation/BottomNavbar';
import CodeInput from '../../components/inputs/CodeInput';

const ConnectAccount = ({ user }) => {
  const [isCodeModalOpen, setCodeModalOpen] = useState(false);
  const [childStatus, setChildStatus] = useState('');
  const [isChildFound, setIsChildFound] = useState(false);
  const [childUsername, setChildUsername] = useState('');
  const [childId, setChildId] = useState('');
  const [verifCode, setVerifCode] = useState('');

  const [formData, setFormData] = useState({
    code: ''
  });

  const handleCodeChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      code: value // Memperbarui state formData dengan nilai kode baru
    }));
  };

  // open modal & generate verification code
  const toggleCodeModal = () => {
    setCodeModalOpen(!isCodeModalOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(process.env.REACT_APP_API_URL + 'parent/check-child-username', {
          username: formData.username
        })
        .then((res) => {
          // console.log('Response:', res);
          setIsChildFound(true);
          setChildStatus(res.data.message);
          setChildUsername(res.data.child.username);
          setChildId(res.data.child.childId);
        });
    } catch (err) {
      setIsChildFound(false);

      if (err.response) {
        // console.log(err.response.data.message);
        // setChildStatus(err.response.data.message);
        setChildStatus('Pengguna tidak ditemukan');
      } else {
        // console.log(err.message);
        setChildStatus('Terjadi kesalahan. Coba cek koneksi internet Anda.');
      }
    }
  };

  // generate verification code
  const handleGenerateCode = async (childId) => {
    try {
      await axios
        .post(process.env.REACT_APP_API_URL + `parent/add-child/${childId}`, {
          role: 'parent'
        })
        .then((res) => {
          // console.log('Response:', res);
          setVerifCode(res.data.code);
        });
    } catch (err) {
      // setIsChildFound(false);
      if (err.response) {
        // console.log(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        // console.log(err.message);
        toast.error(err.message);
      }
    }
  };

  // Call handleGenerateCode when the modal is opened
  useEffect(() => {
    if (isCodeModalOpen) {
      handleGenerateCode(childId);
    }
  }, [isCodeModalOpen, childId]);

  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* page title start */}
        <TopBackNav title="Hubungkan Akun Anak" navigateTo="/beranda/orangtua" />
        {/* page title end */}

        {/* hubungkan start */}
        <div id="user__profile" className={`w-[85%] lg:w-1/2 h-screen flex flex-col items-center gap-4 py-6`}>
          {/* masukkan username anak start */}
          <form id="insert__child__username" onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <div className="space-y-4">
              {/* title start */}
              <div className="text-violet-900 text-center">
                <p className="font-bold text-h-md">MASUKKAN KODE</p>
                <p className="text-b-md">dari Ponsel Orang Tua</p>
              </div>
              {/* title end */}

              <div className="flex justify-center">
                <CodeInput onChange={handleCodeChange} />
              </div>
            </div>

            <div>
              <SubmitBtn text="Cek Akun Anak" />
              <p
                id="check_username_error"
                className={`text-left text-b-sm mt-1 ${isChildFound ? 'text-emerald-600' : 'text-red-500'}`}
              >
                {childStatus}
              </p>
            </div>
          </form>
          {/* masukkan username anak end*/}

          {/* username anak ditemukan start */}

          {isChildFound && (
            <div id="child__found" className="w-full flex flex-col items-center gap-3">
              <img id="child__profile__picture" src={ProfPic} className={`w-20 h-20 rounded-full`} />

              <p className="text-b-md font-bold mb-4">{childUsername}</p>

              <SubmitBtn text="Selanjutnya" onClick={toggleCodeModal} />

              {isCodeModalOpen && (
                <ShowConnectCodeModal toggleModal={toggleCodeModal} verifCode={verifCode ? verifCode : '-----'} />
              )}
            </div>
          )}
          {/* username anak ditemukan end */}
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
