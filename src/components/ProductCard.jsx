

const ProductCard = (props) => {
  return (
    <div className="flex flex-col md:gap-2 border-b mb-4">
      <h1 className="text-[#000] font-semibold text-[.7rem] md:text-[1.5rem]">{props.title}</h1>
      <div className="flex items-center font-Nunito text-[.5rem] md:text-[1rem] gap-2 w-full">
        <p>Posted {props.postedTime} ago</p>
        <p className="text-[#848484]">{props.location}</p>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="font-Poppins font-semibold text-[#00753E] text-[1rem] md:text-[1.2rem]">{`₦${props.price}`}</p>
        <div className="w-[15%] md:w-[7%] lg:w-[7%] h-[70%] md:h-[100%] bg-white rounded-[100%] flex justify-center items-center border-[.1px] shadow-md">
          <button className="w-[100%] md:w-[80%] h-[40%] md:h-[40%]">
            {props.bookmark  && <img className='w-full h-full object-contain' src={props.bookmark} alt="" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
