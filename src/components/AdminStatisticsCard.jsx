
const AdminStatisticsCard = ({ AdminCardIcon, icon, title, value, percentage, valueStyles, percentageStyles }) => {
  return (
    <div className="flex flex-col gap-3 border-[1px] border-[#E8E8E8] rounded-[10px]">
      <div className="flex flex-col gap-3 py-4 windowScreen:px-5 lg:px-2">
        <div className="flex items-center gap-3">
            <div className="w-[40px]">
                <img className="w-full" src={AdminCardIcon} alt="" />
            </div>
            <p className="text-sm font-Nunito text-[#110D06] lg:text-xs windowScreen:text-sm font-light">{title}</p>
        </div>
        <div className="flex items-center gap-2">
          <h1 className={`${valueStyles} text-medium lg:xl windowScreen:text-3xl`}>{value}</h1>
          {/* <p className={`${percentageStyles} lg:text-[.5rem] windowScreen:text-xs py-1 px-2 rounded-[10px] flex items-center`}>
            {icon}{percentage}
          </p> */}
        </div>
      </div>
      <div className="w-full border-t-[1px] h-7 border-[#E8E8E8]"></div>
    </div>
  );
};

export default AdminStatisticsCard;