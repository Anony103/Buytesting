import DashboardProfileHeader from "./DashboardProfileHeader";
import ProfileImg1 from '../assets/dp.jpeg'
import { appStore, authStore } from "../store";
import { useState } from "react";
import { getUserDetails } from "../api";

const AdminNavbar = ({navbarClassName}) => {
    const auth = authStore(state => state);
    const app = appStore(state => state);
    const fullname = `${auth.user.firstName} ${auth.user.lastName}`;
    const dp = auth.user?.profileImage || ProfileImg1;
    const [adminInfo,setAdminInfo]=useState([
        {
            'fullname':'ade',
        }
    ])


    const fetchData =  async () => {
     
        await getUserDetails({Authorization: `Bearer ${auth.user.token}`}).then(response => {
            // if (!response.success) throw Error(response.message);
            // auth.setAdminDashboard(response);
            console.log(response.firstName);
            setAdminInfo(
                [{
                    'fullname':response.firstName+response.lastName,
                }

                ]
            )
        }).catch(e => {
            console.log(e.message);
            console.log(e.message);
            if (e.message === 'jwt expired') {
                auth.logout();
            }
        }).finally(() => {
            app.stopLoader();
        });

    }
    return ( 
        <nav className={`navbar flex flex-col gap-3 md:gap-0 justify-center items-center pb-2 pt-5 shadow-md bg-white fixed top-0 z-30 w-[calc(100%-280px)] h-[5rem] ${navbarClassName}`}>
            <div className="macScreens:w-full lg:w-full">
                <DashboardProfileHeader AcctImg={dp} AcctType="Admin" AcctName={adminInfo[0].fullname || "Davies Grant"} HeaderClass="w-full md:h-[4rem] pe-[5rem] flex justify-end items-center gap-3 lg:gap-7" />
            </div>
        </nav>
     );
}
 
export default AdminNavbar;