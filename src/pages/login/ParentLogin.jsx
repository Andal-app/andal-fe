import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '../../components/inputs/TextInput';
import InputLabel from '../../components/inputs/InputLabel';
import PasswordInput from '../../components/inputs/PasswordInput';
import ForgotPass from '../../components/buttons/ForgotPass';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import RegisterNowBtn from '../../components/buttons/RegisterNowBtn';
import LoginLayout from '../../layouts/LoginLayout';
import { LoginAction } from '../../redux/actions/authActions';
import LogoPrimary from '../../assets/images/andal_logo_primary.svg';

const ParentLogin = () => {
  const [form, setForm] = useState({});

  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const navigate = useNavigate();
  const role = 'parent';

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(LoginAction(form, navigate, role));
  };

  return (
    <LoginLayout>
      {/* right pane content start */}
      <div className="w-[85%] lg:w-[60%] h-[78%] lg:h-full flex flex-col items-center justify-end lg:justify-center">
        {/* logo start */}
        <Link to="/" target="_blank" className="hidden lg:flex items-center mb-6 bg-violet-300 rounded-full">
          <div className="h-28 w-28 rounded-full border border-violet-900">
            <img className="w-full" src={LogoPrimary} />
          </div>
        </Link>
        {/* logo end */}

        {/* greetings and form start */}
        <div className="w-full">
          <div className="">
            <h1 className="text-b-md mb-12 lg:mb-5">
              Halo, <br /> Selamat datang kembali
            </h1>

            <form className="w-full" onSubmit={handleSubmit}>
              <div id="form__inputs" className="space-y-2">
                {/* email start */}
                <div>
                  <InputLabel labelFor="emailOrUsername" content="Email atau Username" />
                  <TextInput
                    type="text"
                    name="emailOrUsername"
                    id="emailOrUsername"
                    placeholder="email atau username"
                    required
                    onChange={handleChange}
                  />
                </div>
                {/* email end */}

                {/* password start */}
                <div className="space-y-1">
                  <div>
                    <InputLabel labelFor="password" content="Password" />
                    <PasswordInput name="password" onChange={handleChange} />
                  </div>
                  {/* lupa password start */}
                  <div className="text-end">
                    <ForgotPass />
                  </div>
                  {/* lupa password end */}
                </div>
                {/* password end */}
              </div>

              {/* submit button start */}
              <div className="mt-10 lg:mt-4 mb-2">
                <SubmitBtn text="Masuk" />
              </div>
              {/* submit button end */}

              {/* sign up? start */}
              <div>
                <RegisterNowBtn link="/daftar/orangtua" />
              </div>
              {/* sign up? end */}
            </form>
          </div>
        </div>
      </div>
      {/* right pane content end */}
    </LoginLayout>
  );
};

export default ParentLogin;
