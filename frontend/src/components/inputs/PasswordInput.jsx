import React from 'react';
import InputError from './InputError';

function PasswordInput({ id, type = 'password', name, placeholder = '••••••••', required, onChange, value, errors }) {
  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={value}
        className="h-10 lg:h-12 px-2.5 border border-neutral-400 text-gray-900 sm:text-sm lg:text-b-md rounded-lg focus:border-neutral-500 w-full"
      />
      {errors && <InputError error={errors} />}
    </>
  );
}

export default PasswordInput;
