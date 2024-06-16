import { useEffect, useState } from "react";
import { appStore, authStore } from "../../store";
import LogoHome from "../../components/Logo";
import SidebarNavLink from "../../components/SidebarNavLink";
import SearchBar2 from "../../components/SearchBarComponent2";
import DynamicTableForAdmin from "../../components/DynamicTableForAdmin";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import dp from '../../assets/dp.jpeg'
import AdminNavbar from "../../components/AdminNavbar";
import AdminSideBar from "../../components/AdminSidebar";
import { adminGetALlBuyer } from "../../api";

const AdminBuyers = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);

    const navigate = useNavigate();

    const [buyerData, setBuyerData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const totalPages = Math.ceil(buyerData.length / itemsPerPage);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = buyerData.slice(indexOfFirstItem, indexOfLastItem);

    const fetchData = async () => {
        await adminGetALlBuyer({ Authorization: `Bearer ${auth.user.token}` }).then(async response => {
            // if (!response.success) throw Error(response.message);
            const buyers = []
            response.buyers.map(buyer => {
                buyers.push({
                    imgSrc: buyer.avatar || dp,
                    name: `${buyer.firstName} ${buyer.lastName}`,
                    firstname: buyer.firstName,
                    lastname: buyer.lastName,
                    mobile: buyer.phoneNumber,
                    email: buyer.email,
                    status: true
                })
            })
            console.log(`buyers ${JSON.stringify(buyers)}`)
            setBuyerData(response.buyers);
            response.buyers && auth.setAdminBuyers(response.buyers);
        }).catch(e => {
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
    }, []);

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
                    <div className="flex flex-col windowScreen:gap-10 gap-5 px-5">
                        <h1 className="font-semibold text-[#110D06] lg:text-xl macScreens:text-xl">All Buyers</h1>
                        <div className="flex">
                            <div className="w-[50%]">
                                <SearchBar2 searchIcon={<i className='bx bx-search text-[1.2rem]'></i>} searchIconClassName="top-0 bottom-0 absolute md:left-0 right-4 w-[10%] flex justify-center items-center" inputClassName="bg-transparent border-[1px] border-[#C8C8C8] w-full h-full py-3 outline-none px-5 ps-10 rounded-[5px] text-[#B0B0B0]" placeholder="Search"  />
                            </div>
                        </div>
                        <div className="col-span-2 windowScreen:px-5 lg:px-0">
                            <DynamicTableForAdmin 
                                name="Full Name"
                                showCheckbox={true}
                                gotoRoute={"/admin/buyer-profile"}
                                tableIcon2={
                                    <button
                                        className="text-primary dark:text-primary-400"
                                        data-twe-toggle="tooltip"
                                        title="Deactivate seller"
                                    ><i class='bx bx-error-circle cursor-pointer border-[1px] border-[#E8E8E8] py-2 px-2 rounded-[5px] text-[#161616] lg:text-[.8rem] windowScreen:text-[1.4rem] hover:border-red-600 hover:text-red-600 hover:duration-500'></i>
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
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default AdminBuyers;