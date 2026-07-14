import React from 'react';
import { cn } from '../utils/cn';
import { MdDashboard, MdStarRate, MdNotifications, MdPeople, MdPerson } from 'react-icons/md';

const Sidebar = ({ activeTab }) => {
  const menuItems = [
    { name: 'Rating', icon: MdStarRate, active: true },
  ];

  return (
    <div className="w-[240px] bg-white h-full flex flex-col border-r border-borderColor shrink-0">
      <div className="flex-1 py-4">
        <ul className="flex flex-col">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name} className="px-4 py-1">
                <a
                  href="#"
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium transition-colors",
                    item.active 
                      ? "bg-sidebar-active text-white" 
                      : "text-textColor hover:bg-gray-100"
                  )}
                >
                  <Icon className="text-xl" />
                  {item.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
