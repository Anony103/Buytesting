import { useEffect, useState } from "react";
import { appStore, authStore } from "../../store";
import LogoHome from "../../components/Logo";
import SidebarNavLink from "../../components/SidebarNavLink";
import AdminCard1 from "../../assets/agent-card-1.png"
import AdminCard2 from "../../assets/agent-card-2.png"
import AdminCard3 from "../../assets/agent-card-3.png"
import AdminCard4 from "../../assets/agent-card-4.png"
import Mobile from "../../assets/mobile.png"
import Tablet from "../../assets/tablet.png"
import Desktop from "../../assets/desktop.png"
import AdminStatisticsCard from "../../components/AdminStatisticsCard";
import ChartComponent from "../../components/ChartComponent";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSideBar from "../../components/AdminSidebar";
import { adminDashboard, getUserDetails } from "../../api";

const AdminDashboard = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);
   
    console.log(`user auth ${JSON.stringify(auth.user.firstName)}`)

    const adminData = {
        fullname: `${7} ${8}`,
        dp: auth.user?.profileImage,
    }

    const greeting = () => {
        const date = new Date();
        const hours = date.getHours();
        if (hours >= 0 && hours < 12) {
            return "Good Morning";
        }
        if (hours >= 12 && hours < 17) {
            return "Good Afternoon";
        }
        return "Good Evening";
    }
    
        const fetchData =  async () => {
            await adminDashboard({Authorization: `Bearer ${auth.user.token}`}).then(response => {
                // if (!response.success) throw Error(response.message);
                auth.setAdminDashboard(response);
                console.log(response);
            }).catch(e => {
                console.log(e.message);
                console.log(e.message);
                if (e.message === 'jwt expired') {
                    auth.logout();
                }
            }).finally(() => {
                app.stopLoader();
            });
         

        }

    useEffect(() => {
        app.startLoader();

        fetchData();
    }, []);
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
                <AdminNavbar fullname={adminData.fullname} dp={adminData.dp} />       
                <div className="w-full min-h-[calc(100%-5rem)] mt-[2rem] lg:pt-[5rem] lg:px-0 macScreens:px-[2rem] lg:pb-5 macScreens:pb-[5rem] flex flex-col gap-10">
                    <div className="flex flex-col gap-5 px-2 windowScreen:px-5">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-[#110D06] lg:text-xl macScreens:text-3xl font-semibold">{greeting()}, {auth.user.firstname} 👋 </h1>
                            <p className="text-[#A1A1A1] lg:text-xs macScreens:text-xs font-Nunito font-light">Welcome to BuyMe₦aija, Manage your activities as an admin.</p>
                        </div>
                        <div className="grid grid-cols-4 lg:gap-x-2 macScreens:gap-x-5">
                            <AdminStatisticsCard
                                AdminCardIcon={AdminCard1}
                                icon={<i className='bx bx-up-arrow-alt'></i>}
                                title="Registered Buyers"
                                value={auth.adminData.dashboard.buyers.length}
                                percentage="10.0%"
                                valueStyles="text-[#00753E]"
                                percentageStyles="text-[#00753E] bg-[#CCFFE7]"
                            />
                            <AdminStatisticsCard
                                AdminCardIcon={AdminCard2}
                                icon={<i className='bx bx-down-arrow-alt'></i>}
                                title="Registered Sellers"
                                value={auth.adminData.dashboard.sellers.length}
                                percentage="10.0%"
                                percentageColor="#FF0000"
                                valueStyles="text-[#00753E]"
                                percentageStyles="bg-[rgba(255,0,0,0.1)] text-[#FF0000]"
                            />
                            <AdminStatisticsCard
                                AdminCardIcon={AdminCard3}
                                icon={<i className='bx bx-up-arrow-alt'></i>}
                                title="Number of Agents"
                                value={auth.adminData.dashboard.agents.length}
                                percentage="2.0%"
                                valueStyles="text-[#00753E]"
                                percentageStyles="text-[#00753E] bg-[#CCFFE7]"
                            />
                            <AdminStatisticsCard
                                AdminCardIcon={AdminCard4}
                                icon={<i className='bx bx-up-arrow-alt'></i>}
                                title="Total Subscribers"
                                value={auth.adminData.dashboard.subscribers.length}
                                percentage="2.0%"
                                valueStyles="text-[#00753E]"
                                percentageStyles="text-[#00753E] bg-[#CCFFE7]"
                            />
                        </div>
                        <div className="grid grid-cols-12 lg:gap-x-2 windowScreen:gap-x-5 w-full">
                            <div className="col-span-9">
                                <div className="border-[1px] border-[#EDEDED] rounded-[10px]">
                                    <ChartComponent />
                                </div>
                            </div>
                            <div className="col-span-3 flex flex-col gap-5 border-[1px] border-[#E8E8E8] rounded-[10px] lg:py-5 windowScreen:py-5 lg:px-2 windowScreen:px-7">
                                <h1 className="font-semibold text-[#161616] lg:text-sm windowScreen:text-lg">Device Category</h1>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-[40px]">
                                                <img className="w-full" src={Mobile} alt="" />
                                            </div>
                                            <p className="text-[#161616] font-Nunito lg:text-xs windowScreen:text-sm">Mobile</p>
                                        </div>
                                        <p className="text-[#00753E] font-Nunito lg:text-xs windowScreen:text-sm">96.42%</p>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-[40px]">
                                                <img className="w-full" src={Desktop} alt="" />
                                            </div>
                                            <p className="text-[#161616] font-Nunito lg:text-xs windowScreen:text-sm">Desktop</p>
                                        </div>
                                        <p className="text-[#00753E] font-Nunito lg:text-xs windowScreen:text-sm">2.76%</p>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-[40px]">
                                                <img className="w-full" src={Tablet} alt="" />
                                            </div>
                                            <p className="text-[#161616] font-Nunito lg:text-xs windowScreen:text-sm">Tablet</p>
                                        </div>
                                        <p className="text-[#00753E] font-Nunito lg:text-xs windowScreen:text-sm">0.82%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default AdminDashboard;