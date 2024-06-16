import { useEffect } from "react";
import { authStore } from "../../store";
import Footer from "../../components/Footer";
import BuyerPathBreadCrumb from "../../components/BuyerPath";
import SellerNavbar from "../../components/SellerNavbar";
import VerticalTabs from "./VerticalTabs";
import HorizontalTabs from "../../components/HorizontalTabs";
import ProfileInfoComponent from "../../components/ProfileInfoComponent";
import ShowDivComponent from "../../components/ShowdivComponent";
import SelectDropdown from "../../components/SelectOptionsComponent";
import facebookImg from "../../assets/Facebook.png"
import InstagramImg from "../../assets/Instagram.png"
import XImg from "../../assets/x.png"

import CustomButton from "../../components/CustomButton";
import AccountProfileChangePassword from "../../components/AccountProfileChangePassword";

const SellerMyProfile = () => {
    const option1 = ["00:00", "01:00", "02:00", "03:00", "04:00"];
    const option2 = ["00:00", "01:00", "02:00", "03:00", "04:00"];
    const tabs = [
        { title: 'Profile Info',
         content: 
          <ProfileInfoComponent />
        },
        { title: 'Shop Management', 
        content: 
        <div className="h-full w-full flex flex-col justify-center items-center gap-10 border-t-[3px] mt-[-3px] border-[#E8E8E8]">
            <div className="w-full h-[90vh] ps-[5rem] py-10">
                <ul className="list-disc w-full flex flex-col gap-5">
                    <li className="w-full">
                        <ShowDivComponent ShowdivBtnClass="div-button flex items-center justify-between w-[30%]" showDivClassName="transition-div w-[30%] px-3" buttonText="Add Business Hours" 
                        content={
                        <div className="flex gap-3 items-center">
                            <SelectDropdown
                            options={option1} 
                            defaultText="From" 
                            dropdownClassName="bg-[#F1F1F1] py-3 rounded-[5px] w-full"
                            />
                            <SelectDropdown
                            options={option2} 
                            defaultText="From" 
                            dropdownClassName="bg-[#F1F1F1] py-3 rounded-[5px] w-full"
                            />
                        </div>
                        } 
                        />
                    </li>
                    <li className="w-full">
                        <ShowDivComponent ShowdivBtnClass="div-button flex items-center justify-between w-[65%]" showDivClassName="transition-div w-[65%] px-3" buttonText="Manage Social Media" 
                        content={
                        <div className="flex flex-col gap-3 items-center w-full p-3">
                            <div className="w-full">
                                <button className="flex justify-center items-center gap-3">Add <i class='bx bx-plus text-[1.5rem] text-[#00753E]' ></i></button>
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <div className="flex gap-3 w-full">
                                    <div className="relative w-[90%] flex items-center justify-between ps-3 border-4 rounded-[10px]">
                                        <div className="w-[40px] h-[40px] rounded-[100%]">
                                            <img className="w-full h-full" src={facebookImg} alt="" />
                                        </div>
                                        <input className="border-0 w-[92%] outline-0 outline-none py-3 focus:outline-none focus:border-none rounded-r-[10px]" type="text" value="https://www.facebook.com/StoreInfo" />
                                    </div>
                                    <button><i class='bx bx-trash text-[1.5rem]' ></i></button>
                                    <CustomButton buttonText="Save" btnClassName="bg-[#00753E] text-[#FBFBFB] rounded-[5px]"/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <div className="flex gap-3 w-full">
                                    <div className="relative w-[90%] flex items-center justify-between ps-3 border-4 rounded-[10px]">
                                        <div className="w-[40px] h-[40px] rounded-[100%]">
                                            <img className="w-full h-full" src={InstagramImg} alt="" />
                                        </div>
                                        <input className="border-0 w-[92%] outline-0 outline-none py-3 focus:outline-none focus:border-none rounded-r-[10px]" type="text" value="https://www.facebook.com/StoreInfo" />
                                    </div>
                                    <button><i class='bx bx-trash text-[1.5rem]' ></i></button>
                                    <CustomButton buttonText="Save" btnClassName="bg-[#00753E] text-[#FBFBFB] rounded-[5px]"/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <div className="flex gap-3 w-full">
                                    <div className="relative w-[90%] flex items-center justify-between ps-3 border-4 rounded-[10px]">
                                        <div className="w-[40px] h-[40px] rounded-[100%]">
                                            <img className="w-full h-full" src={XImg} alt="" />
                                        </div>
                                        <input className="border-0 w-[92%] outline-0 outline-none py-3 focus:outline-none focus:border-none rounded-r-[10px]" type="text" value="https://www.facebook.com/StoreInfo" />
                                    </div>
                                    <button><i class='bx bx-trash text-[1.5rem]' ></i></button>
                                    <CustomButton buttonText="Save" btnClassName="bg-[#00753E] text-[#FBFBFB] rounded-[5px]"/>
                                </div>
                            </div>
                        </div>
                        } 
                        />
                    </li>
                    <li className="w-full">
                        <div className="flex items-center gap-3">
                            <p className="">Disable Chats</p>
                            <div className="flex gap-3 items-center">
                                <div className="">
                                    <label class="switch">
                                        <input type="checkbox"  />
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div> 
        },
        { title: 'Change Password', 
        content: 
        <div className="h-full w-full flex flex-col justify-center items-center gap-10 border-t-[3px] mt-[-3px] border-[#E8E8E8]">
            <div className="w-full h-[90vh] ps-[5rem] py-10">
                <div className="lg:flex flex-col gap-7 ps-5 w-full lg:w-[60%] mt-[2rem] hidden">
                    <div className="">
                        <h1 className='font-semibold lg:text-[1rem] text-[.8rem]'>Change Password</h1>
                    </div>
                    <div className="">
                        <AccountProfileChangePassword />
                    </div>
                </div>
            </div>
        </div> 
        },
    ];
    
    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);
    const auth = authStore(state => state);
    return ( 
        <section className="overflow-x-hidden w-full flex flex-col items-center macScreens:gap-5 lg:gap-3 gap-2">
            <SellerNavbar token={!!auth.user?.token} />
            <div className="relative md:w-[90%] w-[95%] flex flex-col justify-center items-center gap-10">
                <BuyerPathBreadCrumb home="Home" shop=">  Products"/>
            </div>
            <VerticalTabs contentComponent={<HorizontalTabs tabs={tabs} />} />
            <Footer />
        </section>
     );
}
 
export default SellerMyProfile;