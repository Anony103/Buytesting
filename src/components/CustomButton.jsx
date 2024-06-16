
const CustomButton = ({ bgColor, textColor, buttonText, btnClassName, icon, onClick }) => {
    return ( 
        <button 
        className={`font-Poppins macScreens:px-11 md:px-5 lg:px-7 px-3 py-2 md:py-3 lg:py-2 rounded-[3px] lg:rounded-[5px] lg:text-[1.1rem] text-[.8rem] hover:bg-[#0c2218] transition-all hover:duration-700 ${btnClassName}`}
        style={{ backgroundColor: bgColor, }}
        onClick={(e) => {
            e.preventDefault()
            onClick()
        }}
        >
            {icon}
            {buttonText}
        </button>
     );
}
 
export default CustomButton;
