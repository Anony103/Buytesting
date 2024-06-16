
// import { CustomButton, CustomButton2 } from "../../components/SignUpSignInComponent";
// import React, { useEffect, useState } from 'react';
// import OTPInput from "otp-input-react";
// import { validateOTP, sendOTP } from "../../api";
// import toast from 'react-hot-toast';
// import { toastError, toastSuccess } from "../../utils/constants";
// import { useNavigate, useLocation } from "react-router-dom";
// import { appStore } from "../../store";


// const AgentSellersEmailVerification = () => {
//     const [otp, setOTP] = useState("");
//     const loader = appStore(state => state);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [email] = useState(location.state?.email || "");


//     useEffect(() => {
//         if (!email) navigate(-1);
//     }, [email, navigate]);


//     const handleValidateOTP = async (data) => {
//         try {
//             if (!data) throw Error('OTP code is required');
//             if (data.length < 6) throw Error('6 digits are required');
//             loader.startLoader();
//             await validateOTP(data).then(async response => {
//                 if (!response.success) throw Error(response.message);
//                 if (response.success) {
//                     toast(response.message, toastSuccess);
//                     setTimeout(() => {
//                         navigate("/auth/sign-in");
//                     }, 3000);
//                 }
//                 loader.stopLoader();
//             });
//         } catch (e) {
//             loader.stopLoader();
//             toast(e.message, toastError);
//         }
//     }

//     const handleResendOTP = async (data) => {
//         try {
//             loader.startLoader();
//             await sendOTP(data).then(response => {
//                 if (!response.success) throw Error(response.message);
//                 if (response.success) {
//                     toast(response.message, toastSuccess);
//                 }
//                 loader.stopLoader();
//             });
//         } catch (e) {
//             loader.stopLoader();
//             toast(e.message, toastError);
//         }
//     }


//     return ( 
//         <section className="w-full h-[100vh] bg-white bg-no-repeat bg-cover lg:py-[5rem] flex justify-center lg:items-center font-Lexend">
//             <div className="windowScreen:w-[36%] lg:w-[45%] xl:w-[35%] w-[90%] bg-[#FBFBFB] shadow-lg py-[3rem] macScreens:py-[4rem] lg:py-[3rem] macScreens:px-[3rem] lg:px-[2rem] rounded-[5px]">
//                 <form className="w-full flex flex-col items-center gap-5 lg:gap-5 text-[#000]">
//                     <div className="flex flex-col justify-center items-center">
//                         <h1 className="font-semibold lg:text-[1.3rem] macScreens:text-[1.5rem] md:text-[1.5rem]">Email Verification</h1>
//                         <h3 className="font-light font-Nunito text-[.6rem] md:text-[1rem] lg:text-[.8rem] macScreens:text-[1rem]">Enter the 6 digits code sent to this email address</h3>
//                         <div className="flex items-center gap-2 font-Nunito text-[.6rem] md:text-[1rem] lg:text-[.8rem] macScreens:text-[1rem] text-[#161616] font-extrabold"><h1>helenchinweike@gmail.com.</h1> <button className="text-[#00753E] flex items-center gap-1 font-extralight"><i class='bx bx-edit'></i> Edit</button></div>
//                     </div>
//                         <OTPInput value={otp} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false}
//                         inputStyles={{width:'45px', height: '43px', margin:"0 7px", borderColor:"#848484"}}
//                         inputClassName="input macScreens:text-[20px] lg:text-[1.5rem] macScreens:w-[55px] macScreens:h-[60px] lg:w-[50px] lg:h-[55px] rounded-[5px] border-[1px] border-[#848484] focus:border-[#848484] border-2 border-solid focus:ring-[0.8px] focus:ring-[#43aa56] focus:background-[red] select-none"
//                     />
//                     <div className="w-[70%]">
//                         <CustomButton text="Verify Email" onClick={() => handleValidateOTP({email, otp})} />
//                     </div>
//                     <CustomButton2 text="Didn't receive any code?" SignInSignUp="Resend" onClick={() => handleResendOTP({email})} />
//                 </form>
//             </div>
//         </section>
//      );
// }
 
// export default AgentSellersEmailVerification;










import { CustomButton, CustomButton2 } from "../../components/SignUpSignInComponent";
import React, { useEffect, useState } from 'react';
import OTPInput from "otp-input-react";
import { validateOTP, sendOTP } from "../../api";
import toast from 'react-hot-toast';
import { toastError, toastSuccess } from "../../utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { appStore } from "../../store";
import { authStore } from "../../store";
import NavbarDashboard from "../../components/NavbarDashboard";

const AgentSellersEmailVerification = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);


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
            await validateOTP(data).then(async response => {
                if (!response.success) throw Error(response.message);
                if (response.success) {
                    toast(response.message, toastSuccess);
                    setTimeout(() => {
                        navigate("/auth/sign-in");
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






    

    useEffect(() => {
        app.startLoader();
        setTimeout(() => {
            app.stopLoader();
        }, 3000);
    }, [auth.user]);
    return ( 
        <section className="overflow-x-hidden w-full flex flex-col items-center macScreens:gap-5 lg:gap-3 gap-2 pb-[3rem]">
            <NavbarDashboard navbarClassName="w-full" token={!!auth.user?.token} />
            <div className="flex justify-center items-center w-full h-[85vh] mt-[5.5rem]">
                <div className="windowScreen:w-[36%] lg:w-[45%] xl:w-[35%] w-[90%] bg-[#FBFBFB] shadow-lg py-[3rem] macScreens:py-[4rem] lg:py-[3rem] macScreens:px-[3rem] lg:px-[2rem] rounded-[5px]">
                    <form className="w-full flex flex-col items-center gap-5 lg:gap-5 text-[#000]">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="font-semibold lg:text-[1.3rem] macScreens:text-[1.5rem] md:text-[1.5rem]">Email Verification</h1>
                            <h3 className="font-light font-Nunito text-[.6rem] md:text-[1rem] lg:text-[.8rem] macScreens:text-[1rem]">Enter the 6 digits code sent to this email address</h3>
                            <div className="flex items-center gap-2 font-Nunito text-[.6rem] md:text-[1rem] lg:text-[.8rem] macScreens:text-[1rem] text-[#161616] font-extrabold"><h1>helenchinweike@gmail.com.</h1> <button className="text-[#00753E] flex items-center gap-1 font-light"><i class='bx bx-edit'></i> Edit</button></div>
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
            </div>
        </section>
     );
}
 
export default AgentSellersEmailVerification;