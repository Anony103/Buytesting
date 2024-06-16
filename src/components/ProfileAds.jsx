import TrendingAdsComponents from '../components/TrendingAdsComponents'
import Pagination from './Pagination';
import { useEffect, useState } from 'react';


const ProfileAds = ({HeaderText, HeaderTextclassName, data}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const totalPages = Math.ceil(data.length / itemsPerPage);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const trendingAdsData = currentItems.map((item) => {
        return {
            image: item.picture[0],
            title: item.name,
            location: "Lagos, Ikeja",
            price: item.basePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            productLink: `/product-description/${item.id}`,
        };
    });

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    return ( 
        <section className="bg-[#FFF] w-full flex flex-col justify-center items-center">
            <div className="flex justify-start w-full my-10">
                <h1 className={`${HeaderTextclassName}`}>{HeaderText}</h1>
            </div>
            <div className="lg:w-full md:w-[90%] w-[95%] pb-10 lg:pb-[5rem] flex flex-col justify-center items-center">
                <TrendingAdsComponents
                gridCon="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 macScreens:grid-cols-5 grid-cols-2 gap-x-2 lg:gap-x-5 gap-y-7 pt-0"
                adsContainer="w-full pb-5 md:pb-[0rem]"
                adsDescription="flex flex-col justify-center items-start gap-5 h-[50%] md:h-[35%] pb-7 md:py-7 md:px-5 px-2"
                bookmarkContainer="hidden" 
                imgStyles="h-[40%] md:h-[60%]" 
                titleStyles="text-black font-semibold font-Nunito text-[.7rem] md:text-[.7rem]"
                productCard="h-[22rem] md:h-[17rem] overflow-hidden shadow-md"
                itemPrice="font-Poppins font-semibold text-[#00753E] text-[1rem] md:text-[.8rem] pb-7 md:pb-0"
                trendsAdsCustomProp={trendingAdsData} 
                />
            </div>
            <div className="max:w-full pb-10 md:pb-[0rem] mt-[-2rem] md:mt-[-5rem] md:ml-auto flex justify-center md:justify-end items-center pe-5 md:pe-0">
            <Pagination 
                    activePage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                />
            </div>
        </section>
     );
}
 
export default ProfileAds;