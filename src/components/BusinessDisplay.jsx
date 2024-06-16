import { NavLink } from "react-router-dom";

const BusinessDisplay  = ({ 
    avatarImg,
    avatarSize,
    title,
    verified,
    repliesTime,
    accountAge,
    socialLinks,
    mainIcon,
    mainIcon1,
    mainIcon2,
    className,
    SellerEmail,
    SellerAddress,
    SellerContact,
    DateJoined,
    DayMonth,
    changeAvatarImg,
    SocialLinksText,
    SocialLinksTextClassName,
    StoreInfoClass,
    brandImg,
    brandImgContainerClassName,
    brandImgClassName,
    section2ClassName,
    ActionButtonClassName,
    ActionButton,
    subscriptionPlan,
    subscriptionDuration,
    active,
}) => {

    return ( 
        <div className={`${StoreInfoClass}`}>
            <div className="w-full flex justify-between items-start">
                <div className="macScreens:w-full lg:w-full w-full flex md:gap-10 items-center justify-between md:justify-between">
                    <div className={`${avatarSize} rounded-[100%] relative`}>
                        {changeAvatarImg}
                        {avatarImg}
                    </div>
                    <div className="md:w-[80%] lg:w-full max-w-[65%] flex items-center md:items-start">
                        <div className="flex flex-col justify-center items-start gap-2 w-full">
                            <h1 className={`font-semibold underline text-[.8rem] md:text-[1rem] lg:text-xl ${className}`}>{title}</h1>
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
                                {mainIcon1}
                                <p>{SellerContact}</p>
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
                        </div>
                    </div>
                </div>
            </div>
            <div className={`w-full flex flex-col justify-center items-end ${section2ClassName}`}>
                <div className="flex flex-col justify-center items-center gap-3">
                    <div className={`${brandImgContainerClassName} rounded-[100%] relative`}>
                        <img className={`${brandImgClassName}`} src={brandImg} alt="" />
                    </div>
                    <p className={`${SocialLinksTextClassName}`}>{SocialLinksText}</p>
                    <div className={`${ActionButtonClassName}`}>
                        {ActionButton}
                    </div>
                    <div className="flex items-center gap-3 text-white text-[1.5rem]">
                        {socialLinks.map((link, index) => (
                            <NavLink key={index} className="hover:text-[#0c2218] hover:transition-all hover:duration-500" to={link.url}>{link.icon}</NavLink>
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <p className="text-[#161616] text-[.8rem] font-Nunito font-medium">{subscriptionPlan}</p>
                        <p className="text-[#848484] text-[.8rem] font-Nunito font-medium">{subscriptionDuration}</p>
                        {active ? (
                            <p className="bg-[#D3FBE8] px-2 py-1 rounded-[5px] text-[#00753E] text-[.5rem] md:text-[.7rem]">Active</p>
                        ): (
                            <p className="bg-[#FFD4D4] px-2 py-1 rounded-[5px] text-[#D60606] text-[.5rem] md:text-[.7rem]">Not Active</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BusinessDisplay ;
