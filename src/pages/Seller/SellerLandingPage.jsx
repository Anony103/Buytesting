import Footer from "../../components/Footer";
import SellerNavbar from "../../components/SellerNavbar";
import ShopSmart from "../../components/ShopSmartSection";
import TrendingAds from "../../components/TrendingAdsSection";
import UniqueLifeSection from "../../components/UniqueLifeSection";

const SellerLandingPage = () => {
    return ( 
        <section className="overflow-x-hidden w-full">
            <SellerNavbar />
            <ShopSmart />
            <UniqueLifeSection />
            <TrendingAds />
            <Footer />
        </section>
     );
}
 
export default SellerLandingPage;