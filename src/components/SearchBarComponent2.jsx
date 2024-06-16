const SearchBar2 = ({searchIconClassName, searchIcon, inputClassName, placeholder}) => {
    return ( 
        <div className="relative w-full">
            <div className={`${searchIconClassName}`}>
                {searchIcon}
            </div>
            <input type="search" className={`${inputClassName}`} placeholder={placeholder} />
        </div>
     );
}
 
export default SearchBar2;