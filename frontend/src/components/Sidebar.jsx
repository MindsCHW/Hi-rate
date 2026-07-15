import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utils/cn';
import { MdDashboard, MdStarRate } from 'react-icons/md';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: MdDashboard },
    { name: 'Rating', path: '/rating', icon: MdStarRate },
  ];

  return (
    <div className="w-[240px] bg-white h-full flex flex-col border-r border-borderColor shrink-0">
      <div className="flex-1 py-4">
        <ul className="flex flex-col">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name} className="px-4 py-1">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-sidebar-active text-white" 
                      : "text-textColor hover:bg-gray-100"
                  )}
                >
                  <Icon className="text-xl" />
                  {item.name}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
