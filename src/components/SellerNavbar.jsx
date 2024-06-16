import LogoHome from "./Logo";
import SearchBar from "./SearchbarComponent"
import NavbarSubsection from "./NavbarSubsection";
import SellerProfileHeader from "./SellerProfileHeader";

const SellerNavbar = () => {
    return ( 
        <nav className="navbar flex flex-col gap-3 md:gap-0 justify-center items-center pb-2 pt-5 shadow-md w-full">
            <div className="flex justify-between items-center w-[90%] macScreens:w-[90%]">
                <LogoHome LogoClassName="w-[90px]" />
                <div className="hidden md:block lg:w-[40%] md:w-[40%] w-[70%]">
                    <SearchBar />
                </div>
                <div className="w-[60%] small-mobile:w-[45%] md:w-[30%] lg:w-[30%] xl:w-[25%]">
                    <SellerProfileHeader />
                </div>
            </div>
            <NavbarSubsection />
    </nav>
     );
}
 
export default SellerNavbar;