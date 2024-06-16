// HorizontalTabs.js
import { useState } from 'react';

const HorizontalTabs = ({ tabs, tabClassName, tabStyles }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className={`horizontal-tabs-container flex flex-col bg-[#848484] bg-opacity-[5%] pt-5`}>
            <div className={`horizontal-tabs-list z-10 ${tabClassName}`}>
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`horizontal-tab ${tabStyles} ${activeTab === index ? 'active' : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        <button className="horizontal-tab-button">{tab.title}</button>
                    </div>
                ))}
            </div>
            <div className="horizontal-tab-content min-h-[90vh]">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default HorizontalTabs;