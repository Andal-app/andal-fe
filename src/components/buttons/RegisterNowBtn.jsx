import React from 'react';
import { Link } from 'react-router-dom';

function RegisterNowBtn({ link }) {
  return (
    <p className="text-b-sm text-center">
      Belum memiliki akun?{' '}
      <Link to={link} href="#" className="font-bold hover:underline">
        Daftar sekarang
      </Link>
    </p>
  );
}

export default RegisterNowBtn;
