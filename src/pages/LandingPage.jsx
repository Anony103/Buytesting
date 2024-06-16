import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ShopSmart from "../components/ShopSmartSection";
import TrendingAds from "../components/TrendingAdsSection";
import UniqueLifeSection from "../components/UniqueLifeSection";
import { appStore, authStore } from "../store";
import { adminGetAllCategory as getAllCategories, getAllProducts } from "../api";

const LandingPage = () => {
    const [products, setProducts] = useState([]);
    const auth = authStore(state => state);
    const app = appStore(state => state);

    const fetchCategoryData = async () => {
        app.startLoader();
        await getAllCategories(null).then(async response => {
            const categories = [];
            console.log(response);
            response?.map(category => {
                categories.push({
                    id: category.id,
                    name: category.name,
                    subCategory: category.subCategory || null,
                    status: category.status || true,
                });
            });
            auth.setCategories(categories);
        }).catch(e => {
            console.log(e.message);
        }).finally(() => {
            app.stopLoader();
        });
    };

    const fetchProductData = async () => {
        app.startLoader();
        try {
            const response = await getAllProducts();
            setProducts(response);
            auth.setProducts(response);
        } catch (e) {
            console.log(e.message);
        } finally {
            app.stopLoader();
        }
    };

    useEffect(() => {
        app.startLoader();
        fetchCategoryData();
        fetchProductData();
        setTimeout(() => {
            app.stopLoader();
        }, 3000);
    }, [auth.user]);

    console.log(products);

    return (
        <section className="overflow-x-hidden w-full relative">
            <Navbar token={!!auth.user?.token} role={auth.role} />
            <div className="relative mt-[8.5rem] md:mt-[6.5rem] w-full">
                <ShopSmart />
                <UniqueLifeSection />
                <TrendingAds data={products} />
                <Footer />
            </div>
        </section>
    );
};

export default LandingPage;
