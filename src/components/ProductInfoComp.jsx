import ProductCard from "./ProductCard";
import ProductCard2 from "./ProductCard2";

const ProductInfoComp = () => {

    const item = {
    title: "Laptop HP EliteBook X360 1030 G2 16GB Intel Core I7 SSD 512GB",
    postedTime: "5 hours",
    location: "Lagos, Ikeja",
    price: "200,000",
    // bookmark: `${process.env.PUBLIC_URL}/img/bookmark.png`,
    };
    return ( 
        <div className="flex flex-col justify-center md:gap-5">
            <ProductCard item={item} />
            <ProductCard2 />
            <div className="border-b pt-3 md:pt-0 pb-0 md:pb-3 w-full flex justify-end">
                <button className="font-Nunito text-[#00753E] md:text-[1rem] text-[.8rem] flex justify-center items-center gap-1">Hide Option<i className='bx bx-chevron-down text-[1rem] md:text-[2rem]'></i></button>
            </div>
        </div>
     );
}
 
export default ProductInfoComp;