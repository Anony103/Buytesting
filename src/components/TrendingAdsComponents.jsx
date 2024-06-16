import { NavLink } from "react-router-dom";
import bookMarkImg from "../assets/carousel-img/bookmark.png";

const TrendingAdsComponents = ({
    trendsAdsCustomProp,
    adsContainer,
    adsDescription,
    gridCon,
    imgStyles,
    bookmarkStyles,
    bookmarkContainer,
    titleStyles,
    itemLocation,
    productCard,
    itemPrice
}) => {
    return (
        <div className={`${adsContainer}`}>
            <div className={`${gridCon}`}>
                {trendsAdsCustomProp.map((item, index) => (
                    <div key={index} className={`${productCard}`}>
                        <NavLink to={`${item.productLink}`}>
                            <div
                                className={`bg-no-repeat object-cover bg-center bg-cover bg-inherit transition-transform hover:duration-700 hover:transform hover:scale-[1.05] relative ${imgStyles}`}
                                style={{ backgroundImage: `url(${item.image})` }}>
                                <div className={`absolute w-full h-full top-4 md:top-7 pe-5 flex justify-end items-end ${bookmarkContainer}`}>
                                    <div className="w-[20%] md:w-[17%] lg:w-[20%] h-[13%] md:h-[14%] bg-white rounded-[100%] flex justify-center items-center shadow-md">
                                        <button className={`w-[40%] h-[40%] md:h-[50%] ${bookmarkStyles}`}>
                                            <img className='w-full h-full object-contain' src={bookMarkImg} alt="Bookmark" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                        <div className={`${adsDescription}`}>
                            <p className={`${itemLocation}`}>{item.location}</p>
                            <p className={`${titleStyles}`}>
                                {item.title}
                            </p>
                            <p className={`${itemPrice}`}>{`₦${item.price}`}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrendingAdsComponents;
