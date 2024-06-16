import { NavLink } from "react-router-dom";

const LogoHome = ({LogoClassName}) => {
    return ( 
        <NavLink to="/">
            <div className={`${LogoClassName}`}>
                <img className="w-full" src="/img/Logo.png" alt=""/>
            </div>
        </NavLink>
     );
}
 
export default LogoHome;