import React from 'react';
import FormLogin from '../components/FormLogin';

const ParentLogin = () => {
  return <FormLogin getDataByRole="/user/login" registerURLByRole="/parent/register" roleTitle="Parent" />;
};

export default ParentLogin;
