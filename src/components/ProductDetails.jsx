

const ProductInfoCard = ({ label, value }) => {
  return (
    <li className="flex flex-col">
      <p className="font-Nunito text-[#6C8EA0] text-[.7rem] md:text-[.8rem]">{label}</p>
      <p className="font-[#000] text-[.7rem] md:text-[1rem]">{value}</p>
    </li>
  );
};

const ProductDetails = ({ productDetails }) => {
  return (
    <ul className="flex flex-col gap-5 w-full">
      {productDetails.map((info, index) => (
        <ProductInfoCard key={index} label={info.label} value={info.value} />
      ))}
    </ul>
  );
};

export default ProductDetails;
