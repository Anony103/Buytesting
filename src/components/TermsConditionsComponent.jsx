import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const TermsCond = ({ id, name, labelText, termsLink, termsCondText, radioChecked }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleRadioButton = (e) => {
    e.preventDefault();
    setIsChecked(!isChecked);
    radioChecked(!isChecked);
  };

  return (
    <label className="flex items-center gap-0 lg:gap-2 relative">
      <input type="radio" className='w-[10px] h-[10px] mt-1 md:mt-0 md:h-[15px] md:w-[15px]' name={name} id={id} checked={isChecked} onChange={() => {}} />
        <button className="absolute" onClick={(e) => toggleRadioButton(e)}>
            <span className="ps-5 pe-2 text-[.5rem] small-mobile:text-[.6rem] md:text-[1rem] lg:text-[.8rem]">
            {labelText}
            </span>
            <NavLink
            to={termsLink}
            className="border-b-[1px] border-b-[#1B1F27] hover:transition-all hover:duration-700 hover:bg-[#1B1F27] hover:text-[#fff] text-[.5rem] small-mobile:text-[.6rem] md:text-[1rem] lg:text-[.8rem]"
            >
                {termsCondText}
            </NavLink>
        </button>
    </label>
  );
};

export default TermsCond;