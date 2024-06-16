import React from 'react';

const SubscriptionDynamicTable = ({ data, tableIcon1, tableIcon2, tableIcon3, showCheckbox, verified }) => {
    return (
        <table className="w-full bg-transparent rounded-[10px]">
            <thead>
                <tr>
                    <th className="text-start lg:text-[.6rem] windowScreen:text-sm font-medium text-[#161616] border-b-[1px] border-b-[#E8E8E8] py-4">
                        <div className="flex items-center gap-3">
                            <div className="table-radio-button h-[40px] w-[40px] relative">
                                <label className="top-0 bottom-0 left-0 right-0 input-container">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            <p className="">Seller's Name</p>
                        </div>
                    </th>
                    <th className="text-start lg:text-[.6rem] windowScreen:text-sm font-medium text-[#161616] border-b-[1px] border-b-[#E8E8E8] py-4">Subscription Plan</th>
                    <th className="text-start lg:text-[.6rem] windowScreen:text-sm font-medium text-[#161616] border-b-[1px] border-b-[#E8E8E8] py-4">Price</th>
                    <th className="text-start lg:text-[.6rem] windowScreen:text-sm font-medium text-[#161616] border-b-[1px] border-b-[#E8E8E8] py-4">Status</th>
                    <th className="text-start lg:text-[.6rem] windowScreen:text-sm font-medium text-[#161616] border-b-[1px] border-b-[#E8E8E8] py-4">Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((seller, index) => (
                    <tr key={index}>
                        <td className="py-4 px-2 border-b-[1px] border-b-[#E8E8E8] text-[#161616] lg:text-[.6rem] windowScreen:text-sm font-Nunito font-light">
                            <div className="flex items-center gap-3">
                                {showCheckbox && (
                                    <div className="table-radio-button h-[40px] w-[40px] border-[1px] border-[#E8E8E8] rounded-[10px] relative">
                                        <label className="top-0 bottom-0 left-0 right-0 input-container">
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                )}
                                <div className="flex gap-2 items-center">
                                    <div className="windowScreen:w-[50px] lg:w-[30px]">
                                        <img className="w-full" src={seller.user.avatar} alt="" />
                                    </div>
                                    <p className="">{seller.user.firstName} {seller.user.lastName}</p>
                                </div>
                            </div>
                        </td>
                        <td className="py-4 px-2 border-b-[1px] border-b-[#E8E8E8] text-[#161616] lg:text-[.6rem] windowScreen:text-sm font-Nunito font-light">{seller.plan}</td>
                        <td className="py-4 px-2 border-b-[1px] border-b-[#E8E8E8] text-[#161616] lg:text-[.6rem] windowScreen:text-sm font-Nunito font-light">{seller.price}</td>
                        <td className="py-4 px-2 border-b-[1px] border-b-[#E8E8E8] text-[#161616] lg:text-[.6rem] windowScreen:text-sm font-Nunito font-light">
                            <div className="flex justify-start items-center">
                                {seller.user.isVerified ? (
                                        <p className="bg-[#D3FBE8] px-5 py-2 rounded-[5px] text-[#00753E] text-[.5rem] md:text-[.7rem]">Active</p>
                                    ) : (
                                        <p className="bg-[#F99B9B] px-5 py-2 rounded-[5px] text-[#EF4444] text-[.5rem] md:text-[.7rem]">Expired</p>
                                    )}
                            </div>
                        </td>
                        <td className="py-4 px-2 border-b-[1px] border-b-[#E8E8E8] text-[#161616] lg:text-[.6rem] windowScreen:text-sm font-Nunito font-light">
                            <div className="flex lg:gap-2 windowScreen:gap-5 items-center">
                                {tableIcon1}
                                {tableIcon2}
                                {tableIcon3}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SubscriptionDynamicTable;