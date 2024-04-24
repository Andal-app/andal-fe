import React from 'react';
import { toast } from 'react-hot-toast';

const Trial = () => {
  const handleClick = (e) => {
    toast.success('BERHASIL');
  };

  return (
    <div>
      <button onClick={handleClick} className="bg-violet-600 text white mt-10 ml-10">
        coba toast
      </button>
    </div>
  );
};

export default Trial;
