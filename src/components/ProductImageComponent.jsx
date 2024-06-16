import { useState } from "react";

const ProductImgComp = ({ mainImageSrc, thumbnailImages }) => {
  const [index, setIndex] = useState(0);

  const handleClick = (index) => {
    setIndex(index);
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
      <div className="larger w-full h-[85%]">
        <img
          className="w-full h-full object-cover object-center"
          src={thumbnailImages[index]}
          alt=""
        />
      </div>
      <div className="smaller w-full grid grid-cols-4 gap-x-1 md:grid-cols-4 md:gap-x-[2rem] h-[15%]">
        {thumbnailImages.map((pic, idx) => (
          <div key={idx} className="w-full h-full">
            <img
              className="w-full h-full object-cover"
              src={pic}
              alt=""
              onClick={() => handleClick(idx)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImgComp;
