import { useEffect, useState } from "react";
import { appStore, authStore } from "../../store";
import LogoHome from "../../components/Logo";
import SidebarNavLink from "../../components/SidebarNavLink";
import CustomButton from "../../components/CustomButton";
import SearchBar2 from "../../components/SearchBarComponent2";
import AgentsImg1 from "../../assets/agent-img-1.png";
import AgentsImg2 from "../../assets/agent-img-2.png";
import AgentsImg3 from "../../assets/agent-img-3.png";
import UserIcon from "../../assets/users-icon.png";
import DollarIcon from "../../assets/dollar-icon.png";
import AdminAgentProfileCard from "../../components/AdminAgentProfileCard";
import Pagination from "../../components/Pagination";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSideBar from "../../components/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { adminGetAllAgents } from "../../api";
import { currencyFormat } from "../../utils/helpers";

const AdminAgents = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);
    const navigate = useNavigate();

    const [adminAgents, setAdminAgents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const totalPages = Math.ceil(adminAgents.length / itemsPerPage);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = adminAgents.slice(indexOfFirstItem, indexOfLastItem);


    const fetchAgents = async () => {
        try {
            const response = await adminGetAllAgents({ Authorization: `Bearer ${auth.user.token}` });
            setAdminAgents(response.agents);
            console.log(response);
        } catch (error) {
            console.log(error.message);
            if (error.message === 'jwt expired') {
                auth.logout();
            }
            throw Error(error.message);
        } finally {
            app.stopLoader();
        }
    };

    useEffect(() => {
        app.startLoader();
        fetchAgents();
        return () => app.stopLoader(); // Clean up
    }, [auth.user]);

    const agentData = adminAgents.map(agent => ({
        id: agent.id,
        name: `${agent.firstName} ${agent.lastName}`,
        email: agent.email,
        registeredSellers: agent.noOfRegisteredSeller,
        totalCommissionAmount: currencyFormat(agent.totalCommision).split('.')[0],
        data: agent
    }));


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
                    <AdminSideBar />
                </div>
            </div>
            <div className="w-[calc(100%-280px)] ms-[280px]">
                <AdminNavbar token={!!auth.user?.token} />
                <div className="w-full min-h-[calc(100%-5rem)] mt-[2rem] lg:pt-[5rem] lg:px-0 macScreens:px-[2rem] lg:pb-5 macScreens:pb-[5rem] flex flex-col gap-10">
                    <div className="flex flex-col gap-10 px-5">
                        <div className="w-full flex justify-between">
                            <h1 className="font-semibold text-[#110D06] lg:text-xl macScreens:text-xl">All Agents</h1>
                            <CustomButton
                                icon={<i className='bx bx-plus'></i>}
                                buttonText="Add Agent"
                                btnClassName="bg-[#00753E] flex items-center text-[#FBFBFB] rounded-[5px]"
                                onClick={() => navigate("add-agent")}
                            />
                        </div>
                        <div className="w-full flex justify-between">
                            <div className="w-[40%]">
                                <SearchBar2
                                    searchIcon={<i className='bx bx-search text-[1.2rem]'></i>}
                                    searchIconClassName="top-0 bottom-0 absolute md:left-0 right-4 w-[10%] flex justify-center items-center"
                                    inputClassName="bg-transparent border-[1px] border-[#C8C8C8] w-full h-full py-3 outline-none px-5 ps-10 rounded-[5px] text-[#B0B0B0]"
                                    placeholder="Search"
                                />
                            </div>
                            <CustomButton
                                buttonText="Set Commission Percentage"
                                btnClassName="bg-transparent border-2 border-[#00753E] flex items-center text-[#00753E] rounded-[5px] hover:text-white"
                            />
                        </div>
                        <div className="w-full grid lg:grid-cols-2 windowScreen:grid-cols-3 gap-x-5 gap-y-5">
                            {currentItems.map(agent => (
                                <AdminAgentProfileCard
                                    key={agent.id}
                                    data={agent.id}
                                    name={agent.name}
                                    email={agent.email}
                                    registeredSellers={agent.registeredSellers}
                                    buttonText="View Profile"
                                    buttonClassName="bg-[#00753E] text-[#FBFBFB] rounded-[5px]"
                                    DollarIcon={UserIcon}
                                    UserIcon={DollarIcon}
                                    totalCommissionAmount={agent.totalCommissionAmount}
                                />
                            ))}
                        </div>
                        <div className="max:w-full pb-10 md:pb-[0rem] mt-[-2rem] md:mt-[-2rem] md:ml-auto flex justify-center md:justify-end items-center pe-5 md:pe-0">
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
};

export default AdminAgents;
