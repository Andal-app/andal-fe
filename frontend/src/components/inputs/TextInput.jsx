import React from 'react';

function TextInput({ type, name, id, placeholder, required }) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      required={required}
      className="h-14 px-2.5 border-2 border-neutral-400 text-gray-900 sm:text-sm rounded-lg focus:border-neutral-500 w-full"
    />
  );
}

export default TextInput;
