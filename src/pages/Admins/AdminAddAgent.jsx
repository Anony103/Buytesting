import { useEffect, useState } from "react";
import { appStore, authStore } from "../../store";
import LogoHome from "../../components/Logo";
import SidebarNavLink from "../../components/SidebarNavLink";
import InputField from "../../components/InputFieldComponents";
import CustomButton from "../../components/CustomButton";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSideBar from "../../components/AdminSidebar";
import toast from 'react-hot-toast';
import { toastError, toastSuccess } from "../../utils/constants";
import { isEmailValid, isPhoneNumber } from "../../utils/helpers";
import { adminCreateAgent } from "../../api";
import { useNavigate } from "react-router-dom";

const AdminAddAgent = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);
    const navigate = useNavigate();
    
    const [agent, setAgent] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        password:'123456'
    });

    const handleChange = (e) => {
        setAgent({
            ...agent,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async () => {
        try {
            Object.keys(agent).forEach(key => {
                if (agent.firstname === agent.lastname) throw Error('First name cannot be the same as last name');
                if (!agent[key]) throw Error(`${key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} is required`);
                if (key === 'email' && !isEmailValid(agent[key])) throw Error('Invalid email address');
                if (key === 'phoneNumber' && !isPhoneNumber(agent[key])) throw Error('Invalid phone number');
            });

            app.startLoader();
            await adminCreateAgent({
                "email": agent.email,
                "password": "abc123456",
                "firstName": agent.firstname,
                "lastName": agent.lastname,
                "phoneNumber": agent.phoneNumber,
                
              },
              { Authorization: `Bearer ${auth.user.token}` }
            ).then(response => {
                // if (!response.success) throw Error(response.message);
                toast('Agent added successfully', toastSuccess);
                navigate(-1);
                console.log(response);
            }).catch(e => {
                console.log(e.message);
                if (e.message === 'jwt expired') {
                    auth.logout();
                }
                throw Error(e.message);
            }).finally(() => {
                app.stopLoader();
            });
        } catch (error) {
            toast(error.message, toastError);
        }
    }

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
                        <AdminSideBar />
                    </div>
                </div>
            </div>
            <div className="w-[calc(100%-280px)] ms-[280px]">
                <AdminNavbar token={!!auth.user?.token} />
                <div className="w-full min-h-[calc(100%-5rem)] mt-[2rem] lg:pt-[5rem] lg:px-0 macScreens:px-[2rem] lg:pb-5 macScreens:pb-[5rem] flex flex-col gap-10">
                    <div className="flex flex-col windowScreen:gap-10 gap-5 px-5">
                        <h1 className="font-semibold text-[#110D06] lg:text-xl macScreens:text-xl">Add Agent</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full border rounded-[10px] px-7 py-7">
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="First Name" name="firstname" placeholder="Enter your first name here..." type="text" required onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Last Name" name="lastname" placeholder="Enter your last name here..." type="text" required onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Email Address" name="email" placeholder="Enter your email address here..." type="email" required onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Phone Number" name="phoneNumber" placeholder="080..." type="tel" required onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="flex flex-col gap-y-10 w-full col-span-2">
                                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem] lg:w-[30%] 2xl:w-[15%]">
                                    <CustomButton buttonText="Continue" btnClassName="bg-[#00753E] text-[#FBFBFB] rounded-[5px]" onClick={() => handleSubmit()} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default AdminAddAgent;