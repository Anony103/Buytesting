import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchProduct } from "../api";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        const searchQuery = event.target.value;
        setQuery(searchQuery);
        if (searchQuery) {
            try {
                console.log("Searching for:", searchQuery);  // Log the search query
                const response = await SearchProduct(searchQuery);
                console.log("Search response:", response);  // Log the response
                if (response) {
                    setSearchResults(response);  // Directly use response if it's already in the desired format
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error("Failed to fetch search results", error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleResultClick = (id) => {
        navigate(`/product-description/${id}`);
    };

    return (
        <div className="relative w-full">
            <div className="top-0 bottom-0 absolute md:right-0 right-4 w-[10%] flex justify-center items-center">
                <i className='bx bx-search text-[1.2rem]'></i>
            </div>
            <input
                type="search"
                className="bg-[#F7F7FD] w-full h-full py-4 border-none outline-none px-5 rounded-[5px] text-black"
                placeholder="I'm on the hunt for..."
                value={query}
                onChange={handleSearch}
            />
            {query && searchResults.length > 0 && (
                <div className="absolute w-full bg-white shadow-md rounded mt-1 max-h-60 overflow-y-auto">
                    {searchResults.map(product => (
                        <div 
                            key={product.id} 
                            className="p-2 hover:bg-gray-200 cursor-pointer" 
                            onClick={() => handleResultClick(product.id)}
                        >
                            {product.name}
                        </div>
                    ))}
                </div>
            )}
            {query && searchResults.length === 0 && (
                <div className="absolute w-full bg-white shadow-md rounded mt-1 max-h-60 overflow-y-auto">
                    <div className="p-2">No results found</div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
