import React from 'react';

const LoginActivityDynamicTable = ({ data, verified }) => {
    return (
        <table className="w-full bg-transparent rounded-[10px]">
            <thead>
                <tr>
                    <th className="text-start font-medium bg-[#F3F9FF] text-[#848484] font-Nunito py-2 windowScreen:py-4 px-4 lg:text-[.6rem] windowScreen:text-sm">Devices</th>
                    <th className="text-start font-medium bg-[#F3F9FF] text-[#848484] font-Nunito py-2 windowScreen:py-4 px-4 lg:text-[.6rem] windowScreen:text-sm">Browser</th>
                    <th className="text-start font-medium bg-[#F3F9FF] text-[#848484] font-Nunito py-2 windowScreen:py-4 px-4 lg:text-[.6rem] windowScreen:text-sm">Location</th>
                    <th className="text-start font-medium bg-[#F3F9FF] text-[#848484] font-Nunito py-2 windowScreen:py-4 px-4 lg:text-[.6rem] windowScreen:text-sm">Last Session</th>
                    <th className="text-start font-medium bg-[#F3F9FF] text-[#848484] font-Nunito py-2 windowScreen:py-4 px-4 lg:text-[.6rem] windowScreen:text-sm">Status</th>
                </tr>
            </thead>
            <tbody>
                {data.map((seller, index) => (
                    <tr key={index}>
                        <td className="py-2 windowScreen:py-4 px-4 text-[#161616] font-Nunito font-semibold lg:text-[.6rem] windowScreen:text-sm">{seller.Devices}</td>
                        <td className="py-2 windowScreen:py-4 px-4 text-[#161616] font-Nunito font-semibold lg:text-[.6rem] windowScreen:text-sm">{seller.Browser}</td>
                        <td className="py-2 windowScreen:py-4 px-4 text-[#161616] font-Nunito font-semibold lg:text-[.6rem] windowScreen:text-sm">{seller.Location}</td>
                        <td className="py-2 windowScreen:py-4 px-4 text-[#161616] font-Nunito font-semibold lg:text-[.6rem] windowScreen:text-sm">{seller.Session}</td>
                        <td className="py-2 windowScreen:py-4 px-4 text-[#161616] font-Nunito font-semibold lg:text-[.6rem] windowScreen:text-sm">
                            <div className="flex justify-start items-center">
                                {seller.verified ? (
                                        <p className="bg-[#D3FBE8] px-5 py-2 rounded-[15px] text-[#00753E] text-[.5rem] md:text-[.7rem]">Active</p>
                                    ) : (
                                        <p className="bg-[#F99B9B] px-5 py-2 rounded-[15px] text-[#EF4444] text-[.5rem] md:text-[.7rem]">Inactive</p>
                                    )}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default LoginActivityDynamicTable;