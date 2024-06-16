import { useEffect, useState } from "react";
import { appStore, authStore } from "../../store";
import NavbarDashboard from "../../components/NavbarDashboard";
import LogoHome from "../../components/Logo";
import SidebarNavLink from "../../components/SidebarNavLink";
import BuyerPathBreadCrumb from "../../components/BuyerPath";
import InputField from "../../components/InputFieldComponents";
import CustomButton from "../../components/CustomButton";
import StateAndLgaData from "../../api/data.json";
import AgentSideBar from "../../components/AgentSidebar";
import { agentCreateSeller } from "../../api";
import { toastSuccess, toastError } from "../../utils/constants";
import toast from 'react-hot-toast';
import { isEmailValid, isPhoneNumber } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const AgentAddSellers = () => {

    const app = appStore(state => state);
    const auth = authStore(state => state);
    const navigate = useNavigate();

    const [state] = useState(Object.keys({"Select a state": "", ...StateAndLgaData}).map((state) => {
        return {
            value: state,
            label: state
        }
    }));

    const [selectedState, setSelectedState] = useState('');
    
    const defaultLga = [{value: "Select a L.G.A", label: "Select a L.G.A"}];
    const [lgas, setLgas] = useState([...defaultLga]);

    const [selectedLga, setSelectedLga] = useState('');

    useEffect(() => {
        let selectedStateLga = (StateAndLgaData[selectedState] || []).map((lga) => {
            return {
                value: lga,
                label: lga
            }
        });
        setLgas([...defaultLga, ...selectedStateLga]);
    }, [selectedState]);

    const [sellerData, setSellerData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        businessName: '',
        businessPhone: '',
        businessAddress: '',
        state: '',
        lga: '',
        city: '',
        password: ''
    });


    const sellerDataHandler = (e) => {
        const { name, value } = e.target;
        setSellerData(prevState => ({ ...prevState, [name]: value }));
    }


    const createSeller = async () => {

        let errorShown = false;
        Object.keys(sellerData).forEach((key) => {
            if (sellerData[key] === '') {
                if (errorShown) return;
                toast(key.replace(/([A-Z])/g, ' $1').toLowerCase() + ' is required', toastError);
                errorShown = true;
            }

            if (key === 'email') {
                if (!isEmailValid(sellerData[key])) {
                    if (errorShown) return;
                    toast('Invalid email address', toastError);
                    errorShown = true;
                }
            }

            if (key === 'businessPhone') {
                if (!isPhoneNumber(sellerData[key])) {
                    if (errorShown) return;
                    toast('Invalid phone number', toastError);
                    errorShown = true;
                }
            }
        });

        if (errorShown) return;

        app.startLoader();
        await agentCreateSeller(
            {
                firstName: sellerData.firstname,
                lastName: sellerData.lastname,
                email: sellerData.email,
                businessName: sellerData.businessName,
                phoneNumber: sellerData.businessPhone,
                address: sellerData.businessAddress,
                state: sellerData.state,
                lga: sellerData.lga,
                city: sellerData.city,
                password: sellerData.password,
            }
            
            , { Authorization: `Bearer ${auth.user.token}` }).then((response) => {
            // if (!response.success) throw Error(response.message);
            toast('Seller created successfully', toastSuccess);
            navigate(-1);
        }).catch(e => {
            console.log(e.message);
            if (e.message === 'jwt expired') {
                auth.logout();
            }
            toast(e.message, toastError);
        }).finally(() => {
            app.stopLoader();
        });
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
                <div className="w-full flex justify-center items-center h-[15%] px-5">
                    <LogoHome LogoClassName="lg:w-[30%] md:w-[10%] w-[13%]" />
                </div>
                <div className="w-full flex justify-center items h-[85%]">
                    <AgentSideBar />
                </div>
            </div>
            <div className="w-[calc(100%-280px)] ms-[280px]">
                <NavbarDashboard token={!!auth.user?.token} />
                <div className="w-full min-h-[calc(100%-5rem)] mt-[2rem] pt-[6rem] px-[2rem] flex flex-col gap-5 macScreens:px-10">
                    <BuyerPathBreadCrumb home="Seller" shop=">  Add new seller"/>
                    <div className="w-full flex justify-start items-center py-5">
                        <h1 className="font-semibold text-[#110D06] text-[1.5rem]">Add seller</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full pb-[5rem]">
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="First Name" name="firstname" placeholder="Enter your first name here..." type="text" required onChange={(e) => sellerDataHandler(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="Last Name" name="lastname" placeholder="Enter your last name here..." type="text" required onChange={(e) => sellerDataHandler(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="Email Address" name="email" placeholder="Enter your email address here..." type="email" required onChange={(e) => sellerDataHandler(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="Business Name" name="businessName" placeholder="Enter your business name here..." type="text" required onChange={(e) => sellerDataHandler(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="Business Phone Number" name="businessPhone" placeholder="Enter your business phone number here..." type="tel" required onChange={(e) => sellerDataHandler(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="Business Address" name="businessAddress" placeholder="Enter your business address here..." type="text" required onChange={(e) => sellerDataHandler(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="State" name="state" type="select" options={state} required selected={(selectedData) => {
                                setSelectedState(selectedData);
                                setSellerData({ ...sellerData, state: selectedData, lga: '' });
                            }} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="L.G.A" name="lga" type="select" options={lgas} required selected={(selectedData) => {
                                setSelectedLga(selectedData);
                                setSellerData({ ...sellerData, lga: selectedData });
                            }} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="City" name="city" placeholder="Enter your city" type="text" required onChange={(e) => sellerDataHandler(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="Seller's new password" name="password" placeholder="Enter password for seller" type="password" required onChange={(e) => sellerDataHandler(e)} />
                        </div>
                        <div className="flex flex-col gap-y-10 w-full col-span-2">
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem] w-[25%]">
                                <CustomButton buttonText="Continue" btnClassName="bg-[#00753E] text-[#FBFBFB] rounded-[5px]" onClick={() => createSeller()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default AgentAddSellers;