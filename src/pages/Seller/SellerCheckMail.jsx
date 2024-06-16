import { useEffect, useState } from 'react';
import UnreadEmail from '../../assets/mark_email_unread.png'
import { CustomButton2 } from '../../components/SignUpSignInComponent';
import { NavLink } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import { sellerResendOTP } from '../../api';
import { appStore } from '../../store';
import { toastError, toastSuccess } from '../../utils/constants';
import toast from "react-hot-toast";

const SellerCheckMail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email] = useState(location.state?.email || "");
    const loader = appStore(state => state);

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
                <div className="w-full macScreens:py-[4rem] lg:py-[3rem] macScreens:px-[4rem] lg:px-[3rem] rounded-[5px] flex justify-center">
                    <div className="windowScreen:w-[95%] lg:w-[95%] xl:w-[95%] w-full bg-[#FBFBFB] flex flex-col lg:justify-center items-center macScreens:gap-[2rem] lg:gap-[1.2rem] windowScreen:gap-[1.5rem] gap-5 macScreens:py-[4rem] lg:py-[2rem] py-[2rem] macScreens:px-[4rem] lg:px-[4rem] rounded-[5px] relative">
                        {/* go back */}
                        <div className="absolute top-5 left-5 cursor-pointer" onClick={() => navigate(-1)}>
                            <i className='bx bx-arrow-back text-[2rem]'></i>
                        </div>
                        <div className="macScreens:w-[10%] lg:w-[7%] md:w-[10%] w-[13%]">
                            <img className="w-full" src={UnreadEmail} alt="" />
                        </div>
                        <h1 className="text-[#161616] text-[1rem]  md:text-[1.5rem] lg:text-[1rem] macScreens:text-[1.5rem] font-semibold">Check your Email</h1>
                        <div className="flex flex-col items-center justify-center text-[#161616] lg:text-[.8rem] macScreens:text-[1rem] md:text-[1rem] text-[.6rem] font-Nunito">
                            <p>We've sent instructions on how to reset your</p>
                            <p>password to <span className="font-semibold">{location.state?.email}</span></p>
                        </div>
                        <CustomButton2 text="Didn't receive the email?" href="" SignInSignUp="Resend" onClick={() => handleResendOTP({ email })} />
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default SellerCheckMail;