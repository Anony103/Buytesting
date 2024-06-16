import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import ProductEmpty from '../assets/product-illustration.png'
import { useEffect } from "react";
import { appStore, authStore } from "../store";
import { sellerGetAllProducts } from "../api";
import SearchBar from "./SearchbarComponent";
import MyProductsAds from "./MyProductsAds";

const ProductEmptyComponent = () => {
    const navigate = useNavigate();
    const auth = authStore(state => state);
    const app = appStore(state => state);

    const getProducts = async () => {
        await sellerGetAllProducts({ Authorization: `Bearer ${auth.user?.token}` ,
    
        params : {
            page: 1,
            offset: 10}
        
    }).then(async response => {
            // if (!response.success) throw Error(response.message);
            auth.setSellerProducts(response);
        }).catch(e => {
            console.log(e.message);
            if (e.message === 'jwt expired'){
                auth.logout();
            }
        }).finally(() => {
            app.stopLoader();
        });
    }
    

    useEffect(() => {
        app.startLoader();
        getProducts();
        setTimeout(() => {
            app.stopLoader();
        }, 3000);
    }, []);

    return ( 
        <div className="flex flex-col gap-4 h-full">
            <div className="border-b-2 ps-5 pb-2">
                <h1 className="font-semibold text-[1.5rem] text-[#000]">My Products</h1>
            </div>

            {
                appStore.loader ? (
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="w-full flex justify-center items-center gap-5">
                            <div className="w-[30%]">
                                Loading
                            </div>
                        </div>
                    </div>
                ) : (
                    auth.sellerData.products.length === 0 ? (
                        <div className="flex justify-center items-center w-full h-full">
                            <div className="w-full flex flex-col justify-center items-center gap-5">
                                <div className="w-full flex justify-center items-center">
                                    <div className="w-[30%]">
                                        <img className="w-full" src={ProductEmpty} alt="" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <h1 className="text-[2.5rem] font-semibold text-[#000]">Product Empty</h1>
                                    <div className="flex flex-col justify-center items-center gap-1 text-[#5C6375] text-[.8rem]">
                                        <p>You currently have no product to sell! Click on the</p>
                                        <p>button below to add a product.</p>
                                    </div>
                                </div>
                                <NavLink to="my-products" className="flex justify-center">
                                    <CustomButton icon={<i class='bx bx-plus'></i>} buttonText="Add Product" btnClassName="bg-[#00753E] text-[#FBFBFB] rounded-[5px]" onClick={() => {
                                        navigate('add-products')
                                    }} />
                                </NavLink>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center w-full h-full">
                            <div className="w-[93%] flex flex-col gap-5">
                                <div className="w-full flex justify-between py-3">
                                    <div className="lg:w-[40%] md:w-[40%] w-[70%]">
                                        <SearchBar />
                                    </div>
                                    <div className="flex justify-center">
                                        <CustomButton icon={<i class='bx bx-plus'></i>} buttonText="Add Product" btnClassName="bg-[#00753E] text-[#FBFBFB] rounded-[5px]" onClick={() => {
                                            navigate('add-products')
                                        }} />
                                    </div>
                                </div>
                                <div className="">
                                    <MyProductsAds data={auth.sellerData.products} className="border-b-0"/>
                                </div>
                            </div>
                        </div>
                    )
                )
            }
            
        </div>
     );
}
 
export default ProductEmptyComponent;