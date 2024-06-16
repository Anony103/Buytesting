import { CustomButton } from "../../components/SignUpSignInComponent";
import InputField from "../../components/InputFieldComponents";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { appStore } from "../../store";
import { sendResetPasswordLink } from "../../api";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "../../utils/constants";
import { isEmailValid } from "../../utils/helpers";

const AgentForgotPassword = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const loader = appStore(state => state);

    const handlePasswordResetLink = async (data) => {
        try {
            if (!email) throw Error('Email is required');
            if (!isEmailValid(email)) throw Error('Invalid email address');
            loader.startLoader();
            await sendResetPasswordLink({email: data}).then(response => {
                if (!response.success) throw Error(response.message);
                if (response.success) {
                    toast(response.message, toastSuccess);
                }
                navigate("/auth/check-mail" , { state: { email: email } });
                loader.stopLoader();
            });
        } catch (e) {
            loader.stopLoader();
            toast(e.message, toastError);
        }
    }

    return ( 
        <section className="w-full h-[100vh] bg-white bg-no-repeat bg-cover lg:py-[5rem] flex justify-center lg:items-center font-Lexend">
            <div className="windowScreen:w-[36%] lg:w-[45%] xl:w-[35%] md:w-[80%] w-[95%] bg-[#FBFBFB] shadow-lg py-[2rem] macScreens:py-[4rem] macScreens:pb-[7rem] lg:py-[3rem] macScreens:px-[4rem] lg:px-[4rem] rounded-[5px]">
            <div className="w-full flex flex-col items-center gap-10 lg:gap-10 text-[#000] px-1">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="font-semibold text-[1rem] md:text-[1.3rem] macScreens:text-[1.5rem]">Forgot Password</h1>
                    <h3 className="font-light font-Nunito text-[.6rem] md:text-[.8rem] macScreens:text-[1rem]">Don't freak out, we'll send you reset instructions.</h3>
                </div>
                <div className="flex flex-col w-full">
                    <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField label="Email Address" name="email" placeholder="abcd@gmail.com" type="email" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-5 pt-5 ">
                                <CustomButton text="Reset Password" onClick={() => handlePasswordResetLink(email)} />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
     );
}
 
export default AgentForgotPassword;