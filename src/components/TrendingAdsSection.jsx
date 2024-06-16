import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import TrendingAdsComponents from '../components/TrendingAdsComponents';

const TrendingAds = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const totalPages = Math.ceil(data.length / itemsPerPage);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const productData = currentItems.map((item) => {
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
            <div className="md:w-[90%] w-[95%] flex flex-col justify-center items-center">
                <div className="w-full flex justify-start items-center py-5 border-b-2">
                    <h1 className="text-black font-Poppins font-semibold text-[1rem] md:text-[1.5rem]">Trending Ads</h1>
                </div>
                <TrendingAdsComponents 
                    gridCon="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-5 macScreens:grid-cols-5 grid-cols-2 gap-x-2 gap-y-7 pt-7"
                    adsContainer="w-full pb-5 md:pb-[5rem]"
                    adsDescription="flex flex-col justify-center items-start gap-5 h-[50%] md:h-[35%] pb-7 md:py-7 md:px-5 px-2"
                    titleStyles="text-black font-semibold font-Nunito text-[.7rem] md:text-[1.1rem]"
                    imgStyles="h-[60%] md:h-[65%]"
                    bookmarkStyles=""
                    bookmarkContainer=""
                    itemLocation="text-[#848484] font-light text-[.5rem] md:text-[.8rem]"
                    productCard="h-[22rem] md:h-[35rem] overflow-hidden shadow-md"
                    itemPrice="font-Poppins font-semibold text-[#00753E] text-[1rem] md:text-[1.2rem] pb-7 md:pb-0"
                    trendsAdsCustomProp={productData} 
                />
            </div>
            <div className="max:w-full pb-10 md:pb-[3rem] mt-[-2rem] md:mt-[-5rem] md:ml-auto flex justify-center md:justify-end items-center pe-5 md:pe-20">
                <Pagination 
                    activePage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                />
            </div>
        </section>
    );
}

export default TrendingAds;
