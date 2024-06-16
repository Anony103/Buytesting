import { useEffect } from "react";
import { appStore, authStore } from "../../store";
import LogoHome from "../../components/Logo";
import SidebarNavLink from "../../components/SidebarNavLink";
import DummyImg from "../../assets/dummy-img.png";
import { NavLink, useLocation } from "react-router-dom";
import LoginActivityDynamicTable from "../../components/LoginActivityDynamicTable";
import AdminNavbar from "../../components/AdminNavbar";

const AdminSellerProfile = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);

    let location = useLocation();
    const data = location.state;
    console.log(`the route data ${JSON.stringify(data)}`)

    const sellersData = [
        {
            Devices: 'Windows',
            Browser: 'Google Chrome',
            Location: 'Port Harcourt',
            Session: '2 days ago',
            verified: true,
        },
        {
            Devices: 'Mac',
            Browser: 'Firefox',
            Location: 'Port Harcourt',
            Session: '5 days ago',
            verified: false,
        },
        {
            Devices: 'IOS',
            Browser: 'Safari',
            Location: 'Port Harcourt',
            Session: '9 days ago',
            verified: false,
        },
    ];
    

    useEffect(() => {
        app.startLoader();
        setTimeout(() => {
            app.stopLoader();
        }, 3000);
    }, [auth.user]);
    return ( 
        <section className="overflow-x-hidden h-[100vh] w-full flex relative">
            <div className="w-[280px] shadow-md fixed h-[100vh]">
                <div className="w-full flex justify-start items-center h-[15%] px-5">
                    <LogoHome LogoClassName="lg:w-[60%] md:w-[10%] w-[13%]" />
                </div>
                <div className="w-full flex justify-center items h-[85%]">
                    <div className="tab-list w-full h-full flex flex-col gap-5 px-5 py-[1rem]">
                        <SidebarNavLink 
                        to="/admin/dashboard" 
                        icon={
                            <svg className="shop-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M0.75 0.75H8.08333V9.91667H0.75V0.75ZM2.58333 2.58333V8.08333H6.25V2.58333H2.58333ZM9.91667 0.75H17.25V6.25H9.91667V0.75ZM11.75 2.58333V4.41667H15.4167V2.58333H11.75ZM9.91667 8.08333H17.25V17.25H9.91667V8.08333ZM11.75 9.91667V15.4167H15.4167V9.91667H11.75ZM0.75 11.75H8.08333V17.25H0.75V11.75ZM2.58333 13.5833V15.4167H6.25V13.5833H2.58333Z" fill=""/>
                            </svg>
                        } 
                        text="Dashboard"
                        />
                        <SidebarNavLink 
                        to="/admin/buyers" 
                        icon={
                            <svg className="profile-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none">
                                <path d="M11.07 6.40999C11.6774 5.56125 12.0041 4.54371 12.0041 3.49999C12.0041 2.45628 11.6774 1.43873 11.07 0.589992C11.6385 0.201947 12.3117 -0.00384117 13 -8.45615e-06C13.9283 -8.45615e-06 14.8185 0.368741 15.4749 1.02512C16.1313 1.6815 16.5 2.57173 16.5 3.49999C16.5 4.42825 16.1313 5.31849 15.4749 5.97486C14.8185 6.63124 13.9283 6.99999 13 6.99999C12.3117 7.00382 11.6385 6.79804 11.07 6.40999ZM3.5 3.49999C3.5 2.80776 3.70527 2.13107 4.08986 1.5555C4.47444 0.979924 5.02107 0.53132 5.66061 0.266413C6.30015 0.00150663 7.00388 -0.067805 7.68282 0.0672432C8.36175 0.202291 8.98539 0.535634 9.47487 1.02512C9.96436 1.5146 10.2977 2.13824 10.4327 2.81718C10.5678 3.49611 10.4985 4.19984 10.2336 4.83938C9.96867 5.47892 9.52007 6.02555 8.9445 6.41014C8.36892 6.79472 7.69223 6.99999 7 6.99999C6.07174 6.99999 5.1815 6.63124 4.52513 5.97486C3.86875 5.31849 3.5 4.42825 3.5 3.49999ZM5.5 3.49999C5.5 3.79666 5.58797 4.08667 5.7528 4.33335C5.91762 4.58002 6.15189 4.77228 6.42597 4.88581C6.70006 4.99934 7.00166 5.02905 7.29264 4.97117C7.58361 4.91329 7.85088 4.77043 8.06066 4.56065C8.27044 4.35087 8.4133 4.0836 8.47118 3.79263C8.52906 3.50166 8.49935 3.20006 8.38582 2.92597C8.27229 2.65188 8.08003 2.41761 7.83335 2.25279C7.58668 2.08797 7.29667 1.99999 7 1.99999C6.60218 1.99999 6.22064 2.15803 5.93934 2.43933C5.65804 2.72064 5.5 3.10217 5.5 3.49999ZM14 13V15H0V13C0 13 0 8.99999 7 8.99999C14 8.99999 14 13 14 13ZM12 13C11.86 12.22 10.67 11 7 11C3.33 11 2.07 12.31 2 13M13.95 8.99999C14.5629 9.47672 15.064 10.0818 15.4182 10.7729C15.7723 11.4639 15.9709 12.2241 16 13V15H20V13C20 13 20 9.36999 13.94 8.99999H13.95Z" fill=""/>
                            </svg>
                        } 
                        text="Buyers"
                        />
                        <SidebarNavLink 
                        to="/admin/sellers" 
                        icon={
                            <svg className="profile-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none">
                                <path d="M11.07 6.40999C11.6774 5.56125 12.0041 4.54371 12.0041 3.49999C12.0041 2.45628 11.6774 1.43873 11.07 0.589992C11.6385 0.201947 12.3117 -0.00384117 13 -8.45615e-06C13.9283 -8.45615e-06 14.8185 0.368741 15.4749 1.02512C16.1313 1.6815 16.5 2.57173 16.5 3.49999C16.5 4.42825 16.1313 5.31849 15.4749 5.97486C14.8185 6.63124 13.9283 6.99999 13 6.99999C12.3117 7.00382 11.6385 6.79804 11.07 6.40999ZM3.5 3.49999C3.5 2.80776 3.70527 2.13107 4.08986 1.5555C4.47444 0.979924 5.02107 0.53132 5.66061 0.266413C6.30015 0.00150663 7.00388 -0.067805 7.68282 0.0672432C8.36175 0.202291 8.98539 0.535634 9.47487 1.02512C9.96436 1.5146 10.2977 2.13824 10.4327 2.81718C10.5678 3.49611 10.4985 4.19984 10.2336 4.83938C9.96867 5.47892 9.52007 6.02555 8.9445 6.41014C8.36892 6.79472 7.69223 6.99999 7 6.99999C6.07174 6.99999 5.1815 6.63124 4.52513 5.97486C3.86875 5.31849 3.5 4.42825 3.5 3.49999ZM5.5 3.49999C5.5 3.79666 5.58797 4.08667 5.7528 4.33335C5.91762 4.58002 6.15189 4.77228 6.42597 4.88581C6.70006 4.99934 7.00166 5.02905 7.29264 4.97117C7.58361 4.91329 7.85088 4.77043 8.06066 4.56065C8.27044 4.35087 8.4133 4.0836 8.47118 3.79263C8.52906 3.50166 8.49935 3.20006 8.38582 2.92597C8.27229 2.65188 8.08003 2.41761 7.83335 2.25279C7.58668 2.08797 7.29667 1.99999 7 1.99999C6.60218 1.99999 6.22064 2.15803 5.93934 2.43933C5.65804 2.72064 5.5 3.10217 5.5 3.49999ZM14 13V15H0V13C0 13 0 8.99999 7 8.99999C14 8.99999 14 13 14 13ZM12 13C11.86 12.22 10.67 11 7 11C3.33 11 2.07 12.31 2 13M13.95 8.99999C14.5629 9.47672 15.064 10.0818 15.4182 10.7729C15.7723 11.4639 15.9709 12.2241 16 13V15H20V13C20 13 20 9.36999 13.94 8.99999H13.95Z" fill=""/>
                            </svg>
                        } 
                        text="Sellers"
                        />
                        <SidebarNavLink 
                        to="/admin/agents" 
                        icon={
                            <svg className="profile-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none">
                                <path d="M11.07 6.40999C11.6774 5.56125 12.0041 4.54371 12.0041 3.49999C12.0041 2.45628 11.6774 1.43873 11.07 0.589992C11.6385 0.201947 12.3117 -0.00384117 13 -8.45615e-06C13.9283 -8.45615e-06 14.8185 0.368741 15.4749 1.02512C16.1313 1.6815 16.5 2.57173 16.5 3.49999C16.5 4.42825 16.1313 5.31849 15.4749 5.97486C14.8185 6.63124 13.9283 6.99999 13 6.99999C12.3117 7.00382 11.6385 6.79804 11.07 6.40999ZM3.5 3.49999C3.5 2.80776 3.70527 2.13107 4.08986 1.5555C4.47444 0.979924 5.02107 0.53132 5.66061 0.266413C6.30015 0.00150663 7.00388 -0.067805 7.68282 0.0672432C8.36175 0.202291 8.98539 0.535634 9.47487 1.02512C9.96436 1.5146 10.2977 2.13824 10.4327 2.81718C10.5678 3.49611 10.4985 4.19984 10.2336 4.83938C9.96867 5.47892 9.52007 6.02555 8.9445 6.41014C8.36892 6.79472 7.69223 6.99999 7 6.99999C6.07174 6.99999 5.1815 6.63124 4.52513 5.97486C3.86875 5.31849 3.5 4.42825 3.5 3.49999ZM5.5 3.49999C5.5 3.79666 5.58797 4.08667 5.7528 4.33335C5.91762 4.58002 6.15189 4.77228 6.42597 4.88581C6.70006 4.99934 7.00166 5.02905 7.29264 4.97117C7.58361 4.91329 7.85088 4.77043 8.06066 4.56065C8.27044 4.35087 8.4133 4.0836 8.47118 3.79263C8.52906 3.50166 8.49935 3.20006 8.38582 2.92597C8.27229 2.65188 8.08003 2.41761 7.83335 2.25279C7.58668 2.08797 7.29667 1.99999 7 1.99999C6.60218 1.99999 6.22064 2.15803 5.93934 2.43933C5.65804 2.72064 5.5 3.10217 5.5 3.49999ZM14 13V15H0V13C0 13 0 8.99999 7 8.99999C14 8.99999 14 13 14 13ZM12 13C11.86 12.22 10.67 11 7 11C3.33 11 2.07 12.31 2 13M13.95 8.99999C14.5629 9.47672 15.064 10.0818 15.4182 10.7729C15.7723 11.4639 15.9709 12.2241 16 13V15H20V13C20 13 20 9.36999 13.94 8.99999H13.95Z" fill=""/>
                            </svg>
                        } 
                        text="Agents"
                        />
                        <SidebarNavLink 
                        to="/admin/subscriptions" 
                        icon={
                            <svg className="shop-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12.841 15.1L12 13L11.159 15.1L9 15.292L10.64 16.781L10.146 19L12 17.821L13.854 19L13.36 16.781L15 15.292L12.841 15.1ZM6 2H18V4H6V2ZM4 6H20V8H4V6Z" />
                                <path d="M20 12V20H4V12H20ZM20 10H4C3.46957 10 2.96086 10.2107 2.58579 10.5858C2.21071 10.9609 2 11.4696 2 12V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V12C22 11.4696 21.7893 10.9609 21.4142 10.5858C21.0391 10.2107 20.5304 10 20 10Z" />
                            </svg>
                        } 
                        text="Subscriptions"
                        />
                        <SidebarNavLink 
                        to="/admin/message" 
                        icon={
                            <svg className="shop-svg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" stroke="#6B7588" >
                            <mask id="mask0_2139_3394" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
                                <rect width="21" height="21" fill="#6B7588"/>
                            </mask>
                            <g mask="url(#mask0_2139_3394)">
                                <path d="M5.25 12.25H15.75V10.5H5.25V12.25ZM5.25 9.625H15.75V7.875H5.25V9.625ZM5.25 7H15.75V5.25H5.25V7ZM19.25 19.25L15.75 15.75H3.5C3.01875 15.75 2.60677 15.5786 2.26406 15.2359C1.92135 14.8932 1.75 14.4812 1.75 14V3.5C1.75 3.01875 1.92135 2.60677 2.26406 2.26406C2.60677 1.92135 3.01875 1.75 3.5 1.75H17.5C17.9813 1.75 18.3932 1.92135 18.7359 2.26406C19.0786 2.60677 19.25 3.01875 19.25 3.5V19.25ZM3.5 14H16.4938L17.5 14.9844V3.5H3.5V14Z"/>
                            </g>
                            </svg>
                        } 
                        text="Message"
                        messagesCount={<p className='absolute right-4 bg-[#D60606] h-[25px] w-[25px] flex justify-center items-center rounded-[100%] text-[#FFFFFF] text-xs'>13</p>}
                        />
                        <SidebarNavLink 
                        to="/admin/categories" 
                        icon={
                            <svg className="shop-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M16 2V22M18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        } 
                        text="Categories"
                        />
                        <SidebarNavLink 
                        to="/admin/settings" 
                        icon={
                            <svg className="shop-svg" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path d="M9.5 12.125C10.9497 12.125 12.125 10.9497 12.125 9.5C12.125 8.05025 10.9497 6.875 9.5 6.875C8.05025 6.875 6.875 8.05025 6.875 9.5C6.875 10.9497 8.05025 12.125 9.5 12.125Z" stroke="" stroke-width="1.5"/>
                            <path d="M11.0443 0.883C10.7232 0.75 10.3154 0.75 9.49991 0.75C8.68441 0.75 8.27666 0.75 7.95553 0.883C7.74306 0.970949 7.55001 1.09991 7.38741 1.26251C7.22481 1.42511 7.09586 1.61816 7.00791 1.83063C6.92741 2.02575 6.89503 2.25413 6.88278 2.58575C6.87733 2.82549 6.81103 3.05991 6.69012 3.267C6.5692 3.47409 6.39763 3.64704 6.19153 3.76963C5.98232 3.88691 5.74672 3.94909 5.50687 3.95031C5.26703 3.95154 5.03081 3.89177 4.82041 3.77663C4.52641 3.62088 4.31378 3.53513 4.10291 3.50713C3.64294 3.44664 3.17777 3.57127 2.80966 3.85363C2.53491 4.06625 2.33016 4.41888 1.92241 5.125C1.51466 5.83113 1.30991 6.18375 1.26528 6.52938C1.23521 6.75727 1.25034 6.98886 1.30979 7.21091C1.36924 7.43296 1.47186 7.64112 1.61178 7.8235C1.74128 7.9915 1.92241 8.13238 2.20328 8.30913C2.61716 8.569 2.88316 9.01175 2.88316 9.5C2.88316 9.98825 2.61716 10.431 2.20328 10.69C1.92241 10.8676 1.74041 11.0085 1.61178 11.1765C1.47186 11.3589 1.36924 11.567 1.30979 11.7891C1.25034 12.0111 1.23521 12.2427 1.26528 12.4706C1.31078 12.8154 1.51466 13.1689 1.92153 13.875C2.33016 14.5811 2.53403 14.9338 2.80966 15.1464C2.99204 15.2863 3.2002 15.3889 3.42225 15.4484C3.6443 15.5078 3.87589 15.5229 4.10378 15.4929C4.31378 15.4649 4.52641 15.3791 4.82041 15.2234C5.03081 15.1082 5.26703 15.0485 5.50687 15.0497C5.74672 15.0509 5.98232 15.1131 6.19153 15.2304C6.61416 15.4754 6.86528 15.926 6.88278 16.4143C6.89503 16.7468 6.92653 16.9743 7.00791 17.1694C7.09586 17.3818 7.22481 17.5749 7.38741 17.7375C7.55001 17.9001 7.74306 18.0291 7.95553 18.117C8.27666 18.25 8.68441 18.25 9.49991 18.25C10.3154 18.25 10.7232 18.25 11.0443 18.117C11.2567 18.0291 11.4498 17.9001 11.6124 17.7375C11.775 17.5749 11.904 17.3818 11.9919 17.1694C12.0724 16.9743 12.1048 16.7468 12.117 16.4143C12.1345 15.926 12.3857 15.4745 12.8083 15.2304C13.0175 15.1131 13.2531 15.0509 13.4929 15.0497C13.7328 15.0485 13.969 15.1082 14.1794 15.2234C14.4734 15.3791 14.686 15.4649 14.896 15.4929C15.1239 15.5229 15.3555 15.5078 15.5776 15.4484C15.7996 15.3889 16.0078 15.2863 16.1902 15.1464C16.4658 14.9346 16.6697 14.5811 17.0774 13.875C17.4852 13.1689 17.6899 12.8163 17.7345 12.4706C17.7646 12.2427 17.7495 12.0111 17.69 11.7891C17.6306 11.567 17.528 11.3589 17.388 11.1765C17.2585 11.0085 17.0774 10.8676 16.7965 10.6909C16.5915 10.5663 16.4216 10.3916 16.3027 10.1833C16.1838 9.97499 16.1197 9.73986 16.1167 9.5C16.1167 9.01175 16.3827 8.569 16.7965 8.31C17.0774 8.13238 17.2594 7.9915 17.388 7.8235C17.528 7.64112 17.6306 7.43296 17.69 7.21091C17.7495 6.98886 17.7646 6.75727 17.7345 6.52938C17.689 6.18463 17.4852 5.83113 17.0783 5.125C16.6697 4.41888 16.4658 4.06625 16.1902 3.85363C16.0078 3.7137 15.7996 3.61109 15.5776 3.55163C15.3555 3.49218 15.1239 3.47706 14.896 3.50713C14.686 3.53513 14.4734 3.62088 14.1785 3.77663C13.9682 3.89161 13.7322 3.9513 13.4925 3.95007C13.2528 3.94885 13.0174 3.88676 12.8083 3.76963C12.6022 3.64704 12.4306 3.47409 12.3097 3.267C12.1888 3.05991 12.1225 2.82549 12.117 2.58575C12.1048 2.25325 12.0733 2.02575 11.9919 1.83063C11.904 1.61816 11.775 1.42511 11.6124 1.26251C11.4498 1.09991 11.2567 0.970949 11.0443 0.883Z" stroke="" stroke-width="1.5"/>
                            </svg>
                        } 
                        text="Settings"
                        />
                    </div>
                </div>
            </div>
            <div className="w-[calc(100%-280px)] ms-[280px]">
                <AdminNavbar token={!!auth.user?.token} />
                <div className="w-full min-h-[calc(100%-5rem)] mt-[2rem] pt-[4rem] lg:px-1 windowScreen:px-[2rem] pb-[2rem] flex flex-col gap-10">
                    <div className="flex flex-col gap-5 lg:px-2 windowScreen:px-5">
                        <h1 className="font-semibold text-[#110D06] lg:text-xl macScreens:text-xl">Seller Profile</h1>
                        <div className="w-full border rounded-[10px] lg:px-5 windowScreen:px-7 py-7 flex flex-col gap-14">
                            <div className="flex flex-col gap-5">
                                <div className="flex justify-start items-center gap-5 w-[50%]">
                                    <div className="w-[20%]">
                                        <img className="w-full" src={data.avatar} alt="" />
                                    </div>
                                    <p className="lg:text-sm macScreens:text-lg text-[#161616] font-medium">{`${data.firstName} ${data.lastName}`}</p>
                                </div>
                                <p className="text-lg text-[#161616] font-medium lg:text-sm macScreens:text-lg">Personal Information</p>
                                <table className="w-full bg-transparent rounded-[10px]">
                                    <thead>
                                        <tr>
                                            <th className="text-start font-medium text-[#848484] font-Nunito py-1 lg:text-[.6rem] windowScreen:text-sm">First Name</th>
                                            <th className="text-start font-medium text-[#848484] font-Nunito py-1 lg:text-[.6rem] windowScreen:text-sm">Last Name</th>
                                            <th className="text-start font-medium text-[#848484] font-Nunito py-1 lg:text-[.6rem] windowScreen:text-sm">Email Address</th>
                                            <th className="text-start font-medium text-[#848484] font-Nunito py-1 lg:text-[.6rem] windowScreen:text-sm">Phone Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-1 text-[#161616] font-Nunito font-semibold lg:text-[.6rem] windowScreen:text-sm">{data.firstName}</td>
                                            <td className="py-1 text-[#161616] font-Nunito font-semibold lg:text-[.6rem] windowScreen:text-sm">{data.lastName}</td>
                                            <td className="py-1 text-[#161616] font-Nunito font-semibold lg:text-[.6rem] windowScreen:text-sm">{data.email}</td>
                                            <td className="py-1 text-[#161616] font-Nunito font-semibold lg:text-[.6rem] windowScreen:text-sm">{data.phoneNumber}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex flex-col gap-5">
                                <p className="text-lg text-[#161616] font-medium lg:text-sm macScreens:text-lg">Login Activity</p>
                                <div className="col-span-2">
                                    <LoginActivityDynamicTable 
                                    showCheckbox={true}
                                    tableIcon2={
                                        <NavLink
                                        to="/admin/seller-profile"
                                        className="text-primary dark:text-primary-400"
                                        data-twe-toggle="tooltip"
                                        title="View seller"
                                        ><span className="material-symbols-outlined text-[1rem] lg:text-[1.5rem] xl:text-[1.8rem] text-[#161616] cursor-pointer border-[1px] border-[#E8E8E8] py-1 px-1 rounded-[5px]">visibility</span>
                                        </NavLink>
                                    }
                                    data={sellersData} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default AdminSellerProfile;