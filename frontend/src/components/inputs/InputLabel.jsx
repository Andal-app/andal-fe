import React from 'react';

function InputLabel({ labelFor, content }) {
  return (
    <label for={labelFor} className="block mb-1 text-b-lg">
      {content}
    </label>
  );
}

export default InputLabel;
