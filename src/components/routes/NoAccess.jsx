import React from 'react';
import BasicLayout from '../../layouts/general/BasicLayout';

const NotFound = () => {
  return (
    <BasicLayout>
      <div className="flex flex-col justify-center items-center text-violet-900">
        <h1 className="text-8xl">403</h1>
        <p className="text-h-lg">Halaman yang Anda coba buka memiliki akses terbatas</p>
      </div>
    </BasicLayout>
  );
};

export default NotFound;
