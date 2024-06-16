import { useEffect, useState } from "react";
import { appStore, authStore } from "../../store";
import LogoHome from "../../components/Logo";
import SidebarNavLink from "../../components/SidebarNavLink";
import InputField from "../../components/InputFieldComponents";
import CustomButton from "../../components/CustomButton";
import BuyerPathBreadCrumb from "../../components/BuyerPath";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSideBar from "../../components/AdminSidebar";
import { adminCreateCategory, adminEditCategory } from "../../api";
import toast from 'react-hot-toast';
import { toastError, toastSuccess } from "../../utils/constants";
import { useNavigate, useLocation } from "react-router-dom";

const AdminAddCategories = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);
    const navigate = useNavigate();
    let location = useLocation();
    const data = location.state;
    
    
    const [categoryData, setCategoryData] = useState({
        category: data?.name || '',
        subCategory: data?.subCategory || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData({ ...categoryData, [name]: value });
    }

    const createCategory = async (data) => {
        app.startLoader();
        await adminCreateCategory({
            name:categoryData.category
        }, { Authorization: `Bearer ${auth.user.token}` }).then(async response => {
            // if (!response.success) throw Error(response.message);
            toast('Category Created', toastSuccess);
            
            setCategoryData({
                category: '',
                subCategory: ''
            })
            setTimeout(() => {
                navigate(-1)
            }, 1000);
        }).catch(e => {
            console.log(e.message);
            if (e.message === 'jwt expired') {
                auth.logout();
            }
            console.log(e.message);
        }).finally(() => {
            app.stopLoader();
        });
    }

    const editCategory = async (oldData, newData) => {
        app.startLoader();
        try {
            if (oldData.name === newData.category) throw Error("No changes made");
            await adminEditCategory({
                'name':newData.category
            }, oldData.id, { Authorization: `Bearer ${auth.user.token}` }).then(async response => {
                // if (!response.success) throw Error(response.message);
                toast('Category Updated', toastSuccess);
                setCategoryData({
                    category: '',
                    subCategory: ''
                });
                setTimeout(() => {
                    navigate(-1);
                }, 1000);
            }).catch(e => {
                console.log(e.message);
                if (e.message === 'jwt expired') {
                    auth.logout();
                }
            }).finally(() => {
                app.stopLoader();
            });
            
        } catch (error) {
            toast(error.message, toastError);
        }
    }

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
                <div className="w-full min-h-[calc(100%-5rem)] mt-[2rem] lg:pt-[5rem] lg:px-5 macScreens:px-[2rem] lg:pb-5 macScreens:pb-[5rem] flex flex-col gap-5 macScreens:gap-10">
                    <BuyerPathBreadCrumb home="Category" shop={!!data ? ">  Edit Category" : ">  Add New Category"}/>
                    <div className="flex flex-col gap-5 px-2 windowScreen:px-5">
                        <h1 className="font-semibold text-[#110D06] lg:text-xl macScreens:text-xl">{!!data ? "Edit Category" : "Add New Category"}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full border rounded-[10px] px-7 py-12">
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Category Name" name="category" defaultValue={data?.name || ""} placeholder="Enter the category name..." type="text" required onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Sub Category Name (Optional)" name="subCategory" placeholder="Enter the sub category name..." type="text" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="flex flex-col gap-y-10 w-full col-span-2">
                                <div className="input-box justify-end flex gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem] w-full">
                                    <CustomButton buttonText="Cancel" btnClassName="bg-transparent font-semibold text-[#000] text-sm windowScreen:text-lg rounded-[5px]" onClick={() => navigate(-1)} />
                                    <CustomButton buttonText={!!data ? "Edit" : "Add"} btnClassName="bg-[#00753E] text-[#FBFBFB] text-sm windowScreen:text-lg rounded-[5px]" onClick={() => {
                                        if (!!data) {
                                            editCategory(data, categoryData);
                                        } else {
                                            createCategory(categoryData);
                                        }
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default AdminAddCategories;