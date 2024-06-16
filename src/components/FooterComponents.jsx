import { NavLink } from "react-router-dom";

const FooterComponents = () => {
    return ( 
        <div className="w-[95%] md:w-[90%] lg:w-[75%] xl:w-[70%] grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-[5rem]">
            <div className="flex flex-col gap-5 px-5 md:px-0">
                <h1 className="text-white font-bold text-[1rem] md:text-[1.5rem]">Get In Touch</h1>
                <p className="font-Nunito text-white text-[.8rem] md:text-[.8rem] lg:text-[1rem]">Lorem ipsum dolor sit amet, <br/> consectetur adipiscing elit, <br/> adipiscing elit</p>
                <div className="flex items-center gap-3 text-white text-[1.5rem]">
                    <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500" to="#"><i className='bx bxl-facebook-circle' ></i></NavLink>
                    <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500" to="#"><i className='bx bxl-instagram' ></i></NavLink>
                    <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500" to="#"><i className='bx bxl-twitter' ></i></NavLink>
                </div>
            </div>
            <div className="hidden md:flex flex-col items-start gap-5 text-white">
                <h1 className="font-bold text-[1rem] md:text-[1.5rem]">Company info</h1>
                <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">About Us</NavLink>
                <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">Carrier</NavLink>
                <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">We are hiring</NavLink>
                <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">Blog</NavLink>
            </div>
            <div className="hidden md:flex flex-col items-start gap-5 text-white">
                <h1 className="font-bold text-[1rem] md:text-[1.5rem]">Features</h1>
                <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">Business Marketing</NavLink>
                <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">User Analytic</NavLink>
                <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">Live Chat</NavLink>
                <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">Unlimited Support</NavLink>
            </div>
            <div className="md:hidden grid grid-cols-2 px-5">
                <div className="flex flex-col items-start gap-2 md:gap-5 text-white">
                    <h1 className="font-bold text-[1rem] md:text-[1.5rem]">Company info</h1>
                    <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">About Us</NavLink>
                    <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">Carrier</NavLink>
                    <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">We are hiring</NavLink>
                    <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">Blog</NavLink>
                </div>
                <div className="flex flex-col items-start gap-2 md:gap-5 text-white">
                    <h1 className="font-bold text-[1rem] md:text-[1.5rem]">Features</h1>
                    <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">Business Marketing</NavLink>
                    <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">User Analytic</NavLink>
                    <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">Live Chat</NavLink>
                    <NavLink className="hover:text-[#0c2218] hover:transition-all hover:duration-500 text-[.8rem] md:text-[.8rem] lg:text-[1rem]" to="#">Unlimited Support</NavLink>
                </div>
            </div>
        </div>
     );
}
 
export default FooterComponents;