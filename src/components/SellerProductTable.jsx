import axios from "axios";
import CustomButton from "./CustomButton";
import { appStore, authStore } from "../store";
import api from "../api/server";
import { useNavigate } from "react-router-dom";


const ProductTable = ({ productData }) => {
  const navigate = useNavigate();
  const product = productData.product;
  const specifications = productData.specifications;
  const auth = authStore(state => state);
  const app = appStore(state => state);
  const handleDelete=async()=>{
    app.startLoader();

    try {
      const response = await api.delete(`/product/${product.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user.token}`
          // Add any other headers, such as Authorization if needed
        },
      });

      navigate(-1);
      // if (response.status === 204) {
      //   console.log('Product deleted successfully');
      // }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
    app.stopLoader();
  }
  return (
    <table className="w-full bg-[#FBFBFB] rounded-[10px]">
      <thead>
        <tr>
          <th colSpan={3} className="p-10 text-start">
            {product.productMedia ? (
              <img
                src={product.productMedia}
                alt=""
                className="w-[150px] h-[170px] rounded-[10px] object-cover border-b-[3px] border-b-[#E8E8E8]"
              />
            ) : null}
          </th>
        </tr>
      </thead>
      <tbody>
        {specifications.map((row, index) => (
          <tr key={index} className="border-b-2 border-t-2 border-b-[#E8E8E8]">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="p-10 py-5 text-start text-[#161616] text-[1.2rem]">
                <p className="text-[#848484] lg:text-[1rem]">{cell.label}</p>
                <p className="text-[#161616] lg:text-[1rem]">{cell.value}</p>
              </td>
            ))}
            {row.length < 3 &&
              Array(3 - row.length)
                .fill(null)
                .map((_, emptyIndex) => (
                  <td key={`empty-${emptyIndex}`} className="p-10 py-5"></td>
                ))}
          </tr>
        ))}
        <tr className="border-b-2 border-b-[#E8E8E8]">
          <td colSpan={3} className="p-10 py-5 text-start text-[#161616] text-[1.2rem]">
            <p className="text-[#848484] lg:text-[1rem]">PRICE</p>
            <p className="text-[#00753E] lg:text-[1rem]">{`₦${product.basePrice.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ','
            )}`}</p>
          </td>
        </tr>
        <tr className="border-b-2 border-b-[#E8E8E8]">
          <td colSpan={3} className="p-10 py-5 text-start text-[#161616] text-[1.2rem]">
            <div className="text-[#848484] lg:text-[1rem]">Short Description</div>
            <div>{product.description}</div>
          </td>
        </tr>
        <tr className="border-b-2 border-b-[#E8E8E8]">
          <td colSpan={3} className="p-10 py-5 text-start text-[#161616] text-[1.2rem]">
            <div className="text-[#848484] lg:text-[1rem]">Long Description</div>
            <div>{product.description}</div>
          </td>
        </tr>
        <tr className="">
            <td colSpan={3} className="p-10 text-end text-[#161616] text-[1.2rem]">
                <div className="w-full flex justify-end gap-5">
                    <CustomButton buttonText="Delete Product" btnClassName="bg-transparent text-[#D60606] border border-[#D60606] hover:bg-transparent rounded-[5px] h-[3.5rem]" onClick={ handleDelete}/>
                    <CustomButton buttonText="Edit Product" btnClassName="bg-[#00753E] text-[#FBFBFB] rounded-[5px] h-[3.5rem]" onClick={() => {}}/>
                </div>
            </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProductTable;
