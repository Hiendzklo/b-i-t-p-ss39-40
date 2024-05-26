import React from 'react';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <ul className="nav nav-tabs mb-4 pb-2">
      <li className="nav-item" role="presentation">
        <button 
          className={`nav-link ${activeTab === 'all' ? 'active' : ''}`} 
          onClick={() => setActiveTab('all')}
        >
          Tất cả
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button 
          className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`} 
          onClick={() => setActiveTab('completed')}
        >
          Đã hoàn thành
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button 
          className={`nav-link ${activeTab === 'incomplete' ? 'active' : ''}`} 
          onClick={() => setActiveTab('incomplete')}
        >
          Chưa hoàn thành
        </button>
      </li>
    </ul>
  );
};

export default Tabs;
