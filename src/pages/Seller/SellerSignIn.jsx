import InputField from "../../components/InputFieldComponents";
import TermsCond from "../../components/TermsConditionsComponent";
import { CustomButton, CustomLink } from '../../components/SignUpSignInComponent';
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { appStore, authStore } from "../../store";
import { sellerLogin } from "../../api";
import { isEmailValid, isPasswordValid } from "../../utils/helpers";
import toast from "react-hot-toast";
import { USER_TYPES, toastError, toastSuccess } from "../../utils/constants";


const SellerSignIn = () => {

    const navigate = useNavigate();
    const [login, setLogin] = useState({ email: '', password: '' });
    const [, setRememberMe] = useState(false);
    const loader = appStore(state => state);
    const auth = authStore(state => state);

    const setLoginHandler = (e) => {
        const { name, value } = e.target;
        setLogin(prevState => ({ ...prevState,
             [name]: value,
            
            }));
    }

    const handleLogin = async (data) => {
        try {
            if (!data.email) throw Error('Email is required');
            if (!isEmailValid(data.email)) throw Error('Invalid email address');
            if (!data.password) throw Error('Password is required');
            if (!isPasswordValid(data.password)) throw Error('Password must be at least 8 characters');
            loader.startLoader();
            await sellerLogin(data).then(response => {
                // if (!response.success) throw Error(response.message);
                console.log(response);
                auth.login({ ...response, token: response.accessToken }, USER_TYPES.SELLER);
                toast(response.message, toastSuccess);
                setTimeout(() => {
                    navigate("/");
                    loader.stopLoader();
                }, 3000);
            });
        } catch (e) {
            loader.stopLoader();
            toast(e.message, toastError);
        }
    }
    return (
        <section className="w-full h-[100vh] bg-authBg bg-no-repeat bg-cover flex justify-between items-center font-Lexend">
            <div className="w-[50%] h-full bg-authBg bg-no-repeat bg-cover hidden lg:block"></div>
            <div className="windowScreen:w-[50%] lg:w-[50%] xl:w-[50%] w-full bg-[#FFF] h-[100vh] flex justify-center lg:items-center">
                <div className="w-[90%] macScreens:py-[4rem] bg-[#FBFBFB] lg:py-[3rem] py-[3rem] macScreens:px-[4rem] lg:px-[3rem] rounded-[5px] flex justify-center lg:items-center">
                    <div className="macScreens:w-[70%] lg:w-[80%] md:w-[70%] w-[80%] flex flex-col items-center lg:gap-5 text-[#000]">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="font-semibold text-[1rem] md:text-[1.3rem] lg:text-[1.3rem] macScreens:text-[1.5rem]">Sign In</h1>
                            <h3 className="font-light font-Nunito text-[.6rem] md:text-[.8rem] lg:text-[.8rem] macScreens:text-[1rem]">Welcome, enter your details</h3>
                        </div>
                        <div className="flex flex-col gap-3 lg:gap-4 w-full">
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Email Address" name="email" placeholder="Enter your email here..." type="email" required onChange={setLoginHandler} />
                            </div>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem] relative">
                                <InputField label="Password" name="password" placeholder="Enter your password here..." type="password" required onChange={setLoginHandler} />
                            </div>
                            <p className="text-[#666666] font-light macScreens:text-[.6rem] md:text-[.5rem] text-[.4rem]">Must have at least 8 characters</p>
                        </div>
                        <div className="flex flex-col gap-5 md:gap-5 lg:gap-4 macScreens:gap-10 w-full">
                            <div className="macScreens:text-[.8rem] text-[#1B1F27] lg:text-[.6rem] text-[.5rem] small-mobile:text-[.6rem] md:text-[1rem] font-Nunito flex justify-between w-full">
                                <div className="macScreens:text-[.8rem] text-[#1B1F27] lg:text-[.6rem] w-full">
                                    <TermsCond id="radioButton" name="myRadio" labelText="Remember Me" termsLink="#" radioChecked={(checked) => setRememberMe(checked)} />
                                </div>
                                <div className="w-full flex justify-end">
                                    <NavLink to="/seller/auth/forgot-password" className="text-[#00753E] macScreens:text-[1rem] lg:text-[.8rem] md:text-[.8rem] text-[.5rem]">Forgot Password?</NavLink>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 md:gap-5 lg:gap-2 macScreens:gap-2">
                                <CustomButton className="my-custom-button" text="Sign In" onClick={() => handleLogin(login)} />

                                <CustomLink className="my-custom-link" text="Don't have an account?" href="/seller/auth/sign-up" SignInSignUp="Sign Up" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default SellerSignIn;