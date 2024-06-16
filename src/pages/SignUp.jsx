import InputField from "../components/InputFieldComponents";
import TermsCond from "../components/TermsConditionsComponent";
import { CustomButton, CustomLink, Separator, SocialButton } from '../components/SignUpSignInComponent';
import { buyerSignup, sendOTP } from "../api";
import { useState } from "react";
import toast from 'react-hot-toast';
import { isEmailValid, isPasswordValid, isPhoneNumber } from "../utils/helpers";
import { toastError, toastSuccess } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { appStore } from "../store";


const SignUp = () => {
    const navigate = useNavigate();
    const [signup, setSignup] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });
    const [tnc, setTnc] = useState(false);
    const loader = appStore(state => state);

    const setSignupHandler = (e) => {
        const { name, value } = e.target;
        setSignup(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSignup = async (data) => {
        try {
            if (!data.firstName) throw Error('First Name is required');
            if (!data.lastName) throw Error('Last Name is required');
            if (!data.email) throw Error('Email is required');
            if (!isEmailValid(data.email)) throw Error('Invalid email address');
            if (!data.phoneNumber) throw Error('Phone number is required');
            if (!isPhoneNumber(data.phoneNumber)) throw Error('Invalid phone number');
            if (!data.password) throw Error('Password is required');
            if (!isPasswordValid(data.password)) throw Error('Password must be at least 8 characters');
            if (!tnc) throw Error("You've not accept terms and condition");
            loader.startLoader();
            await buyerSignup(data).then(async response => {
                navigate("/auth/email-verification", { state: { email: data.email } });
                if (!response.success) throw Error(response.message);
                if (response.success) {
                }
                loader.stopLoader();
            });
        } catch (e) {
            loader.stopLoader();
            toast(e.message, toastError);
        }
    }

    return (
        <section className="w-full h-[100vh] bg-white lg:bg-authBg bg-no-repeat bg-cover lg:py-[5rem] flex justify-center items-center font-Lexend">
            <div className="windowScreen:w-[36%] lg:w-[45%] xl:w-[35%] md:w-[70%] w-[95%] bg-[#FFF] macScreens:py-[4rem] py-[2rem] md:py-[3rem] macScreens:px-[4rem] px-[1rem] md:px-[4rem] lg:px-[4rem] rounded-[5px] macScreens:scale-[85%] lg:scale-[80%] large-mobile:scale-[100%] lg:scale-y-[70%] windowScreen:scale-y-[70%] large-desktop:scale-y-[90%]">
                <div className="w-full flex flex-col items-center gap-4 lg:gap-5 text-[#000]">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="font-semibold text-[.8rem] small-mobile:text-[1rem] md:text-[1.3rem] macScreens:text-[1.5rem]">Let's get you Started!</h1>
                        <h3 className="font-light font-Nunito text-[.5rem] small-mobile:text-[.6rem] md:text-[.8rem] macScreens:text-[1rem]">Create an account, start shopping.</h3>
                    </div>
                    <div className="flex flex-col gap-3 lg:gap-4 w-full">
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="First Name" name="firstName" placeholder="Enter your first name here..." type="text" required onChange={(e) => setSignupHandler(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="Last Name" name="lastName" placeholder="Enter your last name here..." type="text" required onChange={(e) => setSignupHandler(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="Email Address" name="email" placeholder="Enter your email address here..." type="email" required onChange={(e) => setSignupHandler(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="Phone Number" name="phoneNumber" placeholder="Enter your phone number here..." type="tel" required onChange={(e) => setSignupHandler(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem] relative">
                            <InputField label="Password" name="password" placeholder="Enter your password..." type="password" required onChange={(e) => setSignupHandler(e)} />
                        </div>
                        <p className="text-[#666666] font-light macScreens:text-[.8rem] md:text-[.5rem] text-[.4rem]">Must have at least 8 characters</p>
                    </div>
                    <div className="flex flex-col gap-5 md:gap-5 lg:gap-4 macScreens:gap-10 w-full">
                        <div className="macScreens:text-[.8rem] text-[#1B1F27] lg:text-[.6rem]">
                            <TermsCond id="radioButton" name="myRadio" labelText="I agree with the" termsLink="#" termsCondText="Terms & Conditions" radioChecked={(checked) => setTnc(checked)} />
                        </div>
                        <div className="flex flex-col gap-2 md:gap-5 lg:gap-2 macScreens:gap-2">
                            <CustomButton className="my-custom-button" text="Sign Up" onClick={() => handleSignup(signup)}/>

                            <CustomLink className="my-custom-link" text="Already have an account?" href="/auth/sign-in" SignInSignUp="Sign In" />

                            <Separator />

                            <SocialButton
                                className="my-social-button"
                                text="Sign Up with Google"
                                iconSrc="/public/img/google.png"
                                alt="Google"
                                onClick={() => console.log('Sign Up with Google clicked')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
  );
}
 
export default SignUp;