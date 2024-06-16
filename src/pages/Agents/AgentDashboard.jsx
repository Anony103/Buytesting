import { useEffect,useState } from "react";
import { appStore, authStore } from "../../store";
import NavbarDashboard from "../../components/NavbarDashboard";
import LogoHome from "../../components/Logo";
import SidebarNavLink from "../../components/SidebarNavLink";
import TotalCommissionImg from "../../assets/total-commission.png"
import TotalSellersImg from "../../assets/total-sellers.png"
import SellerImg1 from "../../assets/seller-img-1.png"
import SellerImg2 from "../../assets/seller-img-2.png"
import SellerImg3 from "../../assets/seller-img-3.png"
import DynamicTableForAgent from "../../components/DynamicTableForAgent";
import CustomButton from "../../components/CustomButton";
import { NavLink } from "react-router-dom";
import ChartComponent from "../../components/ChartComponent";
import AgentSideBar from "../../components/AgentSidebar";
import { getUserByAgent } from "../../api";
import Pagination from "../../components/Pagination";

const AgentDashboard = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);
    const [sellr,setSellr]=useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const totalPages = Math.ceil(sellr.length / itemsPerPage);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sellr.slice(indexOfFirstItem, indexOfLastItem);



      const fetchData =  async () => {
            await getUserByAgent({Authorization: `Bearer ${auth.user.token}`}).then(response => {
                // if (!response.success) throw Error(response.message);
                // auth.setAdminDashboard(response);
                setSellr(response)
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
        setTimeout(() => {
            app.stopLoader();
        }, 3000);
    }, [auth.user]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return ( 
        <section className="overflow-x-hidden h-[100vh] w-full flex relative">
            <div className="w-[280px] shadow-md fixed h-[100vh]">
                <div className="w-full flex justify-start items-center h-[15%] px-5">
                    <LogoHome LogoClassName="lg:w-[60%] md:w-[10%] w-[13%]" />
                </div>
                <div className="w-full flex justify-center items h-[85%]">
                    <AgentSideBar />
                </div>
            </div>
            <div className="w-[calc(100%-280px)] ms-[280px]">
                <NavbarDashboard token={!!auth.user?.token} />
                <div className="w-full min-h-[calc(100%-5rem)] pt-[6rem] px-[2rem] pb-[5rem] mt-[2rem] lg:pt-[5rem] lg:px-2 macScreens:px-[2rem] lg:pb-5 macScreens:pb-[5rem] grid grid-cols-2 windowScreen:gap-x-10 lg:gap-x-2">
                    <div className="flex flex-col lg:gap-5 px-2 windowScreen:px-5">
                        <div className="">
                            <h1 className="text-[#110D06] lg:text-xl macScreens:text-3xl font-semibold">Good Morning, Smith 👋 </h1>
                            <p className="text-[#A1A1A1] lg:text-xs macScreens:text-sm font-Nunito font-light">Welcome to BuyMe₦aija, Manage your activities as an agent.</p>
                        </div>
                        <div className="border-[1px] border-[#EDEDED] rounded-[10px]">
                            <div className="flex flex-col gap-2 px-7 py-3 justify-center">
                                <div className="flex gap-2 items-center">
                                    <div className="w-[10%]">
                                        <img className="w-full" src={TotalCommissionImg} alt="" />
                                    </div>
                                    <p className="font-Nunito text-[#161616] lg:text-xs">Total Commission</p>
                                </div>
                                <h1 className="text-[#161616] lg:text-lg macScreens:text-2xl font-semibold">₦ 130,000</h1>
                            </div>
                            <div className="border-t-[1px] border-[#EDEDED] text-[#A1A1A1] lg:text-xs font-Nunito font-light  px-7 py-2">Update: October 20, 2023</div>
                        </div>
                        <div className="border-[1px] border-[#EDEDED] rounded-[10px]">
                            <div className="flex flex-col gap-2 px-7 py-3 justify-center">
                                <div className="flex gap-2 items-center">
                                    <div className="w-[10%]">
                                        <img className="w-full" src={TotalSellersImg} alt="" />
                                    </div>
                                    <p className="font-Nunito text-[#161616] lg:text-xs">Total Sellers</p>
                                </div>
                                <h1 className="text-[#161616] lg:text-lg macScreens:text-2xl font-semibold">{sellr.length}</h1>
                            </div>
                            <div className="border-t-[1px] border-[#EDEDED] text-[#A1A1A1] lg:text-xs font-Nunito font-light  px-7 py-2">Last date of registration: October 20, 2023</div>
                        </div>
                    </div>
                    <div className="border-[1px] border-[#EDEDED] rounded-[10px]">
                        <ChartComponent />
                    </div>
                    <div className="col-span-2 flex flex-col gap-10 px-5">
                        <NavLink to="/seller/my-products" className="flex justify-end lg:mt-10 macScreens:mt-[5rem]">
                            <CustomButton buttonText="View All" btnClassName="bg-transparent text-[#00753E] rounded-[15px] border-[1px] border-[#00753E] hover:bg-transparent"/>
                        </NavLink>
                        <DynamicTableForAgent 
                        name="Seller's Name"
                        showCheckbox={false}
                        tableIcon2={
                            <NavLink
                                to="/admin/seller-profile"
                                className="text-primary dark:text-primary-400"
                                data-twe-toggle="tooltip"
                                title="View seller"
                                ><span className="material-symbols-outlined lg:text-[1.2rem] windowScreen:text-[1.8rem] text-[#161616] cursor-pointer border-[1px] border-[#E8E8E8] py-1 px-1 rounded-[5px]">visibility</span>
                            </NavLink>
                        }
                        tableIcon3={
                            <button
                                className="text-primary dark:text-primary-400"
                                data-twe-toggle="tooltip"
                                title="Deactivate seller"
                                ><i className='bx bx-trash cursor-pointer border-[1px] border-[#E8E8E8] py-2 px-2 rounded-[5px] text-[#161616] lg:text-[.8rem] windowScreen:text-[1.4rem]'></i>
                            </button>
                        }
                        data={currentItems} 
                        />
                        <div className="flex justify-end w-full">
                        <Pagination 
                                    activePage={currentPage} 
                                    totalPages={totalPages} 
                                    onPageChange={handlePageChange} 
                                />
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default AgentDashboard;