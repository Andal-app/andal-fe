import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ProfPic from '../../assets/images/profile_picture.jpeg';
import InputLabel from '../../components/inputs/InputLabel';
import TextInput from '../../components/inputs/TextInput';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import TopBackNav from '../../components/navigation/TopBackNav';
import Sidebar from '../../components/navigation/Sidebar';
import InputProfPic from '../../components/inputs/InputProfPic';
import validateInput from '../../helpers/validateInput';
import BottomNavbar from '../../components/navigation/BottomNavbar';
import User01aSvg from '../../assets/dummy_data/user_01a.svg';

function EditProfile({ user }) {
  const [formData, setFormData] = useState({
    fullname: user?.fullname || '',
    username: user?.username || ''
  });

  const [errors, setErrors] = useState({
    fullname: '',
    username: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));

    // Validate input on change
    const newErrors = validateInput(name, value, formData);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`${process.env.REACT_APP_API_URL}auth/update-account`, {
          fullname: formData.fullname,
          username: formData.username
        })
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
        });
    } catch (err) {
      // console.error('Error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Terjadi kesalahan, silakan coba lagi.');
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        <TopBackNav navigateTo="/profil" title="Ubah Profil" link="/profil" />

        <main className="w-[85%] lg:w-[80%] h-[80%] flex flex-col items-center">
          <InputProfPic src={user?.profilePicture} />

          <form onSubmit={handleSubmit} className="w-full h-full flex flex-col">
            <div id="edit__inputs" className="flex flex-col gap-4">
              <div id="edit__fullname">
                <InputLabel labelFor="fullname" content="Nama lengkap" />
                <TextInput
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder=""
                  required
                  value={formData.fullname}
                  onChange={handleInputChange}
                  errors={errors?.fullname}
                />
              </div>

              <div id="edit__username">
                <InputLabel labelFor="username" content="Username" />
                <TextInput
                  type="text"
                  name="username"
                  id="username"
                  placeholder=""
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  errors={errors?.username}
                />
              </div>
            </div>

            <div id="edit__save__btn" className="mt-14">
              <SubmitBtn text="Simpan" />
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default EditProfile;
