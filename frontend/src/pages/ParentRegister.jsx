import React, { useState } from 'react';
import TextInput from '../components/inputs/TextInput';
import InputLabel from '../components/inputs/InputLabel';
import PasswordInput from '../components/inputs/PasswordInput';
import SubmitBtn from '../components/buttons/SubmitBtn';
import RegisterLayout from '../layouts/auth/RegisterLayout';
import LoginNowBtn from '../components/buttons/LoginNowBtn';

const ParentRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <RegisterLayout>
      {/* right pane content start */}
      <div className="w-[85%] lg:w-[60%] h-[78%] lg:h-full flex flex-col items-center justify-end lg:justify-center">
        {/* greetings and form start */}
        <div className="w-full bg-white">
          <h1 className="text-b-md mb-6 lg:mb-5">Daftarkan diri Anda</h1>

          <form className="w-full" onSubmit={handleSubmit}>
            {/* form inputs start */}
            <div id="form__inputs" className="space-y-1 lg:space-y-2">
              {/* full name start */}
              <div>
                <InputLabel labelFor="fullName" content="Nama Lengkap" />
                <TextInput
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Fiorenza Celestyn"
                  required
                  onChange={handleInputChange}
                  value={formData.fullName}
                />
              </div>
              {/* full name end */}

              {/* email start */}
              <div>
                <InputLabel labelFor="email" content="Email" />
                <TextInput
                  type="email"
                  name="email"
                  id="email"
                  placeholder="fiorenza@xmail.com"
                  required
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </div>
              {/* email end */}

              {/* password start */}
              <div>
                <InputLabel labelFor="password" content="Password" />
                <PasswordInput name="password" id="password" onChange={handleInputChange} value={formData.password} />
              </div>
              {/* password end */}

              {/* confirm password start */}
              <div>
                <InputLabel labelFor="password" content="Konfirmasi password" />
                <PasswordInput name="confirmPassword" id="confirmPassword" />
              </div>
              {/* confirm password end */}
            </div>

            {/* form inputs start */}

            {/* submit button start */}
            <div className="mt-4 lg:mt-8 mb-2">
              <SubmitBtn text="Masuk" />
            </div>
            {/* submit button
             end */}

            {/* sign up? start */}
            <div>
              <LoginNowBtn link="/masuk/orangtua" />
            </div>
            {/* sign up? end */}
          </form>
        </div>
      </div>
      {/* right pane content end */}
    </RegisterLayout>
  );
};

export default ParentRegister;
