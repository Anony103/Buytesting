import { NavLink } from "react-router-dom";
import { appStore, authStore } from "../store";
import Modal from './ModalComponent';

const DashboardProfileHeader = ({HeaderClass, AcctImg, AcctName, AcctType}) => {

    const app = appStore(state => state);
    const auth = authStore(state => state);
    const fullName = auth.user.firstName + ' ' + auth.user.lastName;

    return ( 
        <>
            <div className={`${HeaderClass}`}>
                <div className="lg:w-[45px] lg:h-[45px] md:w-[35px] md:h-[35px] w-[25px] h-[25px] rounded-[100%] cursor-pointer" onClick={() => app.openModal()}>
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="24" height="27" viewBox="0 0 24 27" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.4063 10.8771C5.4063 8.35325 7.90855 5.54079 11.4986 5.54079C15.0886 5.54079 17.5909 8.35325 17.5909 10.8771C17.5909 13.0126 18.1836 13.9997 18.7074 14.8708C19.1275 15.5703 19.4593 16.1229 19.4624 17.257C19.2919 19.2158 17.973 20.279 11.4986 20.279C4.98824 20.279 3.70938 19.261 3.53784 17.3237C3.53784 16.1229 3.86962 15.5703 4.28975 14.8708C4.81361 13.9997 5.4063 13.0126 5.4063 10.8771ZM2.00001 17.3895C2.3544 21.4808 6.69531 21.8197 11.4985 21.8197C16.3016 21.8197 20.6415 21.4808 21 17.3237C21 15.6966 20.4833 14.8359 20.0272 14.0778C19.566 13.3094 19.1315 12.5853 19.1315 10.8771C19.1315 7.55614 16.0643 4 11.4985 4C6.93259 4 3.8654 7.55614 3.8654 10.8771C3.8654 12.5853 3.43089 13.3094 2.96968 14.0778C2.51361 14.8359 1.99693 15.6966 2.00001 17.3895ZM8.37816 24.6548C9.20505 25.5762 10.2949 26.0836 11.4464 26.0846H11.4484C12.603 26.0846 13.6949 25.5772 14.5249 24.6558C14.8094 24.3405 14.7837 23.8526 14.4674 23.568C14.152 23.2835 13.6651 23.3092 13.3796 23.6245C12.8464 24.2182 12.1603 24.5439 11.4484 24.5439H11.4474C10.7386 24.5439 10.0556 24.2182 9.5235 23.6255C9.23895 23.3081 8.75206 23.2825 8.43568 23.568C8.11931 23.8515 8.09363 24.3394 8.37816 24.6548Z" fill="#2F2D2D"/>
                        <circle cx="17" cy="5" r="5" fill="#FF0000"/>
                    </svg>
                </div>
                <NavLink to={`/${AcctType.toLowerCase()}/dashboard`}>
                    <div className="flex gap-3 cursor-pointer">
                        {/* <div className="lg:w-[45px] lg:h-[45px] md:w-[35px] md:h-[35px] w-[25px] h-[25px] rounded-[100%]">
                            <img className="w-full" src={AcctImg} alt="" />
                        </div> */}
                        <div className="flex flex-col">
                            <h1 className="text-[#360A13] font-medium text-[.8rem]">{fullName}</h1>
                            <p className="text-[#848484] text-[.7rem]">{AcctType}</p>
                        </div>
                    </div>
                </NavLink>
            </div>
            <Modal modalHandler={app} />
        </>
     );
}
 
export default DashboardProfileHeader;
