import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import TextInput from '../components/inputs/TextInput';
import InputLabel from '../components/inputs/InputLabel';
import PasswordInput from '../components/inputs/PasswordInput';
import SubmitBtn from '../components/buttons/SubmitBtn';
import RegisterLayout from '../layouts/auth/RegisterLayout';
import LoginNowBtn from '../components/buttons/LoginNowBtn';
import validateInput from '../helpers/validateInput';
import { useDispatch } from 'react-redux';
import { LoginAction } from '../redux/actions/authActions';

const ChildRegister = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: ''
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

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    const loginData = {
      username,
      password
    };
    dispatch(LoginAction({ form: loginData, role: 'child' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(process.env.REACT_APP_API_URL + 'auth/child/signup', {
          fullname: formData.fullname,
          username: formData.username,
          password: formData.password
        })
        .then((res) => {
          // console.log('Response:', response);
          // reset form
          setFormData({
            fullname: '',
            username: '',
            password: ''
          });

          setErrors({
            fullname: '',
            username: '',
            password: ''
          });
          toast.success(res.data.message);

          // auto login if registration success
          if (res && res.data) {
            handleLogin();
          }
        });
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <RegisterLayout>
      {/* right pane content start */}
      <div className="w-[85%] lg:w-[60%] h-[78%] lg:h-full flex flex-col items-center justify-end lg:justify-center">
        {/* greetings and form start */}
        <div className="w-full">
          <h1 className="text-b-md mb-5">Daftarkan diri Anda</h1>

          <form className="w-full" onSubmit={handleSubmit}>
            {/* form inputs start */}
            <div id="form__inputs" className="space-y-1">
              {/* full name start */}
              <div>
                <InputLabel labelFor="fullname" content="Nama Lengkap" />
                <TextInput
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="Fiorenza Celestyn"
                  required
                  onChange={handleInputChange}
                  value={formData.fullname}
                  errors={errors?.fullname}
                />
              </div>
              {/* full name end */}

              {/* username start */}
              <div>
                <InputLabel labelFor="username" content="Username" />
                <TextInput
                  type="text"
                  name="username"
                  id="username"
                  placeholder="fiorenza99"
                  required
                  onChange={handleInputChange}
                  value={formData.username}
                  errors={errors?.username}
                />
              </div>
              {/* username end */}

              {/* password start */}
              <div>
                <InputLabel labelFor="password" content="Password" />
                <PasswordInput
                  name="password"
                  id="password"
                  required
                  onChange={handleInputChange}
                  value={formData.password}
                  errors={errors?.password}
                />
              </div>
              {/* password end */}

              {/* confirm password start */}
              <div>
                <InputLabel labelFor="password" content="Konfirmasi password" />
                <PasswordInput
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  onChange={handleInputChange}
                  value={formData.confirmPassword}
                  errors={errors?.confirmPassword}
                />
              </div>
              {/* confirm password end */}
            </div>

            {/* form inputs start */}

            {/* submit button start */}
            <div className="mt-4 lg:mt-4 mb-2">
              <SubmitBtn text="Daftar" />
            </div>
            {/* submit button end */}

            {/* sign up? start */}
            <div>
              <LoginNowBtn link="/masuk/anak" />
            </div>
            {/* sign up? end */}
          </form>
        </div>
      </div>
      {/* right pane content end */}
    </RegisterLayout>
  );
};

export default ChildRegister;
