import CustomButton from '../../components/CustomButton';
import { NavLink, useNavigate } from 'react-router-dom';
import { authStore } from '../../store';



const VerticalTabs = ({contentComponent}) => {

  const auth = authStore(state => state);
  const navigate = useNavigate();

  return ( 
    <div className="vertical-tabs md:w-[90%] w-[95%] grid grid-cols-5 gap-x-10">
      <div className="tab-list col-span-1 h-[90vh] flex flex-col gap-5 bg-[#FBFBFB]">
        <NavLink to="/seller/my-shop" className="tab">
          <button className="flex items-center gap-2 bg-transparent w-full px-5 py-2 rounded-[10px] text-[#6B7588]">
              <svg className="shop-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M1.75 8.16675V16.4167C1.75 16.903 1.94315 17.3693 2.28697 17.7131C2.63079 18.0569 3.0971 18.2501 3.58333 18.2501H16.4167C16.9029 18.2501 17.3692 18.0569 17.713 17.7131C18.0568 17.3693 18.25 16.903 18.25 16.4167V8.16675" stroke="" stroke-width="1.84091"/>
                  <path d="M12.5969 18.2501V12.7501C12.5969 12.2639 12.4038 11.7975 12.06 11.4537C11.7161 11.1099 11.2498 10.9167 10.7636 10.9167H8.93026C8.44403 10.9167 7.97771 11.1099 7.63389 11.4537C7.29008 11.7975 7.09692 12.2639 7.09692 12.7501V18.2501" stroke="" stroke-width="1.84091" stroke-miterlimit="16"/>
                  <path d="M18.9998 7.58367L17.4469 2.14875C17.4141 2.03384 17.3447 1.93277 17.2492 1.86082C17.1538 1.78888 17.0375 1.74997 16.918 1.75H13.2083L13.6437 6.97867C13.6503 7.06274 13.6768 7.14403 13.7211 7.21578C13.7655 7.28752 13.8263 7.34765 13.8985 7.39117C14.256 7.60475 14.9545 7.99892 15.4999 8.16667C16.4313 8.45358 17.7916 8.35 18.5671 8.25467C18.6425 8.24492 18.7148 8.21884 18.7791 8.17825C18.8434 8.13765 18.898 8.08352 18.9392 8.01963C18.9804 7.95574 19.0072 7.88363 19.0176 7.80833C19.0281 7.73304 19.022 7.65636 18.9998 7.58367Z" stroke="" stroke-width="1.84091"/>
                  <path d="M11.8334 8.16667C12.3541 8.00625 13.0141 7.6405 13.3826 7.42233C13.4685 7.3712 13.5381 7.29682 13.5836 7.20777C13.629 7.11872 13.6483 7.01864 13.6392 6.91908L13.2084 1.75H6.79173L6.3609 6.91908C6.35167 7.01878 6.37088 7.11906 6.41631 7.20829C6.46173 7.29752 6.53152 7.37205 6.61757 7.42325C6.98607 7.6405 7.64606 8.00625 8.16673 8.16667C9.53531 8.58833 10.4648 8.58833 11.8334 8.16667Z" stroke="" stroke-width="1.84091"/>
                  <path d="M2.55293 2.14875L1.00009 7.58458C0.978174 7.65716 0.972315 7.73365 0.982921 7.80872C0.993527 7.88379 1.02034 7.95566 1.06151 8.01933C1.10268 8.083 1.15721 8.13695 1.22132 8.17743C1.28543 8.21791 1.35758 8.24395 1.43276 8.25375C2.20734 8.35 3.56859 8.45267 4.49993 8.16667C5.04534 7.99892 5.74476 7.60475 6.10134 7.39208C6.1737 7.34848 6.23459 7.28821 6.27892 7.21629C6.32324 7.14438 6.34973 7.0629 6.35618 6.97867L6.79159 1.75H3.08184C2.96233 1.74997 2.84606 1.78888 2.75063 1.86082C2.65519 1.93277 2.58579 2.03384 2.55293 2.14875Z" stroke="" stroke-width="1.84091"/>
              </svg> My Shop
          </button>
        </NavLink>
        <NavLink to="/seller/profile" className="tab">
          <button className="flex items-center gap-2 bg-transparent w-full px-5 py-2 rounded-[10px] text-[#6B7588]">
              <svg className="profile-svg" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <g clip-path="url(#clip0_918_840)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.6666 8.24992C14.6666 9.22238 14.2803 10.155 13.5926 10.8426C12.905 11.5303 11.9724 11.9166 10.9999 11.9166C10.0275 11.9166 9.09483 11.5303 8.40719 10.8426C7.71956 10.155 7.33325 9.22238 7.33325 8.24992C7.33325 7.27746 7.71956 6.34483 8.40719 5.65719C9.09483 4.96956 10.0275 4.58325 10.9999 4.58325C11.9724 4.58325 12.905 4.96956 13.5926 5.65719C14.2803 6.34483 14.6666 7.27746 14.6666 8.24992ZM12.8333 8.24992C12.8333 8.73615 12.6401 9.20246 12.2963 9.54628C11.9525 9.8901 11.4861 10.0833 10.9999 10.0833C10.5137 10.0833 10.0474 9.8901 9.70356 9.54628C9.35974 9.20246 9.16659 8.73615 9.16659 8.24992C9.16659 7.76369 9.35974 7.29737 9.70356 6.95356C10.0474 6.60974 10.5137 6.41659 10.9999 6.41659C11.4861 6.41659 11.9525 6.60974 12.2963 6.95356C12.6401 7.29737 12.8333 7.76369 12.8333 8.24992Z" fill=""/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9998 0.916504C5.43109 0.916504 0.916504 5.43109 0.916504 10.9998C0.916504 16.5686 5.43109 21.0832 10.9998 21.0832C16.5686 21.0832 21.0832 16.5686 21.0832 10.9998C21.0832 5.43109 16.5686 0.916504 10.9998 0.916504ZM2.74984 10.9998C2.74984 12.9157 3.40342 14.6793 4.49884 16.08C5.26813 15.0697 6.26058 14.251 7.39865 13.6878C8.53672 13.1246 9.7896 12.8321 11.0594 12.8332C12.3128 12.832 13.5499 13.1169 14.6765 13.6662C15.8031 14.2155 16.7895 15.0148 17.5604 16.003C18.3547 14.9613 18.8894 13.7455 19.1205 12.456C19.3515 11.1666 19.2722 9.84074 18.8891 8.58807C18.506 7.3354 17.8301 6.19197 16.9174 5.25237C16.0046 4.31278 14.8812 3.60404 13.6402 3.1848C12.3991 2.76557 11.0761 2.64788 9.78054 2.84148C8.48498 3.03508 7.25415 3.5344 6.18988 4.29814C5.12561 5.06187 4.2585 6.06805 3.6603 7.23343C3.0621 8.39882 2.75 9.68989 2.74984 10.9998ZM10.9998 19.2498C9.10596 19.2527 7.26925 18.6012 5.8005 17.4055C6.39169 16.5592 7.17856 15.8682 8.09418 15.3913C9.0098 14.9144 10.0271 14.6658 11.0594 14.6665C12.0789 14.6657 13.0839 14.9081 13.9909 15.3736C14.8978 15.8392 15.6807 16.5144 16.2743 17.3432C14.7942 18.5777 12.9272 19.2525 10.9998 19.2498Z" fill=""/>
                  </g>
                  <defs>
                  <clipPath id="clip0_918_840">
                  <rect width="22" height="22" fill="white"/>
                  </clipPath>
                  </defs>
              </svg> My Profile
          </button>
        </NavLink>
        <NavLink to="/seller/Subscription" className={({ isActive }) => isActive ? "tab active" : "tab"}>
        <button className="flex items-center gap-2 bg-transparent w-full px-5 py-2 rounded-[10px] text-[#6B7588]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3.75" y="11.75" width="16.5" height="8.5" rx="1.25" stroke="currentColor" stroke-width="1.5"/>
        <path d="M12 13L12.6735 15.0729H14.8532L13.0898 16.3541L13.7634 18.4271L12 17.1459L10.2366 18.4271L10.9102 16.3541L9.14683 15.0729H11.3265L12 13Z" fill="currentColor"/>
        <rect x="5" y="7" width="14" height="2" fill="currentColor"/>
         <rect x="7" y="3" width="10" height="2" fill="currentColor"/>
         </svg>
         Subscription
        </button>
        </NavLink>

        <div className="mt-auto mb-[5rem] flex justify-center">
          <CustomButton icon={<i class='bx bx-log-out'></i>} buttonText="Log  Out" btnClassName="bg-[#D60606] text-[#FBFBFB] rounded-[5px] flex items-center gap-5" onClick={() => {
            auth.logout();
            navigate('/seller');
          }} />
        </div>
      </div>
      <div className="tab-content col-span-4">
        {contentComponent}
      </div>
    </div>
   );
}
 
export default VerticalTabs;