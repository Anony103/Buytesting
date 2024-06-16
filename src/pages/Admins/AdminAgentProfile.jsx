import { useEffect, useState } from "react";
import { appStore, authStore } from "../../store";
import LogoHome from "../../components/Logo";
import SidebarNavLink from "../../components/SidebarNavLink";
import CustomButton from "../../components/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import AdminProfileBoard from "../../components/AdminProfileBoard";
import AgentImg1 from "../../assets/agent-img-1.png"
import dp from "../../assets/dp.jpeg";
import UndrawData from "../../assets/undraw-no-data.png"
import AdminNavbar from "../../components/AdminNavbar";
import { currencyFormat, formatDate, formatNumber } from "../../utils/helpers";
import AdminSideBar from "../../components/AdminSidebar";
import DynamicTableForAdmin from "../../components/DynamicTableForAdmin";
import SellerImg1 from "../../assets/seller-img-1.png"
import SellerImg2 from "../../assets/seller-img-2.png"
import SellerImg3 from "../../assets/seller-img-3.png"
import Pagination from "../../components/Pagination";
import { adminGetAllAgents, getUserByAgent } from "../../api";


const AdminAgentProfile = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);
    const [sellerData,setSellerData]=useState([])
    const { id } = useParams();

    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1); // Navigate back one step
    };

    const agent = auth.adminData.agents.find(agent => agent.id === id);
    console.log(agent);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const totalPages = Math.ceil(sellerData.length / itemsPerPage);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sellerData.slice(indexOfFirstItem, indexOfLastItem);

    const fetchAgents = async () => {
        try {
            await getUserByAgent({ Authorization: `Bearer ${auth.user.token}` }).then(response => {
                // if (!response.success) throw Error(response.message);
                // auth.setAdminAgents(response);
                console.log(response);
                setSellerData(response)
            }).catch(e => {
                console.log(e.message);
                if (e.message === 'jwt expired') {
                    auth.logout();
                }
                throw Error(e.message);
            }).finally(() => {
                app.stopLoader();
            });
            
        } catch (error) {
            console.log(error.message);
        }
    }

    // const sellersData = [
    //     {
    //         imgSrc: SellerImg1,
    //         name: 'Jenny Wilson',
    //         mobile: '(808) 555-0111',
    //         email: 'jenny.wilson@demo.com',
    //         address: '8502 Preston Rd. Inglewood, Maine'
    //     },
    //     {
    //         imgSrc: SellerImg2,
    //         name: 'Esther Howard',
    //         mobile: '(239) 555-0108',
    //         email: 'esther.howard@demo.com',
    //         address: '3891 Ranchview Dr. Richardson, CA'
    //     },
    //     {
    //         imgSrc: SellerImg3,
    //         name: 'Darlene Robertson',
    //         mobile: '(239) 555-0108',
    //         email: 'darlene.r@demo.com',
    //         address: '2972 Westheimer Rd. Santa Ana,'
    //     },
    //     {
    //         imgSrc: SellerImg3,
    //         name: 'Darlene Robertson',
    //         mobile: '(239) 555-0108',
    //         email: 'darlene.r@demo.com',
    //         address: '2972 Westheimer Rd. Santa Ana,'
    //     },
    //     {
    //         imgSrc: SellerImg1,
    //         name: 'Jenny Wilson',
    //         mobile: '(808) 555-0111',
    //         email: 'jenny.wilson@demo.com',
    //         address: '8502 Preston Rd. Inglewood, Maine'
    //     },
    //     {
    //         imgSrc: SellerImg2,
    //         name: 'Esther Howard',
    //         mobile: '(239) 555-0108',
    //         email: 'esther.howard@demo.com',
    //         address: '3891 Ranchview Dr. Richardson, CA'
    //     },
    //     {
    //         imgSrc: SellerImg3,
    //         name: 'Darlene Robertson',
    //         mobile: '(239) 555-0108',
    //         email: 'darlene.r@demo.com',
    //         address: '2972 Westheimer Rd. Santa Ana,'
    //     },
    //     {
    //         imgSrc: SellerImg3,
    //         name: 'Darlene Robertson',
    //         mobile: '(239) 555-0108',
    //         email: 'darlene.r@demo.com',
    //         address: '2972 Westheimer Rd. Santa Ana,'
    //     },
    //     {
    //         imgSrc: SellerImg1,
    //         name: 'Jenny Wilson',
    //         mobile: '(808) 555-0111',
    //         email: 'jenny.wilson@demo.com',
    //         address: '8502 Preston Rd. Inglewood, Maine'
    //     },
    //     {
    //         imgSrc: SellerImg2,
    //         name: 'Esther Howard',
    //         mobile: '(239) 555-0108',
    //         email: 'esther.howard@demo.com',
    //         address: '3891 Ranchview Dr. Richardson, CA'
    //     },
    //     {
    //         imgSrc: SellerImg3,
    //         name: 'Darlene Robertson',
    //         mobile: '(239) 555-0108',
    //         email: 'darlene.r@demo.com',
    //         address: '2972 Westheimer Rd. Santa Ana,'
    //     },
    //     {
    //         imgSrc: SellerImg3,
    //         name: 'Darlene Robertson',
    //         mobile: '(239) 555-0108',
    //         email: 'darlene.r@demo.com',
    //         address: '2972 Westheimer Rd. Santa Ana,'
    //     },
    // ];

    useEffect(() => {
        app.startLoader();
        fetchAgents()
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
                    <div className="tab-list w-full h-full flex flex-col gap-5 px-5 py-[1rem]">
                        <AdminSideBar />
                    </div>
                </div>
            </div>
            <div className="w-[calc(100%-280px)] ms-[280px]">
                <AdminNavbar token={!!auth.user?.token} />
                <div className="w-full min-h-[calc(100%-5rem)] mt-[2rem] lg:pt-[5rem] lg:px-0 macScreens:px-[2rem] lg:pb-5 macScreens:pb-[5rem] flex flex-col gap-10">
                    <div className="flex flex-col windowScreen:gap-7 lg:gap-5 px-5">
                        <div className="w-full flex justify-between">
                            <div className="flex gap-2 items-center">
                                <i class='bx bx-arrow-back lg:text-lg windowScreen:text-2xl' onClick={goBack}></i>
                                <h1 className="font-semibold lg:text-lg windowScreen:text-2xl text-[#000]">Agent Profile</h1>
                            </div>
                            <div className="flex lg:flex-col xl:flex-row lg:gap-2 xl:gap-5 justify-end lg:w-[50%] xl:w-[70%]">
                                <CustomButton buttonText="Set Commission Percentage" btnClassName="bg-transparent border-2 border-[#00753E] flex items-center text-[#00753E] lg:text-sm xl:text-sm flex justify-center rounded-[5px] hover:text-white"/>
                                {
                                    // !agent.active ? (
                                        <CustomButton buttonText="Deactivate Agent" btnClassName="bg-[#D60606] text-[#FBFBFB] rounded-[5px] lg:text-sm xl:text-sm flex justify-center" onClick={() => {}} />
                                    // ) 
                                    
                                    // : (
                                    //     <CustomButton buttonText="Activate Agent" btnClassName="bg-[#00753E] text-[#FBFBFB] rounded-[5px] lg:text-sm xl:text-sm flex justify-center" onClick={() => {}} />
                                    // )
                                }
                            </div>
                        </div>
                        <AdminProfileBoard
                            avatarImg={<img className="w-full" src={dp} alt="" />}
                            avatarSize="w-[30%] md:w-[50%]"
                            title={`${agent.firstName} ${agent.lastName}`}
                            AgentNo={agent.phoneNumber}
                            className="no-underline"
                            AgentEmail={agent.email}
                            StoreInfoClass="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-y-0 bg-[#FBFBFB] xl:px-10 lg:px-2 py-8"
                            DateJoined={formatDate(agent.createdAt)}
                            RegisteredSeller={sellerData.length}
                            TotalCommission={currencyFormat(agent.totalCommision)}
                            ActionButton={
                                <CustomButton buttonText="Start Chat" btnClassName="border-[1px] border-[#00753E] text-[#00753E] hover:bg-transparent flex items-center lg:pe-10 gap-3 lg:text-sm xl:text-sm relative" icon={<i class='bx bx-message-alt-detail absolute right-5'></i>} onClick={() => {
                                    
                                }}/>
                            }
                        />
                        <div className="flex flex-col gap-2">
                        {
                            sellerData.length > 0 ? (
                                <>
                                    <p className="text-[#161616] font-semibold lg:text-sm windowScreen:text-xl">Registered Sellers</p>
                                    <div className="col-span-2">
                                        <DynamicTableForAdmin 
                                            name="Seller's name"
                                            showCheckbox={true}
                                            tableIcon1={
                                                <button
                                                className="text-primary dark:text-primary-400"
                                                data-twe-toggle="tooltip"
                                                title="View seller"
                                                ><span className="material-symbols-outlined lg:text-[1.2rem] windowScreen:text-[1.8rem] text-[#161616] cursor-pointer border-[1px] border-[#E8E8E8] py-1 px-1 rounded-[5px]">visibility</span>
                                                </button>
                                            }
                                            data={currentItems} 
                                        />
                                        <div className="flex justify-end w-full pb-[5rem]">
                                        <Pagination 
                                    activePage={currentPage} 
                                    totalPages={totalPages} 
                                    onPageChange={handlePageChange} 
                                />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-[#161616] text-lg font-semibold lg:text-lg windowScreen:text-xl">Registered Sellers</p>
                                    <div className="flex flex-col gap-5 justify-center items-center">
                                        <div className="w-[20%]">
                                            <img className="w-full object-contain" src={UndrawData} alt="" />
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <p className="lg:text-lg windowScreen:text-2xl font-semibold">No Registered Seller!</p>
                                            <p className="font-Nunito text-[#5C6375] lg:text-xs windowScreen:text-sm">This agent currently have no registered seller.</p>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default AdminAgentProfile;