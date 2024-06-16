import BusinessDisplay  from "./BusinessDisplay";
import InputField from "../components/InputFieldComponents";
import CustomButton from "../components/CustomButton";
import ProfileImage2 from "../assets/profile-img-2.png"
import blank from "../assets/dp.jpeg";
import { authStore, appStore } from "../store";
import { formatDateToLong } from "../utils/helpers";
import { sellerChangePassword, sellerUpdateProfile, sellerUpdateProfilePicture, getUserDetails  } from "../api";
import { toastError, toastSuccess, toastWarning } from "../utils/constants";
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";
import InstagramIcon from "../assets/svg/instagram.svg";
import XIcon from "../assets/svg/X.svg";
import WhatsappIcon from "../assets/svg/WhatsApp.svg";
import FacebookIcon from "../assets/svg/facebook.svg";


const ProfileInfoComponent = () => {

    
    const auth = authStore(state => state);
    const app = appStore(state => state);
    const [user, setUser] = useState([]);

    
    const userData = {
        firstname: auth.user?.firstname,
        lastname: auth.user?.lastname,
        email: auth.user?.email,
        businessAddress: auth.user?.businessAddress,
        businessName: auth.user?.businessName,
        businessPhone: auth.user?.businessPhone,
        city: auth.user?.city,
        joined: auth.user?.createdAt,
        verified: auth.user?.isVerified,
        state: auth.user?.state,
        lga: auth.user?.lga,
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (auth.user?.token) {
                try {
                    const response = await getUserDetails(auth.user.token);
                    console.log(response);
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

    const [stateUserUpdate, setStateUserUpdate] = useState({
        firstname: userData.firstname, 
        lastname: userData.lastname, 
        email: userData.email, 
        businessAddress: userData.businessAddress, 
        businessName: userData.businessName, 
        businessPhone: userData.businessPhone, 
        city: userData.city, 
        state: userData.state, 
        lga: userData.lga
     });

    const handleUserChange = (e) => {
        setStateUserUpdate({ ...stateUserUpdate, [e.target.name]: e.target.value });
    }

    const handleUpdate = () => {
        if (JSON.stringify(stateUserUpdate) === JSON.stringify(userData)) {
            toast("Details already up to date", toastSuccess);
            return;
        }

        let diff = Object.keys(stateUserUpdate).reduce((result, key) => {
            if (stateUserUpdate[key] !== userData[key]) {
                result[key] = stateUserUpdate[key];
            }
            return result;
        }, {});

        app.startLoader();
        sellerUpdateProfile(diff, {
            Authorization: `Bearer ${auth.user.token}`
        }).then((res) => {
            auth.login({ ...auth.user, ...diff });
            toast("Profile Updated Successfully", toastSuccess);
        }).catch((err) => {
            console.log(err.message);
            if (err.message === 'jwt expired') {
                auth.logout();
            }
            toast.error("An error occurred, please try again", toastError);
        }).finally(() => {
            app.stopLoader();
        });
    }

    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
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
        sellerChangePassword(passwords, {
            Authorization: `Bearer ${auth.user.token}`
        }).then((res) => {
            if (res.status != 200) {
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


    // handle profile image upload
    const [profileImage, setProfileImage] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const handleProfileImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    }

    useEffect(() => {
        if (profileImage) {
            handleProfileImageUpload(profileImage);
        }
    }, [profileImage]);

    const handleProfileImageUpload = async (image) => {
        if (!image) {
            toast.error("Please select an image to upload", toastError);
            return;
        }

        let imageData = new FormData();
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setBase64Image(reader.result);
        }
        imageData.append('image', base64Image);

        app.startLoader();
        await sellerUpdateProfilePicture(imageData, { 
            "Authorization": `Bearer ${auth.user.token}`,
            "Content-Type": "multipart/form-data" 
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error(res.message);
            }
            setProfileImage(null);
            toast("Profile Image Updated Successfully", toastSuccess);
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

    return ( 
        <div className="h-full w-full flex flex-col justify-center items-center gap-10 border-t-[3px] mt-[-3px] border-[#E8E8E8]">
            <input type="file" accept="image/*" className="hidden dp" onChange={handleProfileImageChange} />
            <BusinessDisplay 
                avatarImg={<img className="w-full h-full rounded-full" src={profileImage ? URL.createObjectURL(profileImage) : blank} alt="Profile Image" />}
                avatarSize="w-[30%] md:w-[50%]"
                title={userData.businessName}
                className="no-underline"
                verified={userData.verified}
                StoreInfoClass="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-y-0 bg-transparent macScreens:px-10 lg:px-10 py-8"
                changeAvatarImg={<i className='bx bx-camera text-[1.5rem] absolute bottom-0 right-0 py-2 px-2 rounded-[150px] cursor-pointer bg-[#E8E8E8]' onClick={() => {
                    document.querySelector('.dp').click();
                }}></i>}
                DateJoined="Date Joined:"
                DayMonth={formatDateToLong(userData.joined)}
                SocialLinksText="Business Social Media"
                SocialLinksTextClassName="text-[.5rem] md:text-[.8rem] font-Nunito font-medium text-[#4D4D4D]"
                socialLinks={[
                    { url: "#", icon: <img src={InstagramIcon} alt="" /> },
                    { url: "#", icon: <img src={XIcon} alt="" /> },
                    { url: "#", icon: <img src={WhatsappIcon} alt="" /> },
                    { url: "#", icon: <img src={FacebookIcon} alt="" /> }
                ]}
                buttons={[
                    {
                        bgColor: "#00753E",
                        text: "Show Contact",
                        icon: <i className='bx bx-phone'></i>,
                        textColor: "#fff"
                    },
                    {
                        bgColor: "#fff",
                        text: "Start chat",
                        icon: <i className='bx bx-comment-detail'></i>,
                        textColor: "#00753E",
                        borderColor: "#00753E"
                    },
                ]}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full macScreens:px-10 pb-[5rem]">
                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                    <InputField label="First Name" name="firstname" value={user.firstName} placeholder="Enter your first name here..." type="text" required onChange={(e) => handleUserChange(e)} />
                </div>
                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                    <InputField label="Last Name" name="lastname" value={user.lastName} placeholder="Enter your last name here..." type="text" required onChange={(e) => handleUserChange(e)} />
                </div>
                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                    <InputField label="Business Name" name="business-name" value={user.businessName} type="text" required onChange={(e) => handleUserChange(e)} />
                </div>
                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                    <InputField label="Business Email" name="email" value={user.email} type="email" required onChange={(e) => handleUserChange(e)} />
                    <div className="flex gap-2 lg:text-[.8rem]"><p className="text-[#8F90A6]">Want to change your email address? <button className="text-[#00753E]">Click here</button></p></div>
                </div>
                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                    <InputField label="State" name="business-name" value={user.state} type="text" required onChange={(e) => handleUserChange(e)} />
                </div>
                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                    <InputField label="LGA" name="business-name" value={user.lga} type="text" required onChange={(e) => handleUserChange(e)} />
                </div>
                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                    <InputField label="City" name="business-name" value={user.city} type="text" required onChange={(e) => handleUserChange(e)} />
                </div>
                <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                    <InputField label="Agent ID" name="phone" value="+12345" type="tel" required onChange={(e) => console.log(e)} />
                </div>
                <div className="flex flex-col gap-y-10 w-full col-span-2">
                    <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem] w-[60%]">
                        <div className="flex items-center justify-between w-full">
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]  w-[85%]">
                                <InputField label="Business Phone Number 1" name="phone" value={user.phoneNumber} type="tel" required onChange={(e) => handleUserChange(e)} />
                            </div>
                            <button
                            type="button"
                            className="mt-auto text-[#00753E] inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400"
                            data-twe-toggle="tooltip"
                            data-twe-placement="right"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                            title="Add another phone number">
                            <i className='bx bx-plus text-[1.5rem] font-bold'></i>
                            </button>
                        </div>
                        <div className="flex gap-2 lg:text-[.8rem]"><p className="text-[#8F90A6]">Want to change your Phone number? <button className="text-[#00753E]">Click here</button></p></div>
                    </div>
                    <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem] w-[80%]">
                        <div className="flex items-center justify-between w-full">
                            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]  w-[85%]">
                                <InputField label="Business Address 1" name="business-name" value={user.address} type="text" required onChange={(e) => handleUserChange(e)} />
                            </div>
                            <button
                            type="button"
                            className="mt-auto text-[#00753E] inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400"
                            data-twe-toggle="tooltip"
                            data-twe-placement="right"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                            title="Add another business address">
                            <i className='bx bx-plus text-[1.5rem] font-bold'></i>
                            </button>
                        </div>
                    </div>
                    <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem] w-[25%]">
                        <CustomButton icon={<i className='bx bx-plus'></i>} buttonText="Save Changes" btnClassName="bg-[#00753E] text-[#FBFBFB] rounded-[5px]" onClick={handleUpdate} />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ProfileInfoComponent;