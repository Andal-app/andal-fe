import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import CancelBtn from '../../components/buttons/CancelBtn';
import RedConfirmBtn from '../../components/buttons/RedConfirmBtn';
import Sidebar from '../../components/navigation/Sidebar';
import TopWave1Red from '../../assets/waves/wave_top_1_red.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogoutAction } from '../../redux/actions/authActions';
import BottomNavbar from '../../components/navigation/BottomNavbar';

function ConfirmDelete({ user }) {
  const navigate = useNavigate();

  // logout action
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(LogoutAction());
  };

  // delete button
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}auth/delete-account`)
        .then(() => {
          toast.success('Akun berhasil dihapus');
          handleLogout();
          navigate('/');
        })
        .finally();
    } catch (error) {
      toast.error(`Gagal menghapus akun. ${error.message}`);
    }
  };

  return (
    <div className="flex ">
      <style>
        {`
      body {
        overflow: hidden;
      }
    `}
      </style>

      <Sidebar user={user} />
      <BottomNavbar user={user} />

      <div id="main__container" className="w-full lg:w-1/2 bg-white h-screen flex items-center justify-center">
        {/* top wave start */}
        <div className="lg:hidden fixed top-0 left-0 right-0 w-full">
          <img src={TopWave1Red} className="bg-red-300 w-full" />
        </div>
        {/* top wave end */}

        <main className="mt-[100px] lg:mt-0 h-full px-8 text-center flex flex-col justify-center gap-48">
          <div className="px-8">
            <h5 className="font-bold text-b-md mb-4">Yakin ingin menghapus akun Anda secara permanen?</h5>
            <p className="text-b-sm">Anda tidak dapat mengembalikan data yang telah dihapus.</p>
          </div>

          <div className="flex flex-col gap-3">
            <RedConfirmBtn onClick={handleDelete} />
            <CancelBtn onClick={() => [navigate(`/profil`)]} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ConfirmDelete;
