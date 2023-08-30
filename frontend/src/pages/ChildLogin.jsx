import React from 'react';
import FormLogin from '../components/FormLogin';

const ChildLogin = () => {
  return <FormLogin getDataByRole="/child/childlogin" registerURLByRole="/child/register" />;
};

export default ChildLogin;
