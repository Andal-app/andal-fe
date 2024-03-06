import React from 'react';

function PasswordInput({
  type = 'password',
  name = 'password',
  id = 'password',
  placeholder = '••••••••',
  required = 'true'
}) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      required={required}
      className="h-12 px-2.5 border-2 border-neutral-400 text-gray-900 sm:text-sm lg:text-b-md rounded-lg focus:border-neutral-500 w-full"
    />
  );
}

export default PasswordInput;
