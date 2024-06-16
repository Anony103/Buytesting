import { useLocation, useNavigate } from 'react-router-dom';
import UnreadEmail from '../../assets/mark_email_unread.png'
import { CustomButton2 } from '../../components/SignUpSignInComponent';
import { useEffect, useState } from 'react';
import { appStore } from '../../store';
import toast from 'react-hot-toast';
import { toastError, toastSuccess } from '../../utils/constants';
import { sendResetPasswordLink } from '../../api';
const AdminCheckMail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email] = useState(location.state?.email || "");
    const loader = appStore(state => state);

    const handleResendPasswordResetLink = async (data) => {
        try {
            loader.startLoader();
            await sendResetPasswordLink(data).then(response => {
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
        <section className="w-full h-[100vh] bg-white bg-no-repeat bg-cover lg:py-[5rem] flex justify-center items-center font-Lexend">
            <div className="windowScreen:w-[36%] lg:w-[45%] xl:w-[35%] w-[90%] bg-[#FBFBFB] shadow-lg flex flex-col justify-center items-center macScreens:gap-[2rem] lg:gap-[1.2rem] windowScreen:gap-[1.5rem] gap-2 macScreens:py-[2.5rem] lg:py-[2rem] py-[3rem] macScreens:px-[4rem] lg:px-[4rem] rounded-[5px]">
                <div className="macScreens:w-[10%] lg:w-[7%] md:w-[10%] w-[13%]">
                    <img className="w-full" src={UnreadEmail} alt="" />
                </div>
                <h1 className="text-[#161616] text-[1rem]  md:text-[1.5rem] lg:text-[1rem] macScreens:text-[1.5rem] font-semibold">Check your Email</h1>
                <div className="flex flex-col items-center justify-center text-[#161616] lg:text-[.8rem] macScreens:mt-[-2rem] macScreens:text-[1rem] md:text-[1rem] text-[.6rem] font-Nunito">
                    <p>We've sent instructions on how to reset your</p>
                    <p>password to <span className="font-semibold">{email}</span></p>
                </div>
                <CustomButton2 text="Didn't receive the email?" SignInSignUp="Resend" onClick={() => handleResendPasswordResetLink({ email })} />
            </div>
        </section>
     );
}
 
export default AdminCheckMail;