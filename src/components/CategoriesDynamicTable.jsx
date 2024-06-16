import React, {useState} from 'react';
import { appStore } from '../store';



const CustomCheckBox = ({data, onChange}) => {
    const [checked, setChecked] = useState(data.status);

    const handleChange = () => {
        setChecked(!checked);
        onChange({ id: data.id, status: !checked, name: data.name });
    }

    return (
        <label class="switch">
            <input type="checkbox" checked={checked} onChange={handleChange} />
            <span class="slider round"></span>
        </label>
    );
}

const CategoriesDynamicTable = ({ data, tableIcon1, tableIcon2, tableIcon3, toggledChecked, clickedToEdit }) => {
    return (
        <table className="w-full bg-transparent rounded-[10px]">
            <thead>
                <tr>
                    <th className="text-start lg:text-[.6rem] windowScreen:text-sm font-medium text-[#161616] border-b-[1px] border-b-[#E8E8E8] py-4">
                        <div className="flex items-center ps-[50px]">
                            <p className="">Name</p>
                        </div>
                    </th>
                    <th className="text-start lg:text-[.6rem] windowScreen:text-sm font-medium text-[#161616] border-b-[1px] border-b-[#E8E8E8] py-4">Status</th>
                    <th className="text-start lg:text-[.6rem] windowScreen:text-sm font-medium text-[#161616] border-b-[1px] border-b-[#E8E8E8] py-4">Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((dataValue, index) => (
                    <tr key={index}>
                        <td className="py-4 px-2 border-b-[1px] border-b-[#E8E8E8] text-[#161616] lg:text-[.6rem] windowScreen:text-sm font-Nunito font-light">
                            <div className="flex items-center gap-10">
                               <div className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                        <path d="M1 1H11M1 5H11" stroke="#161616" stroke-width="1.5" stroke-linecap="round"/>
                                    </svg>
                               </div>
                                <div className="flex gap-2 items-center">
                                    <p className="">{dataValue.name}</p>
                                </div>
                            </div>
                        </td>
                        <td className="py-4 border-b-[1px] border-b-[#E8E8E8]">
                            <CustomCheckBox data={dataValue} onChange={(data) => toggledChecked(data)} />
                        </td>
                        <td className="py-4 px-2 border-b-[1px] border-b-[#E8E8E8] text-[#161616] lg:text-[.6rem] windowScreen:text-sm font-Nunito font-light">
                            <div className="flex gap-5 w-[10px] lg:gap-3 windowScreen:gap-5 items-center">
                                <div className="macScreens:w-[50px] lg:w-[25px]">
                                    <button
                                        onClick={() => clickedToEdit(dataValue)}
                                        className="text-primary dark:text-primary-400"
                                        data-twe-toggle="tooltip"
                                        title="Edit Category"
                                    ><i class='bx bx-edit cursor-pointer border-[1px] border-[#E8E8E8] py-2 px-2 rounded-[5px] text-[#161616] lg:text-[.8rem] windowScreen:text-[1.4rem] hover:border-red-600 hover:text-red-600 hover:duration-500'></i>
                                    </button>
                                </div>
                                <div className="macScreens:w-[50px] lg:w-[25px]">
                                    {tableIcon2}
                                </div>
                                <div className="macScreens:w-[50px] lg:w-[25px]">
                                    {tableIcon3}
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CategoriesDynamicTable;