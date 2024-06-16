import { useEffect, useState } from "react";
import { appStore, authStore } from "../store";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BuyerPathBreadCrumb from "../components/BuyerPath";
import CategoriesAd from "../components/CategoriesAd";
import { getCategories } from "../api";

const Categories = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const auth = authStore(state => state);
    const app = appStore(state => state);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchCategoriesData();
    }, [id]);

    const fetchCategoriesData = async () => {
        app.startLoader();
        try {
            const response = await getCategories(id);
            setCategories(response);
            auth.setCategories(response);
        } catch (e) {
            console.log(e.message);
        } finally {
            app.stopLoader();
        }
    };

    return ( 
        <section className="overflow-x-hidden w-full flex flex-col items-center macScreens:gap-5 lg:gap-3 gap-2">
            <Navbar token={!!auth.user?.token} role={auth.role}/>
            <div className="relative md:w-[90%] w-[95%] flex flex-col justify-center items-center gap-10 mt-[10rem] md:mt-[7rem]">
                <BuyerPathBreadCrumb home="Home" shop={`> ${categories.length ? categories[0].categories[0].name : "Loading..."}`}/>
            </div>
                <CategoriesAd HeaderText="My Categories" data={categories} showComponent={true} />
            <Footer />
            {/* <Modal modalHandler={modal} /> */}
        </section>
    );
}

export default Categories;
