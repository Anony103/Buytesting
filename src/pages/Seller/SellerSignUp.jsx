import InputField from "../../components/InputFieldComponents";
import TermsCond from "../../components/TermsConditionsComponent";
import { CustomButton, CustomLink } from '../../components/SignUpSignInComponent';
import StateAndLgaData from "../../api/data.json";
import { useEffect, useState } from "react";
import { appStore, authStore } from "../../store";
import { sellerSignup } from "../../api";
import { toastError, toastSuccess } from "../../utils/constants";
import { isEmailValid, isPasswordValid } from "../../utils/helpers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SellerSignUp = () => {

    const navigate = useNavigate(); 
    const [state] = useState(Object.keys({"Select a state": "", ...StateAndLgaData}).map((state) => {
        return {
            value: state,
            label: state
        }
    }));

    const [radioChecked, setRadioChecked] = useState(false);

    const [selectedState, setSelectedState] = useState('');
    
    const defaultLga = [{value: "Select a L.G.A", label: "Select a L.G.A"}];
    const [lgas, setLgas] = useState([...defaultLga]);

    const [,setSelectedLga] = useState('');

    const app = appStore(state => state);

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
        agentReferral: '',
        password: ''
    });

    const setSellerDataHandler = (e) => {
        const { name, value } = e.target;
        setSellerData(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSignUp = async (data) => {
        try {
            if (!data.firstname) throw Error('First name is required');
            if (!data.lastname) throw Error('Last name is required');
            if (!data.email) throw Error('Email is required');
            if (!isEmailValid(data.email)) throw Error('Invalid email address');
            if (!data.businessName) throw Error('Business name is required');
            if (!data.businessPhone) throw Error('Business phone number is required');
            if (!data.state) throw Error('State is required');
            if (!data.lga) throw Error('L.G.A is required');
            if (!data.city) throw Error('City is required');
            if (!data.password) throw Error('Password is required');
            if (!isPasswordValid(data.password)) throw Error('Password must be at least 8 characters');
            if (!radioChecked) throw Error('Please accept terms and condition');
            if (!data.agentReferral) delete data.agentReferral;

console.log(`user details ${JSON.stringify({
    'email':data.email,
    'password':data.password,
'firstName':data.firstName,
'lastName':data.lastName,
'phoneNumber':data.businessPhone,
'address':data.businessAddress,
'businessName':data.businessName,
'state':data.state,
'lga':data.lga,
'city':data.city,

'referralId':data.agentReferral
})}`)

            // start loader
            app.startLoader();
            await sellerSignup({
                'email':data.email,
                'password':data.password,
'firstName':data.firstName,
'lastName':data.lastName,
'phoneNumber':data.businessPhone,
'address':data.businessAddress,
'businessName':data.businessName,
'state':data.state,
'lga':data.lga,
'city':data.city,

'referralId':data.agentReferral
 }).then(response => {
                // if (!response.success) throw Error(response.message);
                console.log(response);
                toast(response.message, toastSuccess);
                setTimeout(() => {
                    navigate("/seller/auth/email-verification", { state: { email: data.email } });
                    app.stopLoader();
                }, 3000);
            });

            
        } catch (e) {
            toast.error(e.message, toastError);
        } finally {
            app.stopLoader();
        }
    }

    return (
        <section className="w-full bg-authBg bg-no-repeat bg-cover flex justify-between items-center font-Lexend">
            <div className="w-[50%] bg-authBg bg-no-repeat bg-cover hidden lg:block"></div>
            <div className="windowScreen:w-[50%] lg:w-[50%] xl:w-[50%] w-full bg-[#FFF] flex justify-center items-center">
                <div className="w-full macScreens:py-[4rem] md:py-[3rem] py-[2rem] macScreens:px-[4rem] lg:px-[3rem] rounded-[5px] flex justify-center items-center">
                    <form className="flex flex-col items-center lg:gap-5 text-[#000] macScreens:w-[80%] lg:w-[80%] md:w-[60%] w-[80%]">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="font-semibold text-[.8rem] small-mobile:text-[1rem] md:text-[1.3rem] macScreens:text-[1.5rem]">Let's get you Started!</h1>
                            <h3 className="font-light font-Nunito text-[.5rem] small-mobile:text-[.6rem] md:text-[.8rem] macScreens:text-[1rem]">Create an account, start selling.</h3>
                        </div>
                        <div className="flex flex-col gap-3 lg:gap-4 w-full">
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="First Name*" name="firstname" placeholder="Enter your first name here..." type="text" required onChange={setSellerDataHandler} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Last Name*" name="lastname" placeholder="Enter your last name here..." type="text" required onChange={setSellerDataHandler} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Email Address*" name="email" placeholder="Enter your email address here..." type="email" required onChange={setSellerDataHandler} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Business Name" name="businessName" placeholder="Enter your business name here..." type="text" onChange={setSellerDataHandler} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Business Phone Number" name="businessPhone" placeholder="Enter your business phone number here..." type="tel" onChange={setSellerDataHandler} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Business Address" name="businessAddress" placeholder="Enter your business address here..." type="text" onChange={setSellerDataHandler} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="State*" name="state" type="select" options={state} required selected={(selectedData) => {
                                    setSelectedState(selectedData);
                                    setSellerData({ ...sellerData, state: selectedData, lga: '' });
                                }} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="L.G.A*" name="lga" type="select" options={lgas} required selected={(selectedData) => {
                                    setSelectedLga(selectedData);
                                    setSellerData({ ...sellerData, lga: selectedData });
                                }} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="City" name="city" placeholder="Enter your city" type="text" onChange={setSellerDataHandler} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Agent Referral I.D (Optional)" name="agentReferral" placeholder="Enter your agent referral I.D..." type="text" onChange={setSellerDataHandler} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem] relative">
                                <InputField label="Create Password*" name="password" placeholder="Password..." type="password" required onChange={setSellerDataHandler} />
                            </div>
                            <p className="mt-[-0.5rem] text-[#666666] font-light macScreens:text-[.8rem] md:text-[.5rem] text-[.4rem]">Must have at least 8 characters</p>
                        </div>
                        <div className="flex flex-col mt-2 gap-5 md:gap-7 lg:gap-4 macScreens:gap-10 w-full">
                            <div className="macScreens:text-[.8rem] text-[#1B1F27] lg:text-[.6rem]">
                                <TermsCond id="radioButton" name="myRadio" labelText="I agree with the" termsLink="#" termsCondText="Terms & Conditions" radioChecked={(checked) => setRadioChecked(checked)} />
                            </div>
                            <div className="flex flex-col gap-2 md:gap-5 lg:gap-2 macScreens:gap-2">
                                <CustomButton className="my-custom-button" text="Sign Up" onClick={() => handleSignUp(sellerData)} />

                                <CustomLink className="my-custom-link" text="Already have an account?" href="/seller/auth/sign-in" SignInSignUp="Sign In" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
 
export default SellerSignUp;