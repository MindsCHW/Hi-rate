import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utils/cn';
import { MdStarRate, MdPerson } from 'react-icons/md';

const Sidebar = ({ activeTab = 'Role', setActiveTab }) => {
  const menuItems = [
    { name: 'Rating', icon: MdStarRate, id: 'Rating' },
    { name: 'Role', icon: MdPerson, id: 'Role' },
  ];

  return (
    <div className="w-[240px] bg-white h-full flex flex-col border-r border-borderColor shrink-0">
      <div className="flex-1 py-4">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id} className="px-4 py-0.5">
                <button
                  onClick={() => setActiveTab && setActiveTab(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 rounded text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-sidebar-active text-white" 
                      : "text-textColor hover:bg-gray-100"
                  )}
                >
                  <Icon className="text-xl" />
                  {item.name}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
