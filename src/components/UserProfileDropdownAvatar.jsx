

export default function UserProfileDropdownAvatar({ image, text, size }) {
  const commonStyles = `rounded-full lg:w-[50px] lg:h-[50px] md:w-[35px] md:h-[35px] w-[30px] h-[30px] rounded-[100%]`;

  if (image) {
    return (
      <div className={`${commonStyles} ${size}`}>
        <img className="w-full h-full" src={image} alt="" />
      </div>
    );
  } else if (text) {
    return (
      <div className={`${commonStyles} bg-gray-300 flex items-center justify-center text-gray-600 font-semibold ${size}`}>
        {text}
      </div>
    );
  }

  return null;
}
