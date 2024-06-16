

// AnotherComponent.js
import React from 'react';
import ProductDetails from './ProductDetails';

const productDetailsArray = [
  { label: "CONDITION", value: "Used" },
  { label: "BRAND", value: "HP" },
  { label: "SUBTYPE", value: "Convertible Laptops" },
  { label: "PROCESSOR", value: "Intel Core i7" },
  { label: "STORAGE CAPACITY", value: "512GB" },
  { label: "DISPLAY SIZE", value: `13" / 13.3"` },
  { label: "OPERATING SYSTEM", value: "Windows" },
];
const productDetailsArray2 = [
  { label: "TYPE", value: "Laptop" },
  { label: "MODEL", value: "EliteBook x360 1030 G2" },
  { label: "RAM", value: "16GB" },
  { label: "NUMBER OF CORES", value: "Dual Core" },
  { label: "STORAGE TYPE", value: "SSD" },
  { label: "GRAPHICS CARD", value: "Intel" },
  { label: "COLOR", value: "Silver" },
];

const ProductCard2 = () => {
  return (
    <div className="grid grid-cols-2 gap-x-5">
      <ProductDetails productDetails={productDetailsArray} />
      <ProductDetails productDetails={productDetailsArray2} />
    </div>
  );
};

export default ProductCard2;
 
// export default ProductCard2;