import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { MdStarRate, MdChevronLeft, MdChevronRight, MdClose } from 'react-icons/md';
import { LuUsers, LuBell, LuSettings, LuLayoutDashboard, LuUserCheck } from 'react-icons/lu';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(() => 
    location.pathname.startsWith('/dashboard')
  );

  const menuItems = [
    { name: 'Dashboard', icon: LuLayoutDashboard, path: '/dashboard' },
    { name: 'Rating', icon: MdStarRate, path: '/' },
    { name: 'Notification', icon: LuBell, path: '/notification', subtext: 'Work Assignment' },
    { name: 'Role', icon: LuUserCheck, path: '/role' },
    { name: 'Users', icon: LuUsers, path: '/user-management' },
  ];

  const handleNav = (path, proj) => {
    if (proj) {
      navigate(`${path}?project=${proj}`);
    } else {
      navigate(path);
    }
    setIsMobileOpen(false); // Close mobile drawer after navigation
  };

  // The actual Sidebar content component to render for both Desktop and Mobile
  const renderSidebarContent = (isMobile) => (
    <div className={cn(
      "bg-white rounded-[20px] border border-green-500/30 shadow-[0_4px_24px_rgb(0,0,0,0.06)] flex flex-col relative transition-all duration-300",
      isMobile ? "w-64 h-full" : isCollapsed ? "w-[84px] h-[calc(100vh-80px)]" : "w-64 h-[calc(100vh-80px)]"
    )}>
      
      {/* Desktop Expand/Collapse Toggle Button */}
      {!isMobile && (
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-4 -right-[20px] w-5 h-10 bg-white border border-green-500/30 border-l-0 rounded-r-full flex items-center justify-center text-gray-400 hover:text-green-500 hover:border-green-500 z-10 transition-colors cursor-pointer -translate-x-px"
        >
          {isCollapsed ? <MdChevronRight className="text-xl -ml-1" /> : <MdChevronLeft className="text-xl -ml-1" />}
        </button>
      )}

      {/* Mobile Close Button */}
      {isMobile && (
        <div className="flex justify-end p-4 pb-0">
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-600 bg-gray-50 rounded-full"
          >
            <MdClose className="text-xl" />
          </button>
        </div>
      )}

      <div className="flex-1 py-6 px-3.5 relative z-50">
        <ul className="flex flex-col gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            
            if (item.name === 'Dashboard') {
              const active = location.pathname.startsWith('/dashboard');
              return (
                <li key={item.name} className="px-4 py-1">
                  <button
                    onClick={() => setIsDashboardExpanded(!isDashboardExpanded)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2.5 rounded text-sm font-medium transition-colors cursor-pointer outline-none",
                      active 
                        ? "bg-sidebar-active text-white" 
                        : "text-textColor hover:bg-gray-100"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="text-xl shrink-0" />
                      {!isCollapsed && <span>{item.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <span className="text-[10px] ml-auto">
                        {isDashboardExpanded ? '▼' : '▶'}
                      </span>
                    )}
                  </button>
                  
                  {/* Expandable Submenu */}
                  {!isCollapsed && (
                    <motion.div
                      initial={false}
                      animate={{ height: isDashboardExpanded ? 'auto' : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="flex flex-col gap-1 mt-1.5 pl-4">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={() => {
                              if (isMobile) setIsMobileOpen(false);
                            }}
                            className={cn(
                              "flex items-center gap-2.5 px-4 py-2 rounded text-xs font-semibold transition-colors",
                              location.pathname === '/dashboard'
                                ? "bg-sidebar-active text-white font-bold"
                                : "text-textColor hover:bg-gray-100"
                            )}
                          >
                            <span className="text-[8px]">•</span>
                            <span>Dashboard Overview</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/strip-chart"
                            onClick={() => {
                              if (isMobile) setIsMobileOpen(false);
                            }}
                            className={cn(
                              "flex items-center gap-2.5 px-4 py-2 rounded text-xs font-semibold transition-colors",
                              location.pathname === '/dashboard/strip-chart'
                                ? "bg-sidebar-active text-white font-bold"
                                : "text-textColor hover:bg-gray-100"
                            )}
                          >
                            <span className="text-[8px]">•</span>
                            <span>Strip Chart</span>
                          </Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </li>
              );
            }

            const active = location.pathname === item.path;
            return (
              <li key={item.name} className="px-4 py-1">
                <Link
                  to={item.path}
                  onClick={() => {
                    if (isMobile) setIsMobileOpen(false);
                  }}
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
            );
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

  return (
    <>
      {/* Desktop Sidebar wrapper */}
      <motion.div 
        initial={false}
        animate={{ width: isCollapsed ? 100 : 272 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="shrink-0 hidden md:flex items-center justify-center pl-4 pr-1 relative"
      >
        {renderSidebarContent(false)}
      </motion.div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="relative p-4 h-full"
            >
              {renderSidebarContent(true)}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
