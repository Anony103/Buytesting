import { useEffect, useState } from "react";
import DynamicInputComponent from "../../components/EmailVeriDynamicInputComponent";
import { CustomButton, CustomButton2 } from "../../components/SignUpSignInComponent";
import { appStore } from "../../store";
import { sellerResendOTP, sellerVerifyAccount } from "../../api";
import { toastError, toastSuccess } from '../../utils/constants';
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import OTPInput from "otp-input-react";


const SellerEmailVerification = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [email] = useState(location.state?.email || "");
    const loader = appStore(state => state);
    const [otp, setOTP] = useState("");

    const handleValidateOTP = async (data) => {
        try {
            if (!data.otp) throw Error('OTP code is required');
            if (data.otp.length < 6) throw Error('6 digits are required');
            if (!data.email) navigate(-1);
            loader.startLoader();
            await sellerVerifyAccount(data).then(async response => {
                if (!response.success) throw Error(response.message);
                if (response.success) {
                    toast(response.message, toastSuccess);
                    setTimeout(() => {
                        navigate("/seller/auth/sign-in");
                    }, 3000);
                }
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
            await sellerResendOTP(data).then(response => {
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

    useEffect(() => {
        if (!email) navigate(-1);
    }, [email, navigate]);

    return ( 
        <section className="w-full h-[100vh] bg-authBg bg-no-repeat bg-cover flex justify-between items-center font-Lexend">
            <div className="w-[50%] h-full bg-authBg bg-no-repeat bg-cover hidden lg:block"></div>
            <div className="windowScreen:w-[50%] lg:w-[50%] xl:w-[50%] w-full bg-[#FFF] h-[100vh] flex justify-center lg:items-center">
                <div className="w-full macScreens:py-[4rem] lg:py-[3rem] macScreens:px-[4rem] lg:px-[3rem] rounded-[5px] flex justify-center lg:items-center">
                    <form className="macScreens:min-w-[80%] lg:min-w-[85%] w-[90%] bg-[#FBFBFB] macScreens:py-[4rem] py-8 lg:py-[2rem] px-4 flex flex-col items-center gap-3 lg:gap-5 text-[#000]">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="font-semibold lg:text-[1.3rem] macScreens:text-[1.5rem] md:text-[1.5rem]">Email Verification</h1>
                            <h3 className="font-light font-Nunito text-[.6rem] md:text-[1rem] lg:text-[.8rem] macScreens:text-[1rem]">Enter the code sent to your email <span className="font-semibold">{email}</span>.</h3>
                        </div>
                        <OTPInput value={otp} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false}
                            inputStyles={{ width: '45px', height: '43px', margin: "0 7px", borderColor: "#848484" }}
                            inputClassName="input macScreens:text-[20px] lg:text-[1.5rem] macScreens:w-[55px] macScreens:h-[60px] lg:w-[50px] lg:h-[55px] rounded-[5px] border-[1px] border-[#848484] focus:border-[#848484] border-2 border-solid focus:ring-[0.8px] focus:ring-[#43aa56] focus:background-[red] select-none"
                        />
                        <div className="w-[80%] md:w-[30%] lg:w-[80%]">
                            <CustomButton text="Verify Email" onClick={() => handleValidateOTP({ email, otp })} />
                        </div>
                        <CustomButton2 text="Didn't receive any code?" href="" SignInSignUp="Resend" onClick={() => handleResendOTP({ email })} />
                    </form>
                </div>
            </div>
        </section>
     );
}
 
export default SellerEmailVerification;