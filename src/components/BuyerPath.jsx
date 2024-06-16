const BuyerPathBreadCrumb = ({ home, shop1, shop }) => {
  return (
    <div className="w-full font-Nunito font-bold text-[.8rem] md:text-[1rem] px-2 md:px-10 flex gap-2 md:gap-2">
      <span className="text-[#00753E]">{home}</span> <span className="text-[#00753E]">{shop1}</span><span className="text-[#BDBDBD]">{shop}</span>
    </div>
  );
};

export default BuyerPathBreadCrumb;
