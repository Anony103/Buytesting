import { NavLink, useNavigate } from "react-router-dom";
import UserProfileDropdown from "./UserProfileDropdownComponent";
import ProfileImg from '../assets/profile-img.png'
import MyShopSvg from '../assets/svg/myprofile.svg'; // Import your SVGs
import MyProfileSvg from '../assets/svg/myshop.svg';
import MySettingsSvg from '../assets/svg/sub.svg';
import { authStore } from "../store";

const SellerProfileHeader = () => {
    const menuItems = [
        { to: '/seller/my-shop', label: 'My Shop' },
        { to: '/seller/profile', label: 'My Profile' },
        { to: '/seller/Subscription', label: 'Subscription' },
    ];

    const svgComponents = {
        'My Shop': <img className="w-full h-full" src={MyShopSvg} alt="Account Settings" />,
        'My Profile': <img className="w-full h-full" src={MyProfileSvg} alt="Support" />,
        'Subscription': <img className="w-full h-full" src={MySettingsSvg} alt="License" />
    };

    const auth = authStore(state => state);
    const navigate = useNavigate();

    return ( 
        <div className="w-full md:h-[4rem] flex items-center gap-3 lg:gap-7">
            <NavLink to="#">
                <div className="lg:w-[45px] lg:h-[45px] md:w-[35px] md:h-[35px] w-[25px] h-[25px] rounded-[100%]">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 31" fill="none">
                        <rect x="0.5" y="0.668945" width="29" height="29" rx="14.5" stroke="#161616"/>
                        <path d="M9 22.6689V8.78395C9 8.32395 9.15433 7.93995 9.463 7.63195C9.771 7.32328 10.155 7.16895 10.615 7.16895H19.385C19.845 7.16895 20.229 7.32328 20.537 7.63195C20.8457 7.93995 21 8.32395 21 8.78395V22.6689L15 20.0919L9 22.6689ZM10 21.1189L15 18.9689L20 21.1189V8.78395C20 8.63061 19.936 8.48961 19.808 8.36095C19.6793 8.23295 19.5383 8.16895 19.385 8.16895H10.615C10.4617 8.16895 10.3207 8.23295 10.192 8.36095C10.064 8.48961 10 8.63061 10 8.78395V21.1189Z" fill="#161616"/>
                    </svg>
                </div>
            </NavLink>
            <NavLink to="#">
                <div className="lg:w-[45px] lg:h-[45px] md:w-[35px] md:h-[35px] w-[25px] h-[25px] rounded-[100%]">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 31" fill="none">
                        <rect x="0.5" y="0.668945" width="29" height="29" rx="14.5" stroke="#161616"/>
                        <path d="M10.4167 16.4189H16.25V15.5856H10.4167V16.4189ZM10.4167 13.9189H19.5833V13.0856H10.4167V13.9189ZM10.4167 11.4189H19.5833V10.5856H10.4167V11.4189ZM7.5 21.8998V9.01478C7.5 8.63145 7.62861 8.31145 7.88583 8.05478C8.1425 7.79756 8.4625 7.66895 8.84583 7.66895H21.1542C21.5375 7.66895 21.8575 7.79756 22.1142 8.05478C22.3714 8.31145 22.5 8.63145 22.5 9.01478V17.9898C22.5 18.3731 22.3717 18.6934 22.115 18.9506C21.8578 19.2073 21.5375 19.3356 21.1542 19.3356H10.0642L7.5 21.8998ZM9.70833 18.5023H21.1542C21.2819 18.5023 21.3994 18.4489 21.5067 18.3423C21.6133 18.2351 21.6667 18.1176 21.6667 17.9898V9.01478C21.6667 8.887 21.6133 8.7695 21.5067 8.66228C21.3994 8.55561 21.2819 8.50228 21.1542 8.50228H8.84583C8.71806 8.50228 8.60056 8.55561 8.49333 8.66228C8.38667 8.7695 8.33333 8.887 8.33333 9.01478V19.8731L9.70833 18.5023Z" fill="#161616"/>
                    </svg>
                </div>
            </NavLink>
            <NavLink to="#">
                <div className="lg:w-[45px] lg:h-[45px] md:w-[35px] md:h-[35px] w-[25px] h-[25px] rounded-[100%]">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 31" fill="none">
                        <rect x="0.5" y="0.668945" width="29" height="29" rx="14.5" stroke="#161616"/>
                        <g clip-path="url(#clip0_555_6302)">
                            <path d="M23.0611 20.63C22.5254 20.1524 22.0564 19.6049 21.6667 19.0023C21.2412 18.1703 20.9863 17.2618 20.9167 16.33V13.5856C20.9204 12.122 20.3895 10.7075 19.4238 9.60779C18.458 8.50807 17.124 7.79884 15.6722 7.61336V6.8967C15.6722 6.69999 15.5941 6.51135 15.455 6.37226C15.3159 6.23317 15.1273 6.15503 14.9306 6.15503C14.7339 6.15503 14.5452 6.23317 14.4061 6.37226C14.267 6.51135 14.1889 6.69999 14.1889 6.8967V7.62447C12.7502 7.82332 11.4322 8.53684 10.4792 9.63287C9.52617 10.7289 9.00264 12.1332 9.00557 13.5856V16.33C8.93599 17.2618 8.681 18.1703 8.25557 19.0023C7.87273 19.6036 7.41123 20.151 6.88335 20.63C6.82409 20.6821 6.77659 20.7462 6.74402 20.818C6.71145 20.8899 6.69456 20.9678 6.69446 21.0467V21.8023C6.69446 21.9496 6.75299 22.0909 6.85718 22.1951C6.96136 22.2993 7.10267 22.3578 7.25001 22.3578H22.6945C22.8418 22.3578 22.9831 22.2993 23.0873 22.1951C23.1915 22.0909 23.25 21.9496 23.25 21.8023V21.0467C23.2499 20.9678 23.233 20.8899 23.2005 20.818C23.1679 20.7462 23.1204 20.6821 23.0611 20.63ZM7.85001 21.2467C8.36691 20.7474 8.82201 20.1878 9.20557 19.58C9.74147 18.5753 10.0541 17.4667 10.1222 16.33V13.5856C10.1002 12.9345 10.2094 12.2856 10.4434 11.6776C10.6773 11.0696 11.0312 10.5149 11.484 10.0465C11.9368 9.57815 12.4793 9.20568 13.079 8.95129C13.6787 8.69691 14.3235 8.56581 14.975 8.56581C15.6265 8.56581 16.2713 8.69691 16.871 8.95129C17.4708 9.20568 18.0132 9.57815 18.466 10.0465C18.9188 10.5149 19.2727 11.0696 19.5067 11.6776C19.7406 12.2856 19.8498 12.9345 19.8278 13.5856V16.33C19.8959 17.4667 20.2086 18.5753 20.7445 19.58C21.128 20.1878 21.5831 20.7474 22.1 21.2467H7.85001Z" fill="#161616"/>
                            <path d="M15 24.2134C15.35 24.2054 15.6858 24.0738 15.9481 23.842C16.2104 23.6102 16.3823 23.2931 16.4333 22.9468H13.5111C13.5636 23.3025 13.7435 23.6271 14.0174 23.8601C14.2913 24.0931 14.6405 24.2186 15 24.2134Z" fill="#161616"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_555_6302">
                                <rect width="20" height="20" fill="white" transform="translate(5 5.16895)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </NavLink>
            <div className="me-2 small-mobile:me-0 md:me-0">
                <UserProfileDropdown
                    avatar={{ image: ProfileImg, size: 'lg:w-10 lg:h-10 md:w-8 md:h-8 w-7 h-7' }}
                    menuItems={menuItems}
                    buttonClassName="your-custom-button-styles"
                    menuClassName="your-custom-menu-styles"
                    svgComponents={svgComponents}
                    onSignOutClick={() => {
                        auth.logout();
                        navigate('/seller');
                    }}
                />
            </div>
        </div>
     );
}
 
export default SellerProfileHeader;