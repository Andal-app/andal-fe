import React from 'react';
import FormRegister from '../components/FormRegister';

const ParentRegister = () => {
  return <FormRegister roleTitle="Parent" urlRole="/user/register" urlRoleLogin="/parent/login" />;
};

export default ParentRegister;
