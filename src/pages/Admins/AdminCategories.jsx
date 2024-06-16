import { useEffect, useState } from "react";
import { appStore, authStore } from "../../store";
import LogoHome from "../../components/Logo";
import SidebarNavLink from "../../components/SidebarNavLink";
import SearchBar2 from "../../components/SearchBarComponent2";
import { NavLink, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import CustomButton from "../../components/CustomButton";
import CategoriesDynamicTable from "../../components/CategoriesDynamicTable";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSideBar from "../../components/AdminSidebar";
import { adminGetAllCategory, adminToggleCategory } from "../../api";
import toast from 'react-hot-toast';
import { toastSuccess } from "../../utils/constants";

const AdminCategories = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);
    const navigate = useNavigate();

    const [categoryData, setCategoryData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const totalPages = Math.ceil(categoryData.length / itemsPerPage);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = categoryData.slice(indexOfFirstItem, indexOfLastItem);

    const fetchData = async () => {
        app.startLoader();
        try {
            const response = await adminGetAllCategory();
            const categories = response.map(category => ({
                id: category.id,
                name: category.name,
                subCategory: category.subCategory || null,
                status: category.status,
            }));
            setCategoryData(categories);
            console.log(`categories  ${JSON.stringify(response)}`);
        } catch (e) {
            console.log(e.message);
            if (e.message === 'jwt expired') {
                auth.logout();
            }
        } finally {
            app.stopLoader();
        }
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const toggleCategory = async (data) => {
        app.startLoader();
        try {
            await adminToggleCategory(data.id, {
                name: data.name,
                status: data.status,
            }, { Authorization: `Bearer ${auth.user.token}` });
            toast(`${data.name} category ${data.status ? 'activated' : 'deactivated'}`, toastSuccess);
            // Update category status locally after successful toggle
            setCategoryData(prevData => prevData.map(cat => cat.id === data.id ? { ...cat, status: data.status } : cat));
        } catch (e) {
            console.log(e.message);
            if (e.message === 'jwt expired') {
                auth.logout();
            }
        } finally {
            app.stopLoader();
        }
    }

    useEffect(() => {
        app.startLoader();
        fetchData();
        setTimeout(() => {
            app.stopLoader();
        }, 3000);
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
                <AdminNavbar token={!!auth.user?.token} />
                <div className="w-full min-h-[calc(100%-5rem)] mt-[2rem] lg:pt-[5rem] lg:px-0 macScreens:px-[2rem] lg:pb-5 macScreens:pb-[0rem] flex flex-col gap-10">
                    <div className="flex flex-col windowScreen:gap-10 gap-5 px-5">
                        <h1 className="font-semibold text-[#110D06] lg:text-xl macScreens:text-xl">Categories</h1>
                        <div className="flex flex-col gap-5">
                            <div className="flex justify-between">
                                <div className="w-[40%]">
                                    <SearchBar2 searchIcon={<i className='bx bx-search text-[1.2rem] text-[#C8C8C8]'></i>} searchIconClassName="top-0 bottom-0 absolute md:left-0 right-4 w-[10%] flex justify-center items-center" inputClassName="bg-transparent w-full h-full py-3 border-[1px] border-[#C8C8C8] outline-0 px-5 ps-10 rounded-[5px] text-[#B0B0B0]" placeholder="Search" />
                                </div>
                                <CustomButton icon={<i className='bx bx-plus'></i>} buttonText="Add New Category" btnClassName="bg-[#00753E] flex items-center text-[#FBFBFB] rounded-[5px]" onClick={() => navigate('add-category')} />
                            </div>
                            <div className="">
                                <CategoriesDynamicTable
                                    showCheckbox={true}
                                    tableIcon3={
                                        <NavLink
                                            to="/admin/seller-profile"
                                            className="text-primary dark:text-primary-400"
                                            data-twe-toggle="tooltip"
                                            title="Delete Category"
                                        ><i className='bx bx-trash cursor-pointer border-[1px] border-[#E8E8E8] py-2 px-2 rounded-[5px] text-[#161616] lg:text-[.8rem] windowScreen:text-[1.4rem]'></i>
                                        </NavLink>
                                    }
                                    data={currentItems}
                                    clickedToEdit={(data) => navigate('edit-category', { state: data })}
                                    toggledChecked={(toggleData) => toggleCategory(toggleData)}
                                />
                                <div className="flex justify-end w-full pb-[2rem]">
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
            </div>
        </section>
    );
}

export default AdminCategories;
