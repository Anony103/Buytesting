import React, { useState } from 'react';

const SelectDropdown = ({ options, defaultText, dropdownClassName }) => {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultText);

  const handleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setActiveDropdown(false);
  };

  // Close dropdown when clicked outside
  const handleOutsideClick = (e) => {
    if (!e.target.closest('.wrapper-dropdown')) {
      setActiveDropdown(false);
    }
  };

  return (
    <div className="center" onClick={handleOutsideClick}>
      <div className="dropdown-container">
        {/* Dropdown */}
        <div className={`wrapper-dropdown ${dropdownClassName} ${activeDropdown ? 'active' : ''}`} onClick={handleDropdown}>
          <span className="selected-display" id="destination">{selectedOption}</span>
          <svg className={`arrow ${activeDropdown ? 'rotated' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <ul className="dropdown h-[9.5rem] overflow-y-scroll">
            {options.map((option, index) => (
              <li key={index} className="item" onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectDropdown;
