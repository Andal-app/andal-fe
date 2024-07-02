import React from 'react';
import InputError from './InputError';

function TextInput({ type, name, id, placeholder, required, readOnly = false, onChange, value, errors, className }) {
  // if (errors) {
  //   return <p className="bg-red-500 text-black">{errors}</p>;
  // }

  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        onChange={onChange}
        value={value}
        className={`h-10 lg:h-10 px-2.5 border border-neutral-400 text-gray-900 sm:text-sm lg:text-b-md rounded-lg focus:border-neutral-500 w-full ${className}`}
      />
      {errors && <InputError error={errors} />}
    </>
  );
}

export default TextInput;
