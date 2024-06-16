
import ImgCarousel from "./ImgCarousel";
import ShopSmartList from "./ShopSmartListComponent";

const ShopSmart = () => {
    return ( 
        <section className="md:grid md:grid-cols-7 md:items-center">
            <div className="xl:col-span-1 md:col-span-2 hidden md:block">
                <ShopSmartList />
            </div>
            <div className="xl:col-span-6 md:col-span-5 xl:h-[27rem] lg:h-[20rem] md:h-[15rem] h-[8rem] small-mobile:h-[10rem] large-mobile:h-[13rem] flex justify-center items-center">
                <div className="lg:h-[90%] h-[90%] w-full md:w-[95%] xl:w-[90%] rounded-[5px] mt-5 md:mt-0">
                    <ImgCarousel />
                </div>
            </div>
        </section>
     );
}
 
export default ShopSmart;