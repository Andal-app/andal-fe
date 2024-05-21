import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../components/inputs/TextInput';
import InputLabel from '../../components/inputs/InputLabel';
import PasswordInput from '../../components/inputs/PasswordInput';
import ForgotPass from '../../components/buttons/ForgotPass';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import RegisterNowBtn from '../../components/buttons/RegisterNowBtn';
import LoginLayout from '../../layouts/LoginLayout';
import { LoginAction } from '../../redux/actions/authActions';

const ChildLogin = () => {
  const [form, setForm] = useState({});

  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const navigate = useNavigate();
  const role = 'child';

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
        <a href="#" className="hidden lg:flex items-center mb-6 bg-violet-300 rounded-full">
          <div className="h-28 w-28 rounded-full"></div>
        </a>
        {/* logo end */}

        {/* greetings and form start */}
        <div className="w-full bg-white">
          <div className="">
            <h1 className="text-b-md mb-12 lg:mb-5">
              Halo, <br /> Selamat datang kembali
            </h1>

            <form className="w-full" onSubmit={handleSubmit}>
              <div id="form__inputs" className="space-y-2">
                {/* email start */}
                <div>
                  <InputLabel labelFor="username" content="Username" />
                  <TextInput
                    type="username"
                    name="username"
                    id="username"
                    placeholder="username anak"
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
              <div className="mt-4 mb-2">
                <SubmitBtn text="Masuk" />
              </div>
              {/* submit button end */}

              {/* sign up? start */}
              <div>
                <RegisterNowBtn link="/daftar/anak" />
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

export default ChildLogin;