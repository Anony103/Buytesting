import ProductImgComp from "./ProductImageComponent";
import ProductInfoComp from "./ProductInfoComp";


const ShopProduct = () => {

    const mainImageSrc = `${process.env.PUBLIC_URL}/img/trending-img-1.png`;
    const thumbnailImages = [
        `${process.env.PUBLIC_URL}/img/trending-img-1.png`,
        `${process.env.PUBLIC_URL}/img/trending-img-1.png`,
        `${process.env.PUBLIC_URL}/img/trending-img-1.png`,
        `${process.env.PUBLIC_URL}/img/trending-img-1.png`,
    ];



    return ( 
        <div className="w-full grid grid-cols-1 lg:grid-cols-7 gap-y-10 lg:gap-x-5">
            <div className="col-span-3 min-h-[60vh]">
                <ProductImgComp mainImageSrc={mainImageSrc} thumbnailImages={thumbnailImages} />
            </div>
            <div className="col-span-4 min-h-[60vh] flex justify-center">
                <ProductInfoComp />
            </div>
        </div>
     );
}
 
export default ShopProduct;