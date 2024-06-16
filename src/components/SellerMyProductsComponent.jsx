import MyProductsAds from "./MyProductsAds";
import SearchBar from "./SearchbarComponent";
import CustomButton from "./CustomButton";

const SellerMyProductsComponent = () => {
    return ( 
        <div className="flex flex-col gap-4 h-full">
            <div className="border-b-2 ps-10 pb-2">
                <h1 className="font-semibold text-[1.5rem] text-[#000]">My Products</h1>
            </div>
            <div className="flex justify-center w-full h-full">
                <div className="w-[93%] flex flex-col gap-5">
                    <div className="w-full flex justify-between py-3">
                        <div className="lg:w-[40%] md:w-[40%] w-[70%]">
                            <SearchBar />
                        </div>
                        <div className="flex justify-center">
                            <CustomButton icon={<i class='bx bx-plus'></i>} buttonText="Add Product" btnClassName="bg-[#00753E] text-[#FBFBFB] rounded-[5px]"/>
                        </div>
                    </div>
                    <div className="">
                        <MyProductsAds className="border-b-0" />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default SellerMyProductsComponent;