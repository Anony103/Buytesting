import InputField from "../../components/InputFieldComponents";
import TermsCond from "../../components/TermsConditionsComponent";
import { CustomButton, CustomLink, Separator, SocialButton } from '../../components/SignUpSignInComponent';
import { NavLink } from "react-router-dom";
import { adminLogin, buyerLogin } from "../../api";
import { useState } from "react";
import toast from 'react-hot-toast';
import { isEmailValid, isPasswordValid } from "../../utils/helpers";
import { USER_TYPES, toastError, toastSuccess } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { appStore, authStore } from "../../store";

const AdminSignIn = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState({email: '', password: ''});
    const [, setRememberMe] = useState(false);
    const loader = appStore(state => state);
    const auth = authStore(state => state);

    const setLoginHandler = (e) => {
        const { name, value } = e.target;
        setLogin(prevState => ({ ...prevState, [name]: value }));
    }

    const handleLogin = async (data) => {
        try {
            if (!data.email) throw Error('Email is required');
            if (!isEmailValid(data.email)) throw Error('Invalid email address');
            if (!data.password) throw Error('Password is required');
            if (!isPasswordValid(data.password)) throw Error('Password must be at least 8 characters');
            loader.startLoader();
            await adminLogin(data).then(response => {
                console.log(`response    ${JSON.stringify(response)}`)
                // if (!response.success) throw Error(response.message);
                auth.login({ ...response, token: response.accessToken }, USER_TYPES.ADMIN);
                toast(response.message, toastSuccess);
                navigate("/admin/dashboard");
                loader.stopLoader();
            });
        } catch(e) {
            loader.stopLoader();
            toast(e.message, toastError);
        }
    }

    return (
        <section className="w-full h-[100vh] bg-white bg-no-repeat bg-cover lg:py-[5rem] flex justify-center items-center font-Lexend">
            <div className="windowScreen:w-[36%] lg:w-[45%] xl:w-[35%] md:w-[70%] w-[95%] bg-[#FBFBFB] shadow-lg macScreens:py-[4rem] py-[2rem] md:py-[3rem] macScreens:px-[4rem] px-[1rem] md:px-[4rem] lg:px-[4rem] rounded-[5px] macScreens:scale-[85%] lg:scale-[80%] large-mobile:scale-[100%] lg:scale-y-[70%] windowScreen:scale-y-[70%] large-desktop:scale-y-[90%]">
                <div className="w-full flex flex-col items-center gap-4 lg:gap-5 text-[#000]">
                    <div className="flex flex-col justify-center items-center">
                    <h1 className="font-semibold text-[1rem] md:text-[1.3rem] lg:text-[1.3rem] macScreens:text-[1.5rem]">Sign In</h1>
                    <h3 className="font-light font-Nunito text-[.6rem] md:text-[.8rem] lg:text-[.8rem] macScreens:text-[1rem]">Welcome, enter your details</h3>
                    </div>
                    <div className="flex flex-col gap-3 lg:gap-4 w-full">
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="Email Address" name="email" placeholder="Enter your email address here..." type="email" required onChange={(e) => setLoginHandler(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem] relative">
                            <InputField label="Password" name="password" placeholder="Enter your password..." type="password" required onChange={(e) => setLoginHandler(e)} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 md:gap-5 lg:gap-4 macScreens:gap-10 w-full">
                        <div className="macScreens:text-[.8rem] text-[#1B1F27] lg:text-[.6rem] text-[.5rem] small-mobile:text-[.6rem] md:text-[1rem] font-Nunito flex justify-between w-full">
                            <div className="macScreens:text-[.8rem] text-[#1B1F27] lg:text-[.6rem] w-full">
                                <TermsCond id="radioButton" name="myRadio" labelText="Remember Me" termsLink="#" radioChecked={(checked) => setRememberMe(checked)} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 md:gap-5 lg:gap-2 macScreens:gap-2">
                            <CustomButton className="my-custom-button" text={loader.loader ? "Processing..." : "Sign In"} onClick={() => handleLogin(login)} disabled={loader.loader} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default AdminSignIn;