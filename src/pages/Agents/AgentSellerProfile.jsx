import { useEffect } from "react";
import { appStore, authStore } from "../../store";
import NavbarDashboard from "../../components/NavbarDashboard";
import BuyerPathBreadCrumb from "../../components/BuyerPath";
import BusinessDisplay  from "../../components/BusinessDisplay";
import SellerImage1 from "../../assets/seller-img-1.png"
import SellerLogo from "../../assets/seller-logo.png"
import CustomButton from "../../components/CustomButton";
import ProfileAds from "../../components/ProfileAds";
import { useParams, useNavigate } from 'react-router-dom';
import InstagramIcon from "../../assets/svg/instagram.svg";
import XIcon from "../../assets/svg/X.svg";
import WhatsappIcon from "../../assets/svg/WhatsApp.svg";
import FacebookIcon from "../../assets/svg/facebook.svg";
import { formatDateToLong } from "../../utils/helpers";

const AgentSellerProfile = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);
    const navigate = useNavigate();
    const { id } = useParams();
    
    const seller = auth.agentData.sellers.find(seller => seller.sellerId === id);
    if (seller === undefined) navigate(-1);

    console.log({seller});

    useEffect(() => {
        app.startLoader();
        setTimeout(() => {
            app.stopLoader();
        }, 3000);
    }, [auth.user]);
    return ( 
        <section className="overflow-x-hidden w-full flex flex-col items-center macScreens:gap-5 lg:gap-3 gap-2 pb-[3rem]">
            <NavbarDashboard navbarClassName="w-full" token={!!auth.user?.token} />
            <div className="relative md:w-[90%] w-[95%] flex flex-col justify-center items-center gap-10 mt-[7rem]">
                <BuyerPathBreadCrumb home="Sellers" shop=">  Seller's Profile"/>
                <BusinessDisplay 
                    avatarImg={<img className="w-full" src={SellerImage1} alt="" />}
                    avatarSize="w-[30%] md:w-[50%]"
                    title={`${seller.firstname} ${seller.lastname}`}
                    className="no-underline"
                    StoreInfoClass="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-y-0 bg-[#FBFBFB] macScreens:px-10 lg:px-10 py-8"
                    verified={seller.isVerified}
                    mainIcon= {<i class='bx bx-envelope'></i>}
                    SellerEmail={`${seller.email}`}
                    mainIcon1={<i class='bx bx-phone' ></i>}
                    SellerContact={`${seller.businessPhone}`}
                    mainIcon2={
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 13.5C11.2583 13.5 10.5333 13.2801 9.91661 12.868C9.29993 12.456 8.81928 11.8703 8.53545 11.1851C8.25162 10.4998 8.17736 9.74584 8.32206 9.01841C8.46675 8.29098 8.8239 7.6228 9.34835 7.09835C9.8728 6.5739 10.541 6.21675 11.2684 6.07206C11.9958 5.92736 12.7498 6.00162 13.4351 6.28545C14.1203 6.56928 14.706 7.04993 15.118 7.66661C15.5301 8.2833 15.75 9.00832 15.75 9.75C15.7488 10.7442 15.3533 11.6973 14.6503 12.4003C13.9473 13.1033 12.9942 13.4988 12 13.5ZM12 7.5C11.555 7.5 11.12 7.63196 10.75 7.8792C10.38 8.12643 10.0916 8.47783 9.92127 8.88896C9.75098 9.3001 9.70642 9.7525 9.79323 10.189C9.88005 10.6254 10.0943 11.0263 10.409 11.341C10.7237 11.6557 11.1246 11.87 11.561 11.9568C11.9975 12.0436 12.4499 11.999 12.861 11.8287C13.2722 11.6584 13.6236 11.37 13.8708 11C14.118 10.63 14.25 10.195 14.25 9.75C14.2494 9.15345 14.0122 8.5815 13.5903 8.15967C13.1685 7.73784 12.5966 7.5006 12 7.5Z" fill="#161616"/>
                        <path d="M12 22.5L5.67301 15.0382C5.58509 14.9262 5.49809 14.8135 5.41201 14.7C4.33124 13.2763 3.74739 11.5374 3.75001 9.75C3.75001 7.56196 4.6192 5.46354 6.16638 3.91637C7.71355 2.36919 9.81197 1.5 12 1.5C14.188 1.5 16.2865 2.36919 17.8336 3.91637C19.3808 5.46354 20.25 7.56196 20.25 9.75C20.2526 11.5366 19.669 13.2747 18.5888 14.6978L18.588 14.7C18.588 14.7 18.363 14.9955 18.3293 15.0353L12 22.5ZM6.60976 13.7963C6.60976 13.7963 6.78451 14.0272 6.82426 14.0767L12 20.181L17.1825 14.0685C17.2155 14.0272 17.391 13.7948 17.3918 13.794C18.2746 12.6308 18.7517 11.2103 18.75 9.75C18.75 7.95979 18.0388 6.2429 16.773 4.97703C15.5071 3.71116 13.7902 3 12 3C10.2098 3 8.49291 3.71116 7.22704 4.97703C5.96117 6.2429 5.25001 7.95979 5.25001 9.75C5.24844 11.2112 5.72609 12.6326 6.60976 13.7963Z" fill="#161616"/>
                        </svg>
                    }
                    SellerAddress={`${seller.businessAddress}`}
                    DateJoined="Date Joined:"
                    DayMonth={`${formatDateToLong(seller.createdAt)}`}
                    SocialLinksText={`${seller.businessName}`}
                    SocialLinksTextClassName="text-[1rem] font-semibold"
                    brandImgContainerClassName="w-[80px]"
                    subscriptionPlan="Subscription Plan:"
                    subscriptionDuration="3Months"
                    active={true}
                    ActionButton={
                        <CustomButton buttonText="Start Chat" btnClassName="border-[1px] border-[#00753E] text-[#00753E] hover:bg-transparent flex items-center gap-3 relative" icon={<i class='bx bx-message-alt-detail absolute right-5'></i>}/>
                    }
                    socialLinks={[
                        { url: "#", icon: <img src={InstagramIcon} alt="" /> },
                        { url: "#", icon: <img src={XIcon} alt="" /> },
                        { url: "#", icon: <img src={WhatsappIcon} alt="" /> },
                        { url: "#", icon: <img src={FacebookIcon} alt="" /> }
                    ]}
                />
                <div className="">
                    <ProfileAds className="border-b-0" HeaderText={`Products by ${seller.businessName}`} HeaderTextclassName="text-[#161616] font-semibold text-[1.5rem]" showComponent={true} showClearButton={false} />
                </div>
            </div>
        </section>
     );
}
 
export default AgentSellerProfile;