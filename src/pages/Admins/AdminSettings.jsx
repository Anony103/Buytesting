import { useEffect } from "react";
import { appStore, authStore } from "../../store";
import LogoHome from "../../components/Logo";
import SidebarNavLink from "../../components/SidebarNavLink";
import HorizontalTabs from "../../components/HorizontalTabs";
import ProfileImg from "../../assets/profile-img-1.png"
import InputField from "../../components/InputFieldComponents";
import CustomButton from "../../components/CustomButton";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSideBar from "../../components/AdminSidebar";

const AdminSettings = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);

    const tabs = [
        { 
            title: 'Profile Info', 
            content: 
            <div className="h-full w-full flex flex-col gap-2 border-t-[3px] border-[#E8E8E8] pt-[2rem] lg:px-5  macScreens:px-10">
                <div className="flex items-center gap-5 w-[50%]">
                    <div className="w-[30%]">
                        <img className="w-full" src={auth.user?.avatar} alt="no image" />
                    </div>
                    <p className="text-lg font-semibold text-[#360A13]">{auth.user?.firstName}  {auth.user?.lastName}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full rounded-[10px] lg:px-2  macScreens:px-7 py-12">
                    <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                        <InputField label="First Name" name="first-name" value={auth.user?.firstName} type="text" required onChange={(e) => console.log(e)} />
                    </div>
                    <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                        <InputField label="Last Name" name="last-name" value={auth.user?.lastName} type="text" required onChange={(e) => console.log(e)} />
                    </div>
                    <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                        <InputField label="Email Address" name="email" value={auth.user?.email} type="email" required onChange={(e) => console.log(e)} />
                    </div>
                    <div className="flex flex-col gap-y-10 w-full col-span-2 mt-3">
                        <div className="input-box justify-start flex gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem] w-full">
                            {/* <CustomButton buttonText="Save Changes"  btnClassName="bg-[#00753E] text-[#FBFBFB] text-sm windowScreen:text-lg w-[50%] rounded-[5px]"/> */}
                        </div>
                    </div>
                </div>
            </div>
        },
        { 
            title: 'Security', 
            content: 
            <div className="h-full w-full flex flex-col gap-2 border-t-[3px] border-[#E8E8E8] pt-[2rem] lg:px-5  macScreens:px-10">
                <div className="w-[50%] grid grid-cols-1 gap-7 pe-5 md:pe-0">
                    <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem] relative">
                        <InputField label="Current Password" name="password" value="" placeholder="Enter your password..." type="password" required onChange={(e) => console.log(e)} />
                    </div>
                    <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem] relative">
                        <InputField label="New Password" name="password" value="" placeholder="Enter your password..." type="password" required onChange={(e) => console.log(e)} />
                    </div>
                    <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem] relative">
                        <InputField label="Confirm Password" name="password" value="" placeholder="Enter your password..." type="password" required onChange={(e) => console.log(e)} />
                    </div>
                    <div className="flex flex-col gap-y-10 w-full mt-3">
                        <div className="input-box justify-start flex gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem] w-full">
                            <CustomButton buttonText="Create" btnClassName="bg-[#00753E] text-[#FBFBFB] w-[50%] text-sm windowScreen:text-lg rounded-[5px]"/>
                        </div>
                    </div>
                </div>
            </div>
        },
    ];
    

    useEffect(() => {
        app.startLoader();
        setTimeout(() => {
            app.stopLoader();
        }, 3000);
    }, [auth.user]);
    return ( 
        <section className="overflow-x-hidden h-[100vh] w-full flex relative">
            <div className="w-[280px] shadow-md fixed h-[100vh]">
                <div className="w-full flex justify-start items-center h-[15%] px-5">
                    <LogoHome LogoClassName="lg:w-[60%] md:w-[10%] w-[13%]" />
                </div>
                <div className="w-full flex justify-center items h-[85%]">
                    <AdminSideBar />
                </div>
            </div>
            <div className="w-[calc(100%-280px)] ms-[280px]">
                <AdminNavbar token={!!auth.user?.token} />
                <div className="w-full min-h-[calc(100%-5rem)] mt-[2rem] lg:pt-[4rem] lg:px-0 macScreens:px-[2rem] lg:pb-0 macScreens:pb-[0rem]  flex flex-col gap-10">
                    <div className="flex flex-col windowScreen:gap-10 gap-5 px-5">
                        <h1 className="font-semibold text-[#110D06] lg:text-xl macScreens:text-xl">Settings</h1>
                        <HorizontalTabs tabs={tabs} tabClassName="z-0" />
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default AdminSettings;