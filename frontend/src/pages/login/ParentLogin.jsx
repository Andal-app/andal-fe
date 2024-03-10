import React from 'react';
import TextInput from '../../components/inputs/TextInput';
import InputLabel from '../../components/inputs/InputLabel';
import PasswordInput from '../../components/inputs/PasswordInput';
import ForgotPass from '../../components/buttons/ForgotPass';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import RegisterNowBtn from '../../components/buttons/RegisterNowBtn';
import LoginLayout from '../../layouts/LoginLayout';

const ParentLogin = () => {
  return (
    <LoginLayout>
      {/* right pane content start */}
      <div className="w-[85%] lg:w-[60%] h-[75%] lg:h-full flex flex-col items-center justify-end">
        {/* logo start */}
        <a href="#" className="hidden lg:flex items-center mb-6 bg-violet-300 rounded-full">
          <div className="h-28 w-28 rounded-full"></div>
        </a>
        {/* logo end */}

        {/* greetings and form start */}
        <div className="w-full">
          <div className="">
            <h1 className="text-b-md mb-12 lg:mb-5">
              Halo, <br /> Selamat datang kembali
            </h1>

            <form className="w-full" action="#">
              <div id="form__inputs" className="space-y-2">
                {/* email start */}
                <div>
                  <InputLabel labelFor="email" content="Email" />
                  <TextInput type="email" name="email" id="email" placeholder="fiorenza@xmail.com" required="true" />
                </div>
                {/* email end */}

                {/* password start */}
                <div className="space-y-1">
                  <div>
                    <InputLabel labelFor="password" content="Password" />
                    <PasswordInput />
                  </div>
                  {/* lupa password start */}
                  <div>
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
