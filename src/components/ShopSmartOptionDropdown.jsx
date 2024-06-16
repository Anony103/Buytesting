import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SmartOptionDropdown = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left -mb-2">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center items-center px-4 py-2 bg-transparent focus:outline-none transition"
      >
        {label}
        <svg
          className={`ml-2 w-7 h-7 transform ${isOpen ? 'rotate-90' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#000"
        >
          <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute z-20 right-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <NavLink to={"#"} className="block px-4 py-2 hover:bg-gray-100" role="menuitem">
              {options}
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartOptionDropdown;
