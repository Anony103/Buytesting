import { NavLink } from 'react-router-dom';

const SidebarNavLink = ({ to, icon, text, messagesCount }) => {
  return (
    <NavLink to={to} className="tab">
      <button className="flex items-center gap-2 bg-transparent w-full px-5 py-2 rounded-[10px] text-[#6B7588] text-sm relative">
        {icon}
        {text}
        {messagesCount}
      </button>
    </NavLink>
  );
};

export default SidebarNavLink;
