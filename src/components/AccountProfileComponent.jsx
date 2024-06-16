import InputField from "./InputFieldComponents";

const AccountProfileComponent = () => {
    return ( 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 px-5">
            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                <InputField label="First Name" name="firstname" placeholder="Enter your first name here..." type="text" required onChange={(e) => console.log(e)} />
            </div>
            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                <InputField label="Last Name" name="lastname" placeholder="Enter your last name here..." type="text" required onChange={(e) => console.log(e)} />
            </div>
            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                <InputField label="Email Address" name="email" placeholder="Enter your email address here..." type="email" required onChange={(e) => console.log(e)} />
            </div>
            <div className="input-box flex flex-col gap-1 lg:gap-2 macScreens:gap-2  macScreens:text-[1rem] lg:text-[.8rem]">
                <InputField label="Phone Number" name="phone" placeholder="Enter your phone number here..." type="tel" required onChange={(e) => console.log(e)} />
            </div>
        </div>
     );
}
 
export default AccountProfileComponent;