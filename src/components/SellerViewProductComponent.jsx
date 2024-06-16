import SearchBar from "./SearchbarComponent";
import ProductTable from "./SellerProductTable";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";




const SellerViewProductComponent = () => {

    const productData = [
        [
          { label: 'TYPE', value: 'Laptop' },
          { label: 'BRAND', value: 'HP' },
          { label: 'CATEGORY', value: 'Electronics' },
        ],
        [
          { label: 'MODEL', value: 'EliteBook x360 1030 G2' },
          { label: 'CONDITION', value: 'Used' },
          { label: 'SUBTYPE', value: 'Convertible Laptops' },
        ],
        [
          { label: 'RAM', value: '16GB' },
          { label: 'PROCESSOR', value: 'Intel Core i7' },
          { label: 'NUMBER OF CORES', value: 'Dual Core' },
        ],
        [
          { label: 'STORAGE TYPE', value: 'SSD' },
          { label: 'STORAGE CAPACITY', value: '512GB' },
          { label: 'GRAPHICS CARD', value: 'Intel' },
        ],
        [
          { label: 'DISPLAY SIZE', value: '13" / 13.3"' },
          { label: 'OPERATING SYSTEM', value: 'Windows 10' },
          { label: 'Color', value: 'Silver' },
        ],
        [
          { label: 'PRICE', value: '₦200,048' },
          { label: 'NUMBER OF BOOKMARKS', value: '240' },
        ],
      ];

    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1); // Navigate back one step
    };
    return ( 
        <div className="flex flex-col gap-4 h-full">
            <div className="flex gap-2 items-center">
                <i class='bx bx-arrow-back text-[2rem]' onClick={goBack}></i>
                <h1 className="font-semibold text-[1.5rem] text-[#000]">View Product</h1>
            </div>
            <div className="flex justify-center w-full h-full">
                <div className="w-full flex flex-col gap-5">
                    <div className="pb-7">
                        <ProductTable productData={productData} media={null} />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default SellerViewProductComponent;