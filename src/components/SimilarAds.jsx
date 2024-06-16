
import TrendingAdsComponents from '../components/TrendingAdsComponents'

const SimilarAds = ({HeaderText, showComponent, showClearButton, className }) => {

    const trendingAdsData = [
        {
            image: `${process.env.PUBLIC_URL}/img/trending-img-1.png`,
            bookmark: `${process.env.PUBLIC_URL}/img/bookmark.png`,
            title: 'Laptop HP ProBook 640 G2\n8GBIntelnCore I5 HDD\n500GB',
            price: '200,048',
            productLink: '/product-description'
        },
        {
            image: `${process.env.PUBLIC_URL}/img/trending-img-2.png`,
            bookmark: `${process.env.PUBLIC_URL}/img/bookmark.png`,
            title: 'Laptop HP ProBook 640 G2\n8GBIntelnCore I5 HDD\n500GB',
            price: '200,048',
            productLink: '/product-description'
        },
        {
            image: `${process.env.PUBLIC_URL}/img/trending-img-3.png`,
            bookmark: `${process.env.PUBLIC_URL}/img/bookmark.png`,
            title: 'Laptop HP ProBook 640 G2\n8GBIntelnCore I5 HDD\n500GB',
            price: '200,048',
            productLink: '/product-description'
        },
        {
            image: `${process.env.PUBLIC_URL}/img/trending-img-4.png`,
            bookmark: `${process.env.PUBLIC_URL}/img/bookmark.png`,
            title: 'Laptop HP ProBook 640 G2\n8GBIntelnCore I5 HDD\n500GB',
            price: '200,048',
            productLink: '/product-description'
        },
        {
            image: `${process.env.PUBLIC_URL}/img/trending-img-5.png`,
            bookmark: `${process.env.PUBLIC_URL}/img/bookmark.png`,
            title: 'Laptop HP ProBook 640 G2\n8GBIntelnCore I5 HDD\n500GB',
            price: '200,048',
            productLink: '/product-description'
        },
      ];



    return ( 
        <section className="bg-[#FFF] w-full flex flex-col justify-center items-center">
            <div className="md:w-[90%] w-[95%] pb-10 lg:pb-[5rem] flex flex-col justify-center items-center">
                <div className="w-full flex-col justify-center">
                    <div className={`w-full flex justify-between items-center py-5 border-b-2 ${className}`}>
                        <h1 className="text-black font-Poppins font-semibold text-[.8rem] md:text-[1.5rem]">{HeaderText}</h1>
                        {showComponent && (
                            <div className="flex gap-2 items-center  similarAd-grid-lists">
                                <i className='bx bx-list-ul text-[1.5rem]'></i>
                                <i className='bx bx-grid-alt text-[1.5rem] active-grid-list'></i>
                            </div>
                        )}
                    </div>
                    {showClearButton && (
                        <div className="flex justify-end mt-5">
                            <button className='font-medium text-[#00753E]'>Clear All</button>
                        </div>
                    )}
                </div>
                <TrendingAdsComponents 
                gridCon="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 macScreens:grid-cols-5 grid-cols-2 gap-x-2 gap-y-7 pt-7"
                adsContainer="w-full pb-5 md:pb-[5rem]"
                adsDescription="flex flex-col justify-center items-start gap-5 h-[50%] md:h-[35%] pb-7 md:py-7 md:px-5 px-2"
                titleStyles="text-black font-semibold font-Nunito text-[.7rem] md:text-[1.1rem]"
                imgStyles="h-[60%] md:h-[65%]"
                itemLocation="text-[#848484] font-light text-[.5rem] md:text-[.8rem]"
                productCard="h-[22rem] md:h-[35rem] overflow-hidden shadow-md"
                itemPrice="font-Poppins font-semibold text-[#00753E] text-[1rem] md:text-[1.2rem] pb-7 md:pb-0"
                trendsAdsCustomProp={trendingAdsData} 
                />
            </div>
        </section>
     );
}
 
export default SimilarAds;







