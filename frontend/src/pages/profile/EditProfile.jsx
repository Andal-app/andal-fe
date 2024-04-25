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
          // console.log('Response:', res);
          toast.success('Berhasil memperbarui profil');
        });
    } catch (error) {
      // console.error('Error:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex">
      <Sidebar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center">
        <TopBackNav title="Ubah Profil" link="/profil" />

        <main className="w-[85%] lg:w-[80%] h-[80%] flex flex-col items-center">
          <InputProfPic src={ProfPic} />

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
