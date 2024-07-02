import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

export default function ToggleBtn({ onChange, value1, value2, initialShape }) {
  const [active, setActive] = useState(initialShape);

  useEffect(() => {
    setActive(initialShape);
  }, [initialShape]);

  const handleToggle = (value) => {
    setActive(value);
    onChange(value); // Mengirimkan perubahan ke parent component
  };

  return (
    <div className="h-[38px] flex gap-1 p-0.5 rounded-lg border border-violet-900 text-b-sm">
      <button
        type="button"
        className={`flex items-center justify-center w-1/2 px-4 py-2 rounded-lg transition duration-200 ease-in-out ${
          active === value1 ? 'bg-violet-700 text-white' : 'bg-white text-neutral-500'
        }`}
        onClick={() => handleToggle(value1)}
      >
        {value1}
      </button>

      <button
        type="button"
        className={`flex items-center justify-center w-1/2 px-4 py-2 rounded-lg transition duration-200 ease-in-out ${
          active === value2 ? 'bg-violet-700 text-white' : 'bg-white text-neutral-500'
        }`}
        onClick={() => handleToggle(value2)}
      >
        {value2}
      </button>
    </div>
  );
}
