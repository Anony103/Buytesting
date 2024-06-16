import AccountImg from '../assets/account-img.png'
import SignOutButton from './ProfileSignOutButton';
import CustomButton from './CustomButton';
import AccountProfileComponent from './AccountProfileComponent';
import AccountProfileChangePassword from './AccountProfileChangePassword';
import { useEffect, useState } from 'react';
import { appStore, authStore } from '../store';
import InputField from './InputFieldComponents';
import toast from 'react-hot-toast';
import { toastError, toastSuccess } from '../utils/constants';
import { buyerChangePassword, buyerUpdateProfile, getUserDetails } from "../api";

const AccountComponent = () => {
    const auth = authStore(state => state);
    const app = appStore(state => state);
    const [showPasswordChange] = useState(false);
    const { firstname, lastname, email, phone } = auth?.user;
    const [user, setUser] = useState({ firstname, lastname, email, phone});

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (auth.user?.token) {
                try {
                    const response = await getUserDetails(auth.user.token);
                    setUser(response);
                } catch (error) {
                    console.error("Failed to fetch user details", error);
                    if (error.response && error.response.status === 401) {
                        toast.error("Session expired. Please log in again.", toastError);
                        auth.logout();
                    } else {
                        toast.error("Failed to fetch user details. Please try again.", toastError);
                    }
                }
            }
        };

        fetchUserDetails();
    }, [auth.user?.token]);


    const handleUserChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleUpdate = () => {
        if (JSON.stringify(user) === JSON.stringify({ firstname, lastname, email, phone })) {
            console.log('user object has not changed');
            toast("Details already up to date", toastSuccess);
            return
        }

        let diff = Object.keys(user).reduce((result, key) => {
            if (user[key] !== auth.user[key]) {
                result[key] = user[key];
            }
            return result;
        }, {});

        app.startLoader();
        buyerUpdateProfile(diff, {
            Authorization: `Bearer ${auth.user.token}`
        }).then((res) => {
            console.log(res);
            auth.login({...auth.user, ...diff});
            toast("Profile Updated Successfully", toastSuccess);
        }).catch((err) => {
            console.log(err);
            console.log(err.message);
            if (err.message === 'jwt expired') {
                auth.logout();
            }
            toast.error("An error occurred, please try again",toastError);
        }).finally(() => {
            app.stopLoader();
        });
    }


    const [passwords, setPasswords] = useState({currentPassword: '', newPassword: '', confirmNewPassword: ''});
    const handlePasswordChange = (e) => {
        setPasswords({...passwords, [e.target.name]: e.target.value});
    }
    
    const handlePasswordUpdates = () => {
        if (Object.values(passwords).some(val => val === '')) {
            toast.error("All passwords fields are required", toastError);
            return;
        }
        if (passwords.newPassword !== passwords.confirmNewPassword) {
            toast.error("Passwords do not match", toastError);
            return;
        }

        app.startLoader();
        buyerChangePassword(passwords,{
            Authorization: `Bearer ${auth.user.token}`
        }).then((res) => {
            if(res.status != 200){
                throw new Error(res.message);
            }
            toast(res.message, toastSuccess);
        }).catch((err) => {
            console.log(err.message);
            if (err.message === 'jwt expired') {
                auth.logout();
            }
            toast.error(err.message || "An error occurred, please try again", toastError);
        }).finally(() => {
            app.stopLoader();
        });
    }

    useEffect(() => {
        app.closeModal()
    }, []);
    return ( 
        <div className="w-full grid grid-cols-1 lg:grid-cols-7 gap-y-[1rem] lg:gap-y-0">
            <div className="lg:col-span-2 flex justify-center">
                <div className="w-[97%] lg:w-[70%] h-[50%] flex flex-col gap-2 bg-[#FBFBFB] pt-[1.5rem] rounded-[5px]">
                    <div className="border-b-2 border-b-[#E8E8E8] pb-1 hidden lg:block">
                        <h1 className='ps-5 font-medium lg:text-[1rem] text-[.8rem]'>My Account</h1>
                    </div>
                    <div className="flex lg:flex-col gap-2 md:gap-x-5 lg:justify-center items-center py-5 lg:py-[3rem] w-full border-b-2 border-b-[#E8E8E8] lg:border-b-none">
                        <div className="w-[50%] md:w-[30%] lg:w-[60%] relative">
                            <img className='w-full' src={AccountImg} alt="" />
                            <i class='bx bx-camera text-[1.5rem] absolute bottom-0 right-0 py-2 px-2 rounded-[150px] cursor-pointer bg-[#E8E8E8]'></i>
                        </div>
                        <p className='font-medium text-[#000] text-[.7rem] md:text-[1.5rem] lg:text-[1rem]'>Hello, <br className='lg:hidden' />{`${user.firstName} ${user.lastName}`}</p>
                    </div>
                    <div className="lg:flex flex-col justify-center items-center gap-5 w-full hidden">
                        <CustomButton buttonText="Deactivate Account" className='w-[80%] lg:text-[.7rem] text-[.8rem] text-red-600 border-4 border-red-600 hover:bg-transparent' />
                        <SignOutButton className='lg:text-[.7rem] text-[.8rem] w-[80%] px-0' onClick={() => auth.logout()}/>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-5 bg-[#FBFBFB] lg:pb-[5em]">
                <div className="w-full flex flex-col gap-7 py-[1.5rem] rounded-[5px]">
                    <div className="border-b-2 border-b-[#E8E8E8] pb-1">
                        <h1 className='ps-5 font-semibold text-[#000] lg:text-[1rem] md:text-[1rem] text-[.8rem]'>Profile</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 px-5">
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField value={user.firstName} label="First Name" name="firstname" placeholder="Enter your first name here..." type="text" required onChange={(e) => handleUserChange(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField value={user.lastName} label="Last Name" name="lastname" placeholder="Enter your last name here..." type="text" required onChange={(e) => handleUserChange(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField value={user.email} label="Email Address" name="email" placeholder="Enter your email address here..." type="email" required onChange={(e) => handleUserChange(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                            <InputField value={user.phoneNumber} label="Phone Number" name="phone" placeholder="Enter your phone number here..." type="tel" required onChange={(e) => handleUserChange(e)} />
                        </div>
                    </div>
                    <CustomButton buttonText="Update Profile" className='px-5 ms-5 w-[80%] md:w-[40%] lg:w-[20%] lg:text-[1rem] text-[.8rem] text-white bg-[#00753E] hover:bg-[#0a1b13]' bgColor={"#00753E"} onClick={() => handleUpdate()} />
                </div>
                <div className="lg:flex flex-col gap-7 ps-5 w-full lg:w-[60%] mt-[2rem] hidden">
                    <div className="">
                        <h1 className='font-semibold lg:text-[1rem] text-[.8rem]'>Change Password</h1>
                    </div>
                    <div className="w-full grid grid-cols-1 gap-7 pe-5 md:pe-0">
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem] relative">
                            <InputField label="Current Password" name="currentPassword" value="" placeholder="Enter your password..." type="password" required onChange={(e) => handlePasswordChange(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem] relative">
                            <InputField label="New Password" name="newPassword" value="" placeholder="Enter your password..." type="password" required onChange={(e) => handlePasswordChange(e)} />
                        </div>
                        <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2 macScreens:text-[1rem] lg:text-[.8rem] relative">
                            <InputField label="Re-enter New Password" name="confirmNewPassword" value="" placeholder="Enter your password..." type="password" required onChange={(e) => handlePasswordChange(e)} />
                        </div>
                    </div>
                    <CustomButton buttonText="Update Password" className='w-[90%] lg:w-[37%] lg:text-[1rem] text-[.8rem] hover:bg-[#0a1b13]' bgColor={"#00753E"} color={"#ffffff"} onClick={() => handlePasswordUpdates()} />
                </div>
            </div>
            <div className="w-full">
                <div className="flex flex-col justify-center items-center gap-5 w-full lg:hidden">
                    <CustomButton buttonText="Deactivate Account" className='w-[80%] lg:text-[.7rem] text-[.8rem] text-red-600 border-4 border-red-600 hover:bg-transparent' />
                    <SignOutButton className='lg:text-[.7rem] text-[.8rem] w-[80%] px-0'/>
                </div>
            </div>
        </div>
     );
}
 
export default AccountComponent;