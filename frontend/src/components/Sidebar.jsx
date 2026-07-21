import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';
import { MdStarRate } from 'react-icons/md';
import { LuUsers, LuBell, LuSettings } from 'react-icons/lu';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Rating', icon: MdStarRate, path: '/' },
    { name: 'User Management', icon: LuUsers, path: '/user-management' },
    { name: 'Notification', icon: LuBell, path: '/notification', subtext: 'Work Assignment' },
  ];

  return (
    <div className="w-[240px] bg-white h-full flex flex-col border-r border-borderColor shrink-0">
      <div className="flex-1 py-4">
        <ul className="flex flex-col">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <li key={item.name} className="px-4 py-1">
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium transition-colors",
                    active 
                      ? "bg-sidebar-active text-white" 
                      : "text-textColor hover:bg-gray-100"
                  )}
                >
                  <Icon className="text-xl shrink-0" />
                  {item.subtext ? (
                    <div className="flex flex-col text-left leading-tight">
                      <span className="font-semibold text-sm">{item.name}</span>
                      <span className={cn("text-[11px] font-normal", active ? "text-blue-100" : "text-gray-400")}>{item.subtext}</span>
                    </div>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="border-t border-borderColor p-4">
        <Link
          to="#"
          className="flex items-center justify-between px-4 py-2.5 rounded text-sm font-medium text-textColor hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <LuSettings className="text-xl text-gray-500" />
            <span>Settings</span>
          </div>
          <span className="text-gray-400 font-bold text-xs">&gt;</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
