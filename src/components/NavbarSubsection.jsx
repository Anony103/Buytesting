
import SearchBar from "./SearchbarComponent";

const NavbarSubsection = () => {
    return ( 
        <div className="md:hidden w-[90%] flex justify-between gap-3 items-center">
            <div className="w-[30%]">
                <select name="" id="">
                    <option value="">option</option>
                    <option value="">option</option>
                    <option value="">option</option>
                    <option value="">option</option>
                    <option value="">option</option>
                </select>
            </div>
            <SearchBar />
        </div>
     );
}
 
export default NavbarSubsection;