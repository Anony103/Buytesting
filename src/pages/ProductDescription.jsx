import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authStore } from "../store";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BuyerPathBreadCrumb from "../components/BuyerPath";
import ProductImgComp from "../components/ProductImageComponent";
import ProductCard from "../components/ProductCard";
import ProductCard2 from "../components/ProductCard2";
import StoreInfo from "../components/StoreInfo";
import SimilarAds from "../components/SimilarAds";
import Modal from "../components/Modal";
import BookMarkImg from "../assets/carousel-img/bookmark.png";
import { formatDate, formatDateToString, formatNumber, formatTimeAgo } from "../utils/helpers";
import InstagramIcon from "../assets/svg/instagram.svg";
import XIcon from "../assets/svg/X.svg";
import WhatsappIcon from "../assets/svg/WhatsApp.svg";
import FacebookIcon from "../assets/svg/facebook.svg";
import { getProductById } from "../api";

const ProductDescription = () => {
    const { id } = useParams();
    const auth = authStore(state => state);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const fetchedProduct = await getProductById(id);
                console.log(fetchedProduct);
                setProduct(fetchedProduct);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const business = auth.user;

    return (
        <section className="overflow-x-hidden w-full">
            <Navbar token={!!auth.user?.token} role={auth.role}/>
            <div className="md:w-[90%] w-[95%] flex flex-col justify-center items-center gap-10 mt-[8.5rem] md:mt-[6.5rem]">
                <BuyerPathBreadCrumb home="Home" shop="> my-shop > product > " />
                <div className="w-full grid grid-cols-1 lg:grid-cols-7 mb-6 px-2 md:px-10 gap-y-10 lg:gap-x-5 ">
                    <div className="col-span-3 min-h-[60vh]">
                        <ProductImgComp 
                        mainImageSrc={product.picture[0]} 
                        thumbnailImages={product.picture}
                        />
                    </div>
                    <div className="col-span-4 min-h-[60vh] flex justify-center">
                        <div className="flex flex-col justify-center md:gap-5">
                            <ProductCard 
                            bookmark={BookMarkImg} 
                            title={product.name} 
                            postedTime={formatTimeAgo(product.createdAt)} 
                            // location={business.city} 
                            price={formatNumber(product.basePrice)} 
                            />
                            <ProductCard2 />
                            <div className="border-b md:border-b-0 pt-3 md:pt-0 pb-0 md:pb-3 w-full flex justify-end">
                                <button className="font-Nunito text-[#00753E] md:text-[1rem] text-[.8rem] flex justify-center items-center gap-1">Hide Option<i className='bx bx-chevron-down text-[1rem] md:text-[2rem]'></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <StoreInfo 
                avatarImg={<img className="w-full" src={product.user.avatar} alt="" />}
                avatarSize="w-[30%] md:w-[50%]"
                title={product.user.businessName}
                verified={product.user.isVerified}
                repliesTime="Replies within 2 hours."
                SellerAddress={`${formatDateToString(product.user.createdAt)} on BuyMeNaija`}
                accountAge=""
                DateJoined="Date Joined:"
                DayMonth={formatDate(product.user.createdAt)}
                socialLinks={[
                    { url: "#", icon: <img src={InstagramIcon} alt="" /> },
                    { url: "#", icon: <img src={XIcon} alt="" /> },
                    { url: "#", icon: <img src={WhatsappIcon} alt="" /> },
                    { url: "#", icon: <img src={FacebookIcon} alt="" /> }
                ]}
                buttons={[
                    {
                        bgColor: "#00753E",
                        text: "Show Contact",
                        icon: <i className='bx bx-phone'></i>,
                        textColor: "#fff",
                        onClick: openModal // Open modal on click
                    },
                    {
                        bgColor: "#fff",
                        text: "Start chat",
                        icon: <i className='bx bx-comment-detail'></i>,
                        textColor: "#00753E",
                        borderColor: "#00753E"
                    },
                    {
                        bgColor: "#fff",
                        icon: <i className='bx bxs-flag-alt text-[#FF1717] text-[1.5rem]'></i>,
                        text: "Report Abuse",
                        textColor: "#00753E",
                        borderColor: ""
                    }
                ]}
                mainIcon={<i className='bx bx-comment-detail'></i>}
                mainIcon2={<i className='bx bx-user' ></i>}
                storeJoinedd={formatDateToString(product.user.createdAt)}
                sellerLinks={ `/seller-profile/${product.userId}`}
            />
            <SimilarAds HeaderText="Other of you products Ads" showComponent={false} showClearButton={false} />
            <Footer />

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p>Phone: {product.user.phone}</p>
                <p>Email: {product.user.email}</p>
                <button onClick={closeModal} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                    Close
                </button>
            </Modal>
        </section>
    );
}

export default ProductDescription;
