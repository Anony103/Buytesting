
import { CustomButton, CustomButton2 } from "../components/SignUpSignInComponent";
import React, { useEffect, useState } from 'react';
import OTPInput from "otp-input-react";
import { validateOTP, sendOTP } from "../api";
import toast from 'react-hot-toast';
import { toastError, toastSuccess } from "../utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { appStore } from "../store";


const EmailVerification = () => {
    const [otp, setOTP] = useState("");
    const loader = appStore(state => state);
    const navigate = useNavigate();
    const location = useLocation();
    const [email] = useState(location.state?.email || "");


    useEffect(() => {
        if (!email) navigate(-1);
    }, [email, navigate]);


    const handleValidateOTP = async (data) => {
        try {
            if (!data) throw Error('OTP code is required');
            if (data.length < 6) throw Error('6 digits are required');
            loader.startLoader();

            await validateOTP({
                email:email,
                otp:otp
            }).then(async response => {
                // if (!response.success) throw Error(response.message);
                toast(response.message, toastSuccess);
                navigate("/auth/sign-in");
                loader.stopLoader();
            });
        } catch (e) {
            loader.stopLoader();
            toast(e.message, toastError);
        }
    }

    const handleResendOTP = async (data) => {
        try {
            loader.startLoader();
            await sendOTP(data).then(response => {
                if (!response.success) throw Error(response.message);
                if (response.success) {
                    toast(response.message, toastSuccess);
                }
                loader.stopLoader();
            });
        } catch (e) {
            loader.stopLoader();
            toast(e.message, toastError);
        }
    }


    return ( 
        <section className="w-full h-[100vh] bg-white lg:bg-authBg bg-no-repeat bg-cover lg:py-[5rem] flex justify-center lg:items-center font-Lexend">
            <div className="windowScreen:w-[36%] lg:w-[45%] xl:w-[35%] w-[90%] bg-[#FFF] py-[3rem] macScreens:py-[4rem] lg:py-[3rem] macScreens:px-[3rem] lg:px-[2rem] rounded-[5px]">
            <form className="w-full flex flex-col items-center gap-5 lg:gap-5 text-[#000]">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="font-semibold lg:text-[1.3rem] macScreens:text-[1.5rem] md:text-[1.5rem]">Email Verification</h1>
                    <h3 className="font-light font-Nunito text-[.6rem] md:text-[1rem] lg:text-[.8rem] macScreens:text-[1rem]">Enter the code sent to your email.</h3>
                </div>
                    <OTPInput value={otp} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false}
                        inputStyles={{width:'45px', height: '43px', margin:"0 7px", borderColor:"#848484"}}
                        inputClassName="input macScreens:text-[20px] lg:text-[1.5rem] macScreens:w-[55px] macScreens:h-[60px] lg:w-[50px] lg:h-[55px] rounded-[5px] border-[1px] border-[#848484] focus:border-[#848484] border-2 border-solid focus:ring-[0.8px] focus:ring-[#43aa56] focus:background-[red] select-none"
                    />
                 <div className="w-[70%]">
                    <CustomButton text="Verify Email" onClick={() => handleValidateOTP({email, otp})} />
                 </div>
                <CustomButton2 text="Didn't receive any code?" SignInSignUp="Resend" onClick={() => handleResendOTP({email})} />
            </form>
            </div>
        </section>
     );
}
 
export default EmailVerification;