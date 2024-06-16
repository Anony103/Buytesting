import { CustomButton } from "../../components/SignUpSignInComponent";
import InputField from "../../components/InputFieldComponents";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateResetPasswordLink, buyerResetPassword } from "../../api";
import { appStore } from "../../store";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "../../utils/constants";
import { isPasswordValid } from "../../utils/helpers";

const AdminNewPassword = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [data, setData] = useState({ 
        hash: params.get('hash'), 
        email: params.get('email'), 
        newPassword: '', 
        confirmNewPassword: '' 
    });
    const {hash, ...newCredentials} = data;
    
    const loader = appStore(state => state);

    const handleSetNewPassword = async (data) => {
        try {
            if (!data.hash || !data.email) throw Error('Reset Password Link is invalid');
            if (!data.newPassword) throw Error('New Password is required');
            if (!isPasswordValid(data.newPassword)) throw Error('New password must be at least 8 characters');
            if (!data.confirmNewPassword) throw Error('Confirm New Password is required');
            if (data.newPassword !== data.confirmNewPassword) throw Error('Passwords do not match');
            loader.startLoader();
            console.log(data);
            await validateResetPasswordLink({email:data.email, hash: data.hash}).then(async response => {
                if (!response.success) throw Error(response.message);
                await buyerResetPassword(newCredentials).then(resetResponse => {
                    if (!resetResponse.success) throw Error(resetResponse.message);
                    toast(resetResponse.message, toastSuccess);
                    setTimeout(() => {
                        navigate("/auth/sign-in");
                        loader.stopLoader();
                    }, 3000);
                })
            });
        } catch(e) {
            loader.stopLoader();
            toast(e.message, toastError);
        }
    }


    return ( 
        <section className="w-full h-[100vh] bg-white bg-no-repeat bg-cover lg:py-[5rem] flex justify-center lg:items-center font-Lexend">
            <div className="windowScreen:w-[36%] lg:w-[45%] xl:w-[35%] md:w-[80%] w-[95%] bg-[#FBFBFB] shadow-lg py-[2rem] macScreens:py-[4rem] macScreens:pb-[7rem] lg:py-[3rem] macScreens:px-[4rem] lg:px-[4rem] rounded-[5px]">
                <form className="w-full flex flex-col items-center gap-10 lg:gap-10 text-[#000] px-1">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="font-semibold text-[1rem] md:text-[1.5rem] lg:text-[1.3rem] macScreens:text-[1.5rem]">Set New Password</h1>
                        <h3 className="font-light font-Nunito text-[.7rem] md:text-[1.2rem] lg:text-[.8rem] macScreens:text-[1rem]">Your new password must be different from</h3>
                        <h3 className="font-light font-Nunito text-[.7rem] md:text-[1.2rem] lg:text-[.8rem] macScreens:text-[1rem]">previously used passwords.</h3>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="input-box flex flex-col gap-1 lg:gap-5 macScreens:gap-5  macScreens:text-[1rem] lg:text-[.8rem]">
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Create Password" name="password" placeholder="Create your password here..." type="password" required onChange={(e) => setData({ ...data, newPassword: e.target.value })} />
                            </div>
                            <p className="text-[#666666] font-light macScreens:text-[.9rem] lg:text-[.6rem] md:text-[.7rem] text-[.4rem] lg:-mt-5">Must have at least 8 characters</p>
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                                <InputField label="Confirm Password" name="confirm-password" placeholder="Confirm your password here..." type="password" required onChange={(e) => setData({ ...data, confirmNewPassword: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-5 pt-5 ">
                                <CustomButton text="Create" onClick={() => handleSetNewPassword(data)} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
     );
}
 
export default AdminNewPassword;