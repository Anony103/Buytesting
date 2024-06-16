import { useEffect } from "react";
import { authStore } from "../../store";
import Footer from "../../components/Footer";
import BuyerPathBreadCrumb from "../../components/BuyerPath";
import SellerNavbar from "../../components/SellerNavbar";
import VerticalTabs from "./VerticalTabs";
import ProductEmptyComponent from "../../components/ProductEmptyComponent";


const SellerMyShop = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);
    const auth = authStore(state => state);
    return ( 
        <section className="overflow-x-hidden w-full flex flex-col items-center macScreens:gap-5 lg:gap-3 gap-2">
            <SellerNavbar token={!!auth.user?.token} />
            <div className="relative md:w-[90%] w-[95%] flex flex-col justify-center items-center gap-10">
                <BuyerPathBreadCrumb home="Home" shop=">  Products"/>
            </div>
            <VerticalTabs contentComponent={<ProductEmptyComponent />} />
            <Footer />
        </section>
     );
}
 
export default SellerMyShop;