import React from 'react';

function InputLabel({ labelFor, content, className }) {
  return (
    <label htmlFor={labelFor} className={`block mb-1 lg:mb-0 text-b-md ${className}`}>
      {content}
    </label>
  );
}

export default InputLabel;
