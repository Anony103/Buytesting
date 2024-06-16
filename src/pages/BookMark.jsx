import { useEffect } from "react";
import { authStore } from "../store";
// import { appStore, authStore } from "../store";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BuyerPathBreadCrumb from "../components/BuyerPath";
import BookmarkAds from "../components/BookmarkAds";
// import Modal from '../components/ModalComponent';

const BookMark = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);
    const auth = authStore(state => state);
    // const modal = appStore(state => state);
    return ( 
        <section className="overflow-x-hidden w-full flex flex-col items-center macScreens:gap-5 lg:gap-3 gap-2">
            <Navbar token={!!auth.user?.token} />
            <div className="relative md:w-[90%] w-[95%] flex flex-col justify-center items-center gap-10 mt-[10rem] md:mt-[7rem]">
                <BuyerPathBreadCrumb home="Home" shop="> Bookmarks"/>
            </div>
            <BookmarkAds HeaderText="My Bookmarks" showComponent={true} />
            <Footer />
            {/* <Modal modalHandler={modal} /> */}
        </section>
     );
}
 
export default BookMark;