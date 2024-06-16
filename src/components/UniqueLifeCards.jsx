import { NavLink } from "react-router-dom";
const UniqueLifeCards = () => {
    return ( 
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 md:gap-x-4 w-full md:w-[90%] xl:w-[70%] h-[60%] md:h-[70%]">
            <div className="bg-mediaBg1 bg-cover bg-no-repeat md:rounded-[5px] h-full flex justify-end items-center md:px-5 px-1">
                <div className="flex flex-col gap-1 justify-center items-end">
                    <p className="font-Nunito font-medium text-white text-[.6rem] md:text-[.8rem] xl:text-[1rem]">Your Space</p>
                    <p className="font-bold text-[.7rem] md:text-[1.2rem] xl:text-[1.5rem]">Unique Life</p>
                    <NavLink to="#" className="font-semibold font-Nunito text-white underline text-[.6rem] md:text-[.8rem] xl:text-[1rem] hover:text-white hover:bg-[#252B42] px-2 py-1 rounded-[5px] hover:transition-all hover:duration-700">Explore Items</NavLink>
                </div>
            </div>
            <div className="bg-mediaBg2 bg-cover bg-no-repeat md:rounded-[5px] h-full flex justify-end items-center md:px-5 px-1">
                <div className="flex flex-col gap-1 justify-center items-end">
                    <p className="font-Nunito font-medium text-[#737373] text-[.6rem] md:text-[.8rem] xl:text-[1rem]">Ends Today</p>
                    <p className="font-bold text-[#252B42] text-[.7rem] md:text-[1.2rem] xl:text-[1.5rem]">Elements Style</p>
                    <NavLink to="#" className="font-semibold font-Nunito text-[#252B42] underline text-[.6rem] md:text-[.8rem] xl:text-[1rem] hover:text-white hover:bg-[#252B42] px-2 py-1 rounded-[5px] hover:transition-all hover:duration-700">Explore Items</NavLink>
                </div>
            </div>
            <div className="hidden bg-mediaBg3 bg-cover bg-no-repeat md:rounded-[5px] h-full md:flex justify-end items-center md:px-5 px-1">
                <div className="flex flex-col gap-1 justify-center items-end">
                    <p className="font-Nunito font-medium text-[#737373] text-[.6rem] md:text-[.8rem] xl:text-[1rem]">Ends Today</p>
                    <p className="font-bold text-[#252B42] text-[.7rem] md:text-[1.2rem] xl:text-[1.5rem]">Beautiful Life</p>
                    <NavLink to="#" className="font-semibold font-Nunito text-[#252B42] underline text-[.6rem] md:text-[.8rem] xl:text-[1rem] hover:text-white hover:bg-[#252B42] px-2 py-1 rounded-[5px] hover:transition-all hover:duration-700">Explore Items</NavLink>
                </div>
            </div>
        </div>
     );
}
 
export default UniqueLifeCards;