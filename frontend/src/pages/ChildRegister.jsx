import React from 'react';
import TextInput from '../components/inputs/TextInput';
import InputLabel from '../components/inputs/InputLabel';
import PasswordInput from '../components/inputs/PasswordInput';
import SubmitBtn from '../components/buttons/SubmitBtn';
import RegisterLayout from '../layouts/auth/RegisterLayout';
import LoginNowBtn from '../components/buttons/LoginNowBtn';

const ChildRegister = () => {
  return (
    <RegisterLayout>
      {/* right pane content start */}
      <div className="w-[85%] lg:w-[60%] h-[78%] lg:h-full flex flex-col items-center justify-end lg:justify-center">
        {/* greetings and form start */}
        <div className="w-full">
          <h1 className="text-b-md mb-6 lg:mb-5">Daftarkan diri Anda</h1>

          <form className="w-full" action="#">
            {/* form inputs start */}
            <div id="form__inputs" className="space-y-1 lg:space-y-2">
              {/* full name start */}
              <div>
                <InputLabel labelFor="fullName" content="Nama Lengkap" />
                <TextInput type="text" name="email" id="fullName" placeholder="Fiorenza Celestyn" required />
              </div>
              {/* full name end */}

              {/* email start */}
              <div>
                <InputLabel labelFor="username" content="Username" />
                <TextInput type="text" name="username" id="username" placeholder="FioCyber123#" required />
              </div>
              {/* email end */}

              {/* password start */}
              <div>
                <InputLabel labelFor="password" content="Password" />
                <PasswordInput />
              </div>
              {/* password end */}

              {/* confirm password start */}
              <div>
                <InputLabel labelFor="password" content="Konfirmasi password" />
                <PasswordInput />
              </div>
              {/* confirm password end */}
            </div>

            {/* form inputs start */}

            {/* submit button start */}
            <div className="mt-4 lg:mt-8 mb-2">
              <SubmitBtn text="Masuk" />
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
