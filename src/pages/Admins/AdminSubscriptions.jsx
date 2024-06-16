import { useEffect, useState } from "react";
import { appStore, authStore } from "../../store";
import LogoHome from "../../components/Logo";
import SidebarNavLink from "../../components/SidebarNavLink";
import HorizontalTabs from "../../components/HorizontalTabs";
import CustomButton from "../../components/CustomButton";
import SearchBar2 from "../../components/SearchBarComponent2";
import SellerImg1 from "../../assets/seller-img-1.png"
import SellerImg2 from "../../assets/seller-img-2.png"
import SellerImg3 from "../../assets/seller-img-3.png"
import { NavLink } from "react-router-dom";
import Pagination from "../../components/Pagination";
import SubscriptionDynamicTable from "../../components/SubscriptionDynamicTable";
import SubscriptionPricingCard from "../../components/SubscriptionPricingCard";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSideBar from "../../components/AdminSidebar";
import { getAllSubscription } from "../../api";

const AdminSubscriptions = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);


    const [sellerData, setSellerData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const totalPages = Math.ceil(sellerData.length / itemsPerPage);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sellerData.slice(indexOfFirstItem, indexOfLastItem);


    const fetchData = async () => {
        await getAllSubscription('?userId=32dc3d29-87e9-413e-b0d9-c204f1b4fad1&page=1&offset=10').then(async response => {
           
            setSellerData(response);
            // response.sellers && auth.setAdminSellers(response.sellers);
        }).catch(e => {
            console.log(e.message);
            
            // if (e.message === 'jwt expired') {
                auth.logout();
            // }
        }).finally(() => {
            app.stopLoader();
        });
    }


    
    const sellersData = [
        {
            imgSrc: SellerImg1,
            name: 'Jenny Wilson',
            Plan: '3 Months',
            Price: 'N 8,000',
            verified: true,
        },
        {
            imgSrc: SellerImg2,
            name: 'Esther Howard',
            Plan: '1 Months',
            Price: 'N 3,000',
            verified: true,
        },
        {
            imgSrc: SellerImg3,
            name: 'Darlene Robertson',
            Plan: '3 Months',
            Price: 'N 8,000',
            verified: false,
        },
        {
            imgSrc: SellerImg3,
            name: 'Darlene Robertson',
            Plan: '1 Months',
            Price: 'N 3,000',
            verified: true,
        },
        {
            imgSrc: SellerImg1,
            name: 'Jenny Wilson',
            Plan: '6 Months',
            Price: 'N 15,000',
            verified: false,
        },
        {
            imgSrc: SellerImg2,
            name: 'Esther Howard',
            Plan: '6 Months',
            Price: 'N 15,000',
            verified: true,
        },
        {
            imgSrc: SellerImg3,
            name: 'Darlene Robertson',
            Plan: '3 Months',
            Price: 'N 8,000',
            verified: true,
        },
        {
            imgSrc: SellerImg3,
            name: 'Darlene Robertson',
            Plan: '1 Months',
            Price: 'N 3,000',
            verified: true,
        },
        {
            imgSrc: SellerImg1,
            name: 'Jenny Wilson',
            Plan: '3 Months',
            Price: 'N 8,000',
            verified: true,
        },
        {
            imgSrc: SellerImg2,
            name: 'Esther Howard',
            Plan: '1 Months',
            Price: 'N 3,000',
            verified: true,
        },
        {
            imgSrc: SellerImg3,
            name: 'Darlene Robertson',
            Plan: '1 Months',
            Price: 'N 3,000',
            verified: true,
        },
        {
            imgSrc: SellerImg3,
            name: 'Darlene Robertson',
            Plan: '3 Months',
            Price: 'N 8,000',
            verified: false,
        },
    ];

    const pricingData = [
        {
          duration: "1 Month",
          price: "₦3,000",
          description: "Informational or Small Business Website (8-16 pages)"
        },
        {
            duration: "3 Month",
            price: "₦8,000",
            description: "Informational or Small Business Website (8-16 pages)"
        },
        {
            duration: "6 Month",
            price: "₦15,000",
            description: "Informational or Small Business Website (8-16 pages)"
        },
      ];

      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const tabs = [
        { 
            title: 'Subscribers List', 
            content: 
            <div className="h-full w-full flex flex-col gap-2 border-t-[3px] border-transparent pt-[2rem] lg:px-5 xl:px-10">
                <div className="flex gap-10">
                    <div className="w-[50%]">
                        <SearchBar2 searchIcon={<i className='bx bx-search text-[1.2rem]'></i>} searchIconClassName="top-0 bottom-0 absolute md:left-0 right-4 w-[10%] flex justify-center items-center" inputClassName="bg-transparent border-[1px] border-[#C8C8C8] w-full h-full py-3 outline-none px-5 ps-10 rounded-[5px] text-[#B0B0B0]" placeholder="Search"  />
                    </div>
                </div>
                <div className="col-span-2">
                    <SubscriptionDynamicTable 
                    showCheckbox={true}
                    tableIcon2={
                        <NavLink
                        to="/admin/seller-profile"
                        className="text-primary dark:text-primary-400"
                        data-twe-toggle="tooltip"
                        title="View seller"
                        ><span className="material-symbols-outlined lg:text-[1.2rem] windowScreen:text-[1.8rem] text-[#161616] cursor-pointer border-[1px] border-[#E8E8E8] py-1 px-1 rounded-[5px]">visibility</span>
                        </NavLink>
                    }
                    data={sellerData} 
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
        },
        { 
            title: 'Subscription Plan', 
            content: 
            <div className="h-full w-full flex flex-col gap-10 border-t-[3px] border-transparent py-[2rem] xl:py-0 lg:px-5 xl:px-10">
                <div className="flex justify-end h-12">
                    <CustomButton icon={<i class='bx bx-plus'></i>} buttonText="Create Subscription Plan" btnClassName="bg-[#00753E] flex items-center text-[#FBFBFB] rounded-[5px]"/>
                </div>
                <div className="macScreens:w-[90%] lg:w-full grid grid-cols-2 xl:grid-cols-3 lg:gap-x-5 macScreens:gap-x-10 macScreens:gap-y-10 lg:gap-y-5">
                    {currentItems.map((pricing, index) => (
                        <SubscriptionPricingCard
                        key={index}
                        duration={pricing.duration}
                        price={pricing.price}
                        description={pricing.description}
                        />
                    ))}
                </div>
            </div>
        },
    ];
    

    useEffect(() => {
        app.startLoader();
        fetchData();
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
                <div className="w-full min-h-[calc(100%-5rem)] mt-[2rem] lg:pt-[5rem] lg:px-0 macScreens:px-[2rem] lg:pb-0 macScreens:pb-[0rem] flex flex-col gap-10">
                    <div className="flex flex-col gap-5 px-5">
                        <h1 className="font-semibold text-[#110D06] lg:text-xl macScreens:text-xl">Settings</h1>
                        <HorizontalTabs tabs={tabs} tabClassName="z-0 lg:ps-5 xl:ps-10" tabStyles="flex justify-start items-start" />
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default AdminSubscriptions;