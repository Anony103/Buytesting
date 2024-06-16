import { useEffect } from "react";
import { appStore, authStore } from "../../store";
import Footer from "../../components/Footer";
import BuyerPathBreadCrumb from "../../components/BuyerPath";
import Navbar from "../../components/Navbar";
import VerticalTabs from "./VerticalTabs";
import SellerViewProductComponent from "../../components/SellerViewProductComponent";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { toastError } from "../../utils/constants";
import ProductTable from "../../components/SellerProductTable";
import { groupIntoChunks } from "../../utils/helpers";

const SellerViewProducts = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const auth = authStore(state => state);
    const app = appStore(state => state);


    if (!id) {
        navigate(-1);
        toast.error("Product not found", toastError);
    }

    const productId = id;
    const business = auth.user;
    const product = auth.sellerData.products.find(product => product.id === productId);

    if (product == undefined) {
        navigate(-1);
    }
    
    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            app.stopLoader();
        }, 3000);
    },[auth.user]);


    const productSpecData = product.specifications.map(spec => ({ label: spec.name, value: spec.value }));

    const priceData = { label: 'PRICE', value: `₦${product.basePrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` };
    
    const groupedData = groupIntoChunks(productSpecData, 3);

    return ( 
        <section className="overflow-x-hidden w-full flex flex-col items-center macScreens:gap-5 lg:gap-3 gap-2">
             <Navbar token={!!auth.user?.token} role={auth.role} />
            <div className="relative md:w-[90%] w-[95%] flex flex-col justify-center items-center gap-10">
                <BuyerPathBreadCrumb home="Home" shop1="> Products" shop=">  View Products"/>
            </div>
            {/* <VerticalTabs contentComponent={<SellerViewProductComponent />} /> */}
            <VerticalTabs contentComponent={
                <div className="flex flex-col gap-4 h-full">
                    <div className="flex gap-2 items-center">
                        <i class='bx bx-arrow-back text-[2rem]' onClick={() => navigate(-1)}></i>
                        <h1 className="font-semibold text-[1.5rem] text-[#000]">View Product</h1>
                    </div>
                    <div className="flex justify-center w-full h-full">
                        <div className="w-full flex flex-col gap-5">
                            <div className="pb-7">
                                <ProductTable productData={{specifications: groupedData,product: product}}/>
                            </div>
                        </div>
                    </div>
                </div>
            } />
            <Footer />
        </section>
     );
}
 
export default SellerViewProducts;