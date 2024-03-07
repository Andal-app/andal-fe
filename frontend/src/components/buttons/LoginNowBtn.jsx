import React from 'react';
import { Link } from 'react-router-dom';

function LoginNowBtn({ link }) {
  return (
    <p className="text-b-sm text-center">
      Sudah memiliki akun?{' '}
      <Link to={link} href="#" className="font-bold hover:underline">
        Masuk
      </Link>
    </p>
  );
}

export default LoginNowBtn;
