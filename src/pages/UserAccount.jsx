import { useEffect } from "react";
import { authStore } from "../store";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BuyerPathBreadCrumb from "../components/BuyerPath";
import AccountComponent from "../components/AccountComponent";
import { Navigate } from "react-router-dom";


const UserAccount = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);
    const auth = authStore(state => state);
    if (!!!auth.user?.token) {
        return <Navigate to='/auth/sign-in' />
    }

    
    return ( 
        <section className="overflow-x-hidden w-full flex flex-col items-center macScreens:gap-5 lg:gap-3 gap-2">
            <Navbar token={!!auth.user?.token} role={auth.role}/>
            <div className="relative md:w-[90%] w-[95%] flex flex-col justify-center items-center gap-10 mt-[10rem] md:mt-[7rem]">
                <BuyerPathBreadCrumb home="Home" shop="My Account"/>
            </div>
            <AccountComponent />
            <Footer />
        </section>
     );
}
 
export default UserAccount;