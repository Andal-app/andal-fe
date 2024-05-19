import React from 'react';
import { Link } from 'react-router-dom';

function ForgotPass({ className }) {
  return <Link className={`text-b-sm text-end ${className}`}>Lupa password?</Link>;
}

export default ForgotPass;
