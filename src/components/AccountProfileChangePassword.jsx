import { useState } from "react";

import InputField from "./InputFieldComponents";
import CustomButton from "./CustomButton";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "../utils/constants";
import { sellerChangePassword } from "../api";
import { appStore, authStore } from "../store";

const AccountProfileChangePassword = () => {

    const auth = authStore(state => state);

    const [passwords, setPasswords] = useState({ 
        password: '', 
        newPassword: '', 
        rewritePassword: '' 
    });

    const setPasswordsHandler = (e) => {
        const { name, value } = e.target;
        setPasswords(prevState => ({ ...prevState, [name]: value }));
    }


    const handlePasswordUpdate = async (data) => {
        try {
            if (!data.password) throw Error('Current Password is required');
            if (!data.newPassword) throw Error('New Password is required');
            if (!data.rewritePassword) throw Error('Re-enter New Password is required');
            if (data.newPassword !== data.rewritePassword) throw Error('Passwords do not match');

            await sellerChangePassword(data).then(response => {
                if (!response.success) throw Error(response.message);
                toast(response.message, toastSuccess);
            });
        } catch (e) {
            console.log(e.message);
            if (e.message === 'jwt expired') {
                auth.logout();
            }
            toast(e.message, toastError);
        }
    }


    return ( 
        <div>
            <div className="w-full grid grid-cols-1 gap-7 pe-5 md:pe-0">
                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem] relative">
                    <InputField label="Current Password" name="password" placeholder="Enter your password..." type="password" required onChange={setPasswordsHandler} />
                </div>
                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem] relative">
                    <InputField label="New Password" name="newPassword" placeholder="Enter your password..." type="password" required onChange={setPasswordsHandler} />
                </div>
                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem] relative">
                    <InputField label="Re-enter New Password" name="rewritePassword" placeholder="Enter your password..." type="password" required onChange={setPasswordsHandler} />
                </div>
            </div>
            <CustomButton buttonText="Update Password" btnClassName='mt-[1rem] w-[90%] lg:w-[50%] lg:text-[1rem] text-[.8rem] text-[#fff] bg-[#00753E] hover:bg-[#0a1b13]' onClick={() => handlePasswordUpdate(passwords)} />
        </div>
     );
}
 
export default AccountProfileChangePassword;