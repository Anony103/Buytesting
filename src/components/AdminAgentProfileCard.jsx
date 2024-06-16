import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";


// agent-profile
const AdminAgentProfileCard = ({ name, email, data, registeredSellers, buttonText, buttonClassName, totalCommissionAmount, UserIcon, DollarIcon }) => {
    
    const navigate = useNavigate();

    return (
        <div className="border-[1px] rounded-[10px] bg-[#E8E8E8] bg-opacity-[10%] py-3 px-5 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
                <div className="w-[80px]">
                    {/* <img className="w-full" src={agentImg} alt="" /> */}
                </div>
                <p className="font-semibold text-[#161616] text-sm">{name}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-Nunito text-[#848484]">
                <i className='bx bx-envelope'></i>
                <p>{email}</p>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <div className="w-[30px]">
                        <img className="w-full" src={UserIcon} alt="" />
                    </div>
                    <div className="flex flex-col lg:text-[.5rem] xl:text-xs windowScreen:text-[.5rem] macScreens:text-xs">
                        <p>{registeredSellers}</p>
                        <p className="text-[#848484]">Registered Sellers</p>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <div className="w-[30px]">
                        <img className="w-full" src={DollarIcon} alt="" />
                    </div>
                    <div className="flex flex-col lg:text-[.5rem] xl:text-xs windowScreen:text-[.5rem] macScreens:text-xs">
                        <p>{totalCommissionAmount}</p>
                        <p className="text-[#848484]">Total Commission</p>
                    </div>
                </div>
            </div>
            <CustomButton buttonText={buttonText} btnClassName="bg-[#00753E] flex justify-center items-center text-[#FBFBFB] rounded-[5px]" onClick={() => navigate(`profile/${data}`)} />
        </div>
    );
};

export default AdminAgentProfileCard;