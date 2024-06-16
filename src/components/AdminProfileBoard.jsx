const AdminProfileBoard = ({
    avatarImg,
    avatarSize,
    title,
    website,
    AgentNo,
    AgentEmail,
    className,
    DateJoined,
    changeAvatarImg,
    StoreInfoClass,
    section2ClassName,
    ActionButtonClassName,
    ActionButton,
    RegisteredSeller,
    TotalCommission,
}) => {
    return (
        <div className={StoreInfoClass}>
            <div className="w-full flex justify-between items-start">
                <div className="macScreens:w-full lg:w-full w-full flex items-center lg:gap-5">
                    <div className={`${avatarSize} rounded-[100%] relative`}>
                        {changeAvatarImg}
                        {avatarImg}
                    </div>
                    <div className="md:w-[80%] lg:w-full max-w-[65%] flex items-center md:items-start">
                        <div className="flex flex-col justify-center items-start gap-2 w-full">
                            <h1 className={`font-semibold underline text-[.8rem] md:text-lg xl:text-xl ${className}`}>{title}</h1>
                            <p className="text-[#848484] text-[.5rem] lg:text-[.7rem] xl:text-xs">{website}</p>
                            <p className="bg-[#D3FBE8] px-2 py-1 rounded-[5px] text-[#00753E] lg:text-[.5rem] xl:text-xs">{DateJoined}</p>
                            <div className="text-[#848484] flex flex-col gap-1  lg:text-[.6rem] xl:text-xs">
                                <p className="text-black">Mobile: <span className="text-[#848484]">{AgentNo}</span></p>
                                <p className="text-black">Email: <span className="text-[#848484]">{AgentEmail}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`w-full flex flex-col justify-center items-end ${section2ClassName}`}>
                <div className="flex flex-col justify-center gap-3">
                    <div className="text-[#848484] flex flex-col gap-1">
                        <p className="text-black text-[.5rem] md:text-sm xl:text-xl">Registered Sellers: <span className="text-[#848484]">{RegisteredSeller}</span></p>
                        <p className="text-black text-[.5rem] md:text-sm xl:text-xl">Total Commission : <span className="text-[#00753E] font-bold">{TotalCommission}</span></p>
                    </div>
                    <div className={ActionButtonClassName}>
                        {ActionButton}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfileBoard;
