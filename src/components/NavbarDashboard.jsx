import DashboardProfileHeader from "./DashboardProfileHeader";
import ProfileImg1 from '../assets/profile-img-1.png'

const NavbarDashboard = ({navbarClassName}) => {
    return ( 
        <nav className={`navbar flex flex-col gap-3 md:gap-0 justify-center items-center pb-2 pt-5 shadow-md bg-white fixed top-0 z-30 w-[calc(100%-280px)] h-[5rem] ${navbarClassName}`}>
            <div className="macScreens:w-full lg:w-full">
                <DashboardProfileHeader AcctImg={ProfileImg1} AcctType="Agent" AcctName="Davies Grant" HeaderClass="w-full md:h-[4rem] pe-[5rem] flex justify-end items-center gap-3 lg:gap-7" />
            </div>
        </nav>
     );
}
 
export default NavbarDashboard;