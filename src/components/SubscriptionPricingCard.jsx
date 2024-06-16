import React from 'react';

const SubscriptionPricingCard = ({ duration, price, description }) => {
  return (
    <div className="bg-[#FFFFFF] shadow-md h-[25rem] rounded-[10px] px-10 pt-7 pb-5 flex flex-col justify-between items-center">
      <div className="flex flex-col items-center gap-10">
        <p className="text-[#161616] font-semibold text-lg">{duration}</p>
        <h1 className="text-[#161616] font-bold macScreens:text-5xl lg:text-3xl">{price}</h1>
        <p className="text-[#77838F] text-center font-Nunito lg:text-lg 2xl:text-lg">{description}</p>
      </div>
      <div className="flex gap-5 w-full">
        <button
          className="text-primary dark:text-primary-400"
          data-twe-toggle="tooltip"
          title="Edit"
        >
          <i className='bx bx-edit cursor-pointer border-[1px] border-[#E8E8E8] py-2 px-2 rounded-[5px] text-[#161616] text-[1.4rem] hover:border-red-600 hover:text-red-600 hover:duration-500'></i>
        </button>
        <button
          className="text-primary dark:text-primary-400"
          data-twe-toggle="tooltip"
          title="Delete"
        >
          <i className='bx bx-trash cursor-pointer border-[1px] border-[#E8E8E8] py-2 px-2 rounded-[5px] text-[#161616] text-[1.4rem] hover:border-red-600 hover:text-red-600 hover:duration-500'></i>
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPricingCard;