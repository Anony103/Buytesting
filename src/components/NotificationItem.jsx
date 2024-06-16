
import { NavLink } from 'react-router-dom';

const NotificationItem = ({ to, image, title, date, NotificationIcon, statusColor }) => {
  return (
    <NavLink to={to} className="flex justify-between md:w-[80%] w-full">
      <div className="flex gap-2 md:gap-5 items-center">
        <div className="md:w-[50px] w-[70px]">
          <img className='w-full' src={image} alt="" />
        </div>
        <div className="font-Nunito font-medium text-[16px] md:text-[18px]">
          <p className="">{title}</p>
          <p className="text-[#848484] text-[14px]">{date}</p>
        </div>
      </div>
      <div className="">
        <i className={NotificationIcon} style={{ color: statusColor, fontSize: '0.7rem' }}></i>
      </div>
    </NavLink>
  );
};

export default NotificationItem;
