import React from 'react';

const IconButton = ({ className, text, onClick, icon, bgColor, textColor, borderColor }) => (
  <button
    className={`custom-button bg-[${bgColor}] border-2 border-[${borderColor}] py-3 rounded-[5px] text-[${textColor}] hover:transition-all hover:duration-700 w-full ${className}`}
    onClick={onClick}
  >
    {text}
    {icon && <span className="ms-5">{icon}</span>}
  </button>
);

export default IconButton;
