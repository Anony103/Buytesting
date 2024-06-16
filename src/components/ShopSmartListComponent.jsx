// import ShopSmartOptionDropdown from "./ShopSmartOptionDropdown";
import { authStore } from "../store";
import SmartOptionDropdown from "./ShopSmartOptionDropdown"
import { NavLink } from "react-router-dom";

const options1 = [
    { label: 'Option 1', link: '#' },
    { label: 'Option 2', link: '#' },
    { label: 'Option 3', link: '#' },
  ];

  const options2 = [
    { label: 'Another Option 1', link: '#' },
    { label: 'Another Option 2', link: '#' },
  ];


const ShopSmartList = () => {
    const auth = authStore(state => state);
    const categories = auth.storeData.categories;

    return ( 
        <ul className="flex flex-col gap-5 border-r py-4 min-h-[27rem] md:text-[.8rem] lg:text-[1rem] xl:text-[.8rem] macScreens:text-[1rem]">
            {
                categories.map((category, index) => (
                    category.status ?
                    (<li key={index}>
                        {
                            !!category.subCategory ? (
                                <SmartOptionDropdown label={category.name} options={category.subCategory} />
                            ) : (
                                <NavLink className="px-4 py-2" to={`categories/${category.id}`}>{category.name}</NavLink>
                            )
                        }
                    </li>) : null
                ))
            }
        </ul>
     );
}
 
export default ShopSmartList;