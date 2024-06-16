import { useEffect, useState } from "react";
import { appStore, authStore } from "../../store";
import NavbarDashboard from "../../components/NavbarDashboard";
import LogoHome from "../../components/Logo";
import SidebarNavLink from "../../components/SidebarNavLink";
import SellerImg1 from "../../assets/seller-img-1.png"
import SellerImg2 from "../../assets/seller-img-2.png"
import SellerImg3 from "../../assets/seller-img-3.png"
import DynamicTableForAgent from "../../components/DynamicTableForAgent";
import CustomButton from "../../components/CustomButton";
import SearchBar2 from "../../components/SearchBarComponent2";
import Pagination from "../../components/Pagination";
import { NavLink } from "react-router-dom";
import { agentGetAllSellers, getUserByAgent } from "../../api";
import AgentSideBar from "../../components/AgentSidebar";
import { useNavigate } from "react-router-dom";

const AgentSellers = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);
    const navigate = useNavigate();
    const [sellr,setSellr]=useState([])
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
            auth.setAgentSellers(response);
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

  

    const sellersData = auth.agentData.sellers.map((seller) => {
        return {
            sellerId: seller.sellerId,
            name: seller.firstname + ' ' + seller.lastname,
            mobile: seller.businessPhone,
            email: seller.email,
            address: seller.businessAddress,
            status: seller.status ? "VERIFIED" : "UNVERIFIED"
        }
    });
    

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
                    <AgentSideBar/>
                </div>
            </div>
            <div className="w-[calc(100%-280px)] ms-[280px]">
                <NavbarDashboard token={!!auth.user?.token} />
                <div className="w-full min-h-[calc(100%-5rem)] pt-[6rem] px-[2rem] pb-[2rem] mt-[2rem] lg:pt-[5rem] lg:px-2 macScreens:px-[2rem] lg:pb-5 macScreens:pb-[3rem] grid grid-cols-2 gap-x-10">
                    <div className="col-span-2 flex justify-between">
                        <div className="flex flex-col gap-2 px-5 w-[70%]">
                            <h1 className="font-semibold text-[#110D06] text-[1.5rem]">All sellers</h1>
                            <div className="flex lg:gap-5 macScreens:gap-10 w-full">
                                <div className="w-[70%]">
                                    <SearchBar2 searchIcon={<i className='bx bx-search text-[1.2rem]'></i>} searchIconClassName="top-0 bottom-0 absolute md:left-0 right-4 w-[10%] flex justify-center items-center" inputClassName="bg-transparent border-[1px] border-[#C8C8C8] w-full h-full py-3 outline-none px-5 ps-10 rounded-[5px] text-[#B0B0B0]" placeholder="Search"  />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-end rounded-[10px] w-[30%]">
                            <CustomButton icon={<i class='bx bx-plus'></i>} buttonText="Add Seller" btnClassName="bg-[#00753E] flex items-center text-[#FBFBFB] rounded-[5px]" onClick={() => {
                                navigate("add")
                            }}/>
                        </div>
                    </div>
                    <div className="col-span-2 px-5 macScreens:mt-[5rem] lg:mt-10">
                        <DynamicTableForAgent 
                            name="Seller's Name"
                            showCheckbox={true}
                            tableIcon3={
                                <button
                                    className="text-primary dark:text-primary-400"
                                    title="Deactivate seller profile">
                                </button>
                            }
                            gotoRoute={"profile"}
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
 
export default AgentSellers;