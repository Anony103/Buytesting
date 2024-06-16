import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";

const AuthButtonComponent = () => {
    const navigate = useNavigate();
    return ( 
        <div className="flex items-center gap-3">
            <NavLink to="/auth/sign-up">
                <button
                    className="font-Poppins macScreens:px-11 md:px-5 lg:px-7 px-3 py-1 md:py-3 lg:py-2 rounded-[3px] lg:rounded-[5px] lg:text-[1.1rem] text-[.8rem] hover:bg-[#0c2218] transition-all hover:duration-700"
                    style={{ backgroundColor: "transparent", color: "#00753E" }}
                >
                    Sign Up
                </button>
            </NavLink>
            <CustomButton bgColor="#00753E" textColor="white" buttonText="Sign In" onClick={() => {
                navigate('/auth/sign-in');
            }} />
        </div>
     );
}
 
export default AuthButtonComponent;