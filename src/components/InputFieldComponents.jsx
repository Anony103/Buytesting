// InputField.js

import React, { useEffect, useState } from 'react';

const InputField = ({ label, name, placeholder, value, defaultValue, type = 'text', required, autofocus, options, onChange, selected, InputClassName }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    selected(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisibility) => !prevVisibility);
  };


  return (
    <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem]">
      <label htmlFor={name} className="placeholder placeholder-2 text-sm windowScreen:text-[1rem]">
        {label}
      </label>
      <div className="relative w-full text-[#cdcdcd]">
        {type === 'select' ? (
          <select
            onChange={handleSelectChange}
            name={name}
            id={name}
            className="input-field bg-[#F1F1F1] w-full py-2 md:py-2 px-2 macScreens:py-3 text-[.7rem] lg:text-[13px] xl:text-[1rem] lg:py-2 lg:px-2 macScreens:ps-3 macScreens:pe-10 border-none outline-0 rounded-[5px]"
            required={required}
            autoFocus={autofocus}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={isPasswordVisible ? 'text' : type}
            name={name}
            id={name}
            className={`input-field bg-[#F1F1F1] text-[#000] lg:text-sm windowScreen:text-lg w-full py-2 md:py-2 px-2 macScreens:py-3 lg:py-2 lg:px-2 macScreens:ps-3 macScreens:pe-10 border-none outline-0 rounded-[5px] ${InputClassName}`}
            required={required}
            autoFocus={autofocus}
            autoComplete="off"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
          />
        )}
        {type === 'password' && (
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer">
            <span
              className={`show-password visibility material-symbols-outlined text-[1rem] lg:text-[1.5rem] xl:text-[1.5rem] text-[#666666] ${
                isPasswordVisible ? 'hidden' : 'block'
              }`}
              onClick={togglePasswordVisibility}
            >
              visibility_off
            </span>
            <span
              className={`visibility-off material-symbols-outlined text-[1rem] lg:text-[1.5rem] xl:text-[1.5rem] text-[#666666] ${
                isPasswordVisible ? 'block' : 'hidden'
              }`}
              onClick={togglePasswordVisibility}
            >
              visibility
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
