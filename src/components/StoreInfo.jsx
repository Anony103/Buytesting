import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import IconButton from "./IconButton";

const StoreInfo = ({ 
    avatarImg,
    avatarSize,
    title,
    verified,
    sellerLinks,
    repliesTime,
    accountAge,
    socialLinks,
    buttons,
    mainIcon,
    mainIcon2,
    className,
    SellerEmail,
    SellerAddress,
    DateJoined,
    DayMonth,
}) => {

    const handleButtonClick = () => {
        // Handle button click
    };

    return ( 
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-y-0 bg-[#848484] bg-opacity-[5%] macScreens:px-20 lg:px-10 py-8">
            <div className="w-full flex justify-between items-start">
                <div className="macScreens:w-full lg:w-full w-full flex md:gap-10 items-center justify-between md:justify-between">
                    <NavLink to={sellerLinks} className={`${avatarSize} rounded-[100%] relative`}>
                        <i class='bx bx-camera text-[1.5rem] absolute bottom-0 right-0 py-2 px-2 rounded-[150px] cursor-pointer bg-[#E8E8E8]'></i>
                        {avatarImg}
                    </NavLink>
                    <div className="md:w-[80%] lg:w-full max-w-[65%] flex items-center md:items-start">
                        <div className="flex flex-col justify-center items-start gap-2 w-full">
                            <NavLink to={sellerLinks}>
                            <h1 className={`font-semibold underline text-[.8rem] md:text-[1rem] lg:text-[1.5rem] ${className}`}>{title}</h1>
                            </NavLink>
                            {verified ? (
                                <p className="bg-[#D3FBE8] px-2 py-1 rounded-[5px] text-[#00753E] text-[.5rem] md:text-[.7rem]">Verified ID</p>
                            ) : (
                                <p className="bg-[#FFD4D4] px-2 py-1 rounded-[5px] text-[#D60606] text-[.5rem] md:text-[.7rem]">ID not Verified</p>
                            )}
                            <div className="text-[#848484] flex gap-1 items-center text-[.5rem] md:text-[.8rem]">
                                {mainIcon}
                                <p>{repliesTime}</p>
                                <p>{SellerEmail}</p>
                            </div>
                            <div className="text-[#848484] flex gap-1 items-center text-[.5rem] md:text-[.8rem]">
                                {mainIcon2}
                                <p>{accountAge}</p>
                                <p className="">{SellerAddress}</p>
                            </div>
                            <div className="text-[#848484] flex gap-1 items-center text-[.5rem] md:text-[.8rem]">
                                <p>{accountAge}</p>
                                <p className="text-black">{DateJoined} <span className="text-[#848484]">{DayMonth}</span></p>
                            </div>
                            <div className="flex items-center gap-3 text-white text-[1.5rem]">
                                {socialLinks.map((link, index) => (
                                    <NavLink key={index} className="hover:text-[#0c2218] hover:transition-all hover:duration-500" to={link.url}>{link.icon}</NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <div className="lg:w-[50%] w-full flex gap-5 flex-col">
                    {buttons.map((button, index) => (
                        <IconButton
                            key={index}
                            bgColor={button.bgColor}
                            text={button.text}
                            onClick={handleButtonClick}
                            icon={button.icon}
                            textColor={button.textColor}
                            borderColor={button.borderColor}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Prop types validation
StoreInfo.propTypes = {
    avatarSize: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    verified: PropTypes.bool,
    repliesTime: PropTypes.string.isRequired,
    accountAge: PropTypes.string.isRequired,
    socialLinks: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            icon: PropTypes.node.isRequired,
        })
    ).isRequired,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            bgColor: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            icon: PropTypes.node.isRequired,
            textColor: PropTypes.string.isRequired,
            borderColor: PropTypes.string,
        })
    ).isRequired,
    mainIcon: PropTypes.node.isRequired,
};

export default StoreInfo;
