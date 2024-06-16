import { useEffect, useState } from "react";
import LogoHome from "./Logo";
import SearchBar from "./SearchbarComponent";
import NavbarSubsection from "./NavbarSubsection";
import ProfileHeader from "./ProfileHeader";
import AuthButtonComponent from "./AuthButtonComponent";
import { USER_TYPES } from "../utils/constants";
import SellerProfileHeader from "./SellerProfileHeader";
import AdminNavbar from "./AdminNavbar";
import DashboardProfileHeader from "./DashboardProfileHeader";
import { appStore, authStore } from "../store";
import ProfileImg1 from '../assets/dp.jpeg';
import { getAllProducts } from "../api";

const RoleHeader = ({ token, role }) => {
    const auth = authStore(state => state);

    const adminFullname = `${auth.user?.firstname} ${auth.user?.lastname}`;
    const adminDP = auth.user?.profileImage || ProfileImg1;

    return (
        <div className="">
            {
                token && role === USER_TYPES.BUYER && <ProfileHeader />
            }
            {
                token && role === USER_TYPES.SELLER && <SellerProfileHeader />
            }
            {
                token && role === USER_TYPES.ADMIN && <DashboardProfileHeader AcctImg={adminDP} AcctType="Admin" AcctName={adminFullname || "Davies Grant"} HeaderClass="w-full md:h-[4rem] pe-[5rem] flex justify-end items-center gap-3 lg:gap-7" />
            }
            {
                !token && <AuthButtonComponent />
            }
        </div>
    );
};

const Navbar = ({ token, role }) => {
    const [products, setProducts] = useState([]);
    const app = appStore(state => state);
    const auth = authStore(state => state);

    const fetchProductData = async () => {
        app.startLoader();
        try {
            const response = await getAllProducts();
            setProducts(response);
            auth.setProducts(response);
        } catch (e) {
            console.log(e.message);
        } finally {
            app.stopLoader();
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    return (
        <nav className="navbar flex flex-col gap-3 md:gap-0 justify-center items-center pb-2 pt-5 shadow-md bg-white fixed top-0 z-10 w-full">
            <div className="flex justify-between items-center w-[90%] macScreens:w-[90%]">
                <LogoHome LogoClassName="lg:w-[50%] md:w-[40%] w-[20%]" />
                <div className="hidden md:block lg:w-[40%] md:w-[60%] w-[70%]">
                    <SearchBar />
                </div>
                <RoleHeader token={token} role={role} />
            </div>
            <NavbarSubsection />
        </nav>
    );
};

export default Navbar;
