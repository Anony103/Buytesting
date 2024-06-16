import FooterComponents from "./FooterComponents";


const Footer = () => {
    return ( 
        <footer className="bg-[#104E30] w-full h-[30rem] flex flex-col gap-10 md:gap-20 justify-center items-center">
            <FooterComponents />
            <h3 className="text-white text-[.5rem] md:text-[1rem] lg:text-[1rem]">Copyright © All rights reserved</h3>
        </footer>
     );
}
 
export default Footer;