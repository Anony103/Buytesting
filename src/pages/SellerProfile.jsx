import { useEffect } from "react";
import { authStore } from "../store";
// import { appStore, authStore } from "../store";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BuyerPathBreadCrumb from "../components/BuyerPath";
import SimilarAds from "../components/SimilarAds";
import Pagination from "../components/Pagination";
import StoreInfo from "../components/StoreInfo";
import SellerLogo  from  "../assets/seller-logo.png"
// import Modal from '../components/ModalComponent';
import InstagramIcon from "../assets/svg/instagram.svg";
import XIcon from "../assets/svg/X.svg";
import WhatsappIcon from "../assets/svg/WhatsApp.svg";
import FacebookIcon from "../assets/svg/facebook.svg";

const SellerProfile = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);
    const auth = authStore(state => state);

    const sellerData = {
        storeName: auth.user.businessName,
        isVerified: auth.user.isVerified,
    }
    // const modal = appStore(state => state);
    return ( 
        <section className="overflow-x-hidden w-full flex flex-col items-center macScreens:gap-5 lg:gap-3 gap-2">
            <Navbar token={!!auth.user?.token} />
            <div className="relative md:w-[90%] w-[95%] flex flex-col justify-center items-center gap-10 mt-[10rem] md:mt-[7rem]">
                <BuyerPathBreadCrumb home="Home >" shop1="Products" shop="> Seller's store"/>
                <StoreInfo
                    avatarImg={<img className="w-full" src={SellerLogo} alt="" />}
                    avatarSize="w-[30%] md:w-[50%]"
                    title="Moda-Board Gadgets"
                    className="no-underline"
                    verified={true}
                    SellerEmail="Modaboard@gmail.com"
                    SellerAddress="#35 Garrison expressway, Port Harcourt, Rivers State."
                    DateJoined="Date Joined:"
                    DayMonth="24th January, 2024"
                    socialLinks={[
                        { url: "#", icon: <img src={InstagramIcon} alt="" /> },
                        { url: "#", icon: <img src={XIcon} alt="" /> },
                        { url: "#", icon: <img src={WhatsappIcon} alt="" /> },
                        { url: "#", icon: <img src={FacebookIcon} alt="" /> }
                    ]}
                    buttons={[
                        {
                            bgColor: "#00753E",
                            text: "Show Contact",
                            icon: <i className='bx bx-phone'></i>,
                            textColor: "#fff"
                        },
                        {
                            bgColor: "#fff",
                            text: "Start chat",
                            icon: <i className='bx bx-comment-detail'></i>,
                            textColor: "#00753E",
                            borderColor: "#00753E"
                        },
                    ]}
                    mainIcon={<i className='bx bx-envelope text-[#161616] text-[24px]'></i>}
                    mainIcon2={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 13.5C11.2583 13.5 10.5333 13.2801 9.91661 12.868C9.29993 12.456 8.81928 11.8703 8.53545 11.1851C8.25162 10.4998 8.17736 9.74584 8.32206 9.01841C8.46675 8.29098 8.8239 7.6228 9.34835 7.09835C9.8728 6.5739 10.541 6.21675 11.2684 6.07206C11.9958 5.92736 12.7498 6.00162 13.4351 6.28545C14.1203 6.56928 14.706 7.04993 15.118 7.66661C15.5301 8.2833 15.75 9.00832 15.75 9.75C15.7488 10.7442 15.3533 11.6973 14.6503 12.4003C13.9473 13.1033 12.9942 13.4988 12 13.5ZM12 7.5C11.555 7.5 11.12 7.63196 10.75 7.8792C10.38 8.12643 10.0916 8.47783 9.92127 8.88896C9.75098 9.3001 9.70642 9.7525 9.79323 10.189C9.88005 10.6254 10.0943 11.0263 10.409 11.341C10.7237 11.6557 11.1246 11.87 11.561 11.9568C11.9975 12.0436 12.4499 11.999 12.861 11.8287C13.2722 11.6584 13.6236 11.37 13.8708 11C14.118 10.63 14.25 10.195 14.25 9.75C14.2494 9.15345 14.0122 8.5815 13.5903 8.15967C13.1685 7.73784 12.5966 7.5006 12 7.5Z" fill="#161616"/>
                            <path d="M12 22.5L5.67301 15.0382C5.58509 14.9262 5.49809 14.8135 5.41201 14.7C4.33124 13.2763 3.74739 11.5374 3.75001 9.75C3.75001 7.56196 4.6192 5.46354 6.16638 3.91637C7.71355 2.36919 9.81197 1.5 12 1.5C14.188 1.5 16.2865 2.36919 17.8336 3.91637C19.3808 5.46354 20.25 7.56196 20.25 9.75C20.2526 11.5366 19.669 13.2747 18.5888 14.6978L18.588 14.7C18.588 14.7 18.363 14.9955 18.3293 15.0353L12 22.5ZM6.60976 13.7963C6.60976 13.7963 6.78451 14.0272 6.82426 14.0767L12 20.181L17.1825 14.0685C17.2155 14.0272 17.391 13.7948 17.3918 13.794C18.2746 12.6308 18.7517 11.2103 18.75 9.75C18.75 7.95979 18.0388 6.2429 16.773 4.97703C15.5071 3.71116 13.7902 3 12 3C10.2098 3 8.49291 3.71116 7.22704 4.97703C5.96117 6.2429 5.25001 7.95979 5.25001 9.75C5.24844 11.2112 5.72609 12.6326 6.60976 13.7963Z" fill="#161616"/>
                            </svg>}
                />
            </div>
            <SimilarAds className="border-b-0" HeaderText="Products by Moda-Board Gadget" showComponent={true} showClearButton={false} />
            <div className="max:w-full px-7 pb-10 md:pb-[2rem] mt-[-2rem] md:mt-[-5rem] lg:mt-[-10rem] md:ml-auto flex justify-center md:justify-end items-center pe-5 md:pe-20">
                <Pagination />
            </div>
            <Footer />
            {/* <Modal modalHandler={modal} /> */}
        </section>
     );
}
 
export default SellerProfile;