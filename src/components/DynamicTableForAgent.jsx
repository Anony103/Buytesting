import React from 'react';
import { useNavigate } from "react-router-dom";

const DynamicTableForAgent = ({ data, tableIcon2, tableIcon3, showCheckbox, name, gotoRoute }) => {
    const navigate = useNavigate();
    return (
        <table className="w-full bg-transparent rounded-[10px]">
            <thead>
                <tr>
                    <th className="text-start lg:text-[.6rem] windowScreen:text-sm font-medium text-[#161616] border-b-[1px] border-b-[#E8E8E8] py-4">
                        <div className="flex items-center lg:gap-1 windowScreen:gap-3">
                            {/* <div className="table-radio-button h-[40px] w-[40px] relative">
                                <label className="top-0 bottom-0 left-0 right-0 input-container">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>
                            </div> */}
                            <p className="">{name}</p>
                        </div>
                    </th>
                    <th className="text-start lg:text-[.6rem] windowScreen:text-sm font-medium text-[#161616] border-b-[1px] border-b-[#E8E8E8] py-4">Mobile</th>
                    <th className="text-start lg:text-[.6rem] windowScreen:text-sm font-medium text-[#161616] border-b-[1px] border-b-[#E8E8E8] py-4">Email Address</th>
                    <th className="text-start lg:text-[.6rem] windowScreen:text-sm font-medium text-[#161616] border-b-[1px] border-b-[#E8E8E8] py-4">Status</th>
                    {/* <th className="text-start lg:text-[.6rem] windowScreen:text-sm font-medium text-[#161616] border-b-[1px] border-b-[#E8E8E8] py-4">Action</th> */}
                </tr>
            </thead>
            <tbody>
                {data.map((value, index) => (
                    <tr key={index}>
                        <td className="py-4 px-2 border-b-[1px] border-b-[#E8E8E8] text-[#161616] lg:text-[.6rem] windowScreen:text-sm font-Nunito font-light">
                            <div className="flex items-center lg:gap-1 windowScreen:gap-3">
                                <div className="flex gap-2 items-center">
                                    <p className="">{value.firstName} {value.lastName}</p>
                                </div>
                            </div>
                        </td>
                        <td className="py-4 px-2 border-b-[1px] border-b-[#E8E8E8] text-[#161616] lg:text-[.6rem] windowScreen:text-sm font-Nunito font-light">{value.phoneNumber}</td>
                        <td className="py-4 px-2 border-b-[1px] border-b-[#E8E8E8] text-[#161616] lg:text-[.6rem] windowScreen:text-sm font-Nunito font-light">{value.email}</td>
                        <td className="py-4 px-2 border-b-[1px] border-b-[#E8E8E8] text-[#161616] lg:text-[.6rem] windowScreen:text-sm font-Nunito font-light">{value.status?'Activated':'Flagged'}</td>
                         {/* <td className="py-4 px-2 border-b-[1px] border-b-[#E8E8E8] text-[#161616] lg:text-[.6rem] windowScreen:text-sm font-Nunito font-light">
                            <div className="flex lg:gap-2 windowScreen:gap-5 items-center">
                                <button
                                    className="text-primary dark:text-primary-400"
                                    data-twe-toggle="tooltip"
                                    title="View buyer"
                                    // onClick={() => {
                                    //     navigate(`${gotoRoute}/${value.id}`)
                                    // }}
                                >
                                 <
                                    span className="material-symbols-outlined lg:text-[1.2rem] windowScreen:text-[1.8rem] text-[#161616] cursor-pointer border-[1px] border-[#E8E8E8] py-1 px-1 rounded-[5px]">visibility</span> 
                                </button>
                                 {tableIcon2}
                                {tableIcon3} 
                            </div> 
                        </td> */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DynamicTableForAgent;