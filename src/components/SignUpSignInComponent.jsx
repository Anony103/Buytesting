import React from 'react';
import { NavLink } from 'react-router-dom';
import GoogleImg from '../assets/google.png'

const CustomButton = ({ className, text, onClick, disabled }) => (
  <button
    disabled={disabled}
    className={`custom-button bg-[#00753E] macScreens:py-3 lg:py-3 md:py-3 py-3 rounded-[5px] text-[#fff] hover:transition-all hover:duration-700 hover:bg-[#123524] lg:text-[1rem] md:text-[.8rem] text-[.7rem] w-full ${className}`}
    onClick={(e) => {
      e.preventDefault()
      onClick()
    }}
  >
    {text}
  </button>
);

const CustomLink = ({ text, href, className, SignInSignUp }) => (
  <div className={`custom-link flex gap-2 justify-center font-Nunito font-medium macScreens:text-[1.2rem] lg:text-[1rem] md:text-[.8rem] text-[.7rem] text-[#1B1F27] ${className}`}>
    {text} <NavLink to={href} className="text-[#00753E]">{SignInSignUp}</NavLink>
  </div>
);

const CustomButton2 = ({ text, href, className, SignInSignUp, onClick }) => (
  <button className={`custom-link flex gap-2 justify-center font-Nunito font-medium macScreens:text-[1.2rem] lg:text-[1rem] md:text-[.8rem] text-[.7rem] text-[#1B1F27] ${className}`} onClick={(e) => {
    e.preventDefault()
    onClick()
  }}>
    {text} <p className="text-[#00753E]">{SignInSignUp}</p>
  </button>
);

const Separator = () => (
  <div className="separator flex justify-center items-center gap-1 md:gap-5">
    <hr className="w-full"></hr>
    <h1 className="text-[#A9A9A9] font-Nunito font-light lg:text-[1rem] md:text-[.8rem] text-[.7rem]">OR</h1>
    <hr className="w-full"></hr>
  </div>
);

const SocialButton = ({ className, text, iconSrc, alt, onClick }) => (
  <button
    className={`social-button border-2 border-[#00753E] flex justify-center items-center macScreens:gap-5 lg:gap-3 gap-2 py-2 md:py-4 macScreens:py-3 lg:py-3 rounded-[5px] text-[#00753E] hover:transition-all hover:duration-700 hover:bg-[#12352437] lg:text-[1rem] md:text-[.8rem] text-[.7rem] w-full ${className}`}
    onClick={onClick}
  >
    <div className="macScreens:w-[5%] w-[5%]">
      <img className="w-full" src={GoogleImg} alt="" />
    </div>
    {text}
  </button>
);

export { CustomButton, CustomLink, CustomButton2, Separator, SocialButton };
