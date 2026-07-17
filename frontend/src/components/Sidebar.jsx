import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import { MdStarRate, MdPerson, MdChevronLeft, MdChevronRight, MdClose, MdDashboard } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Sidebar collapsed by default on desktop
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsMobileOpen(prev => !prev);
    window.addEventListener('toggle-mobile-sidebar', handler);
    return () => window.removeEventListener('toggle-mobile-sidebar', handler);
  }, []);

  const menuItems = [
    { name: 'Dashboard', icon: MdDashboard, path: '/dashboard' },
    { name: 'Rating', icon: MdStarRate, path: '/rating' },
    { name: 'Role', icon: MdPerson, path: '/role' },
  ];

  const handleNav = (path) => {
    navigate(path);
    setIsMobileOpen(false); // Close mobile drawer after navigation
  };

  // The actual Sidebar content component to render for both Desktop and Mobile
  const SidebarContent = ({ isMobile }) => (
    <div className={cn(
      "bg-white rounded-[20px] border border-green-500/30 shadow-[0_4px_24px_rgb(0,0,0,0.06)] flex flex-col relative transition-all duration-300",
      isMobile ? "w-64 h-full" : isCollapsed ? "w-[84px] h-[calc(100vh-80px)]" : "w-64 h-[calc(100vh-80px)]"
    )}>
      
      {/* Desktop Expand/Collapse Toggle Button */}
      {!isMobile && (
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-6 -right-3.5 w-7 h-7 bg-white border border-green-500/30 rounded-full flex items-center justify-center text-gray-400 hover:text-green-500 hover:border-green-500 z-10 shadow-sm transition-colors cursor-pointer"
        >
          {isCollapsed ? <MdChevronRight className="text-xl" /> : <MdChevronLeft className="text-xl" />}
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

      <div className="flex-1 py-6 px-3.5 overflow-y-auto overflow-x-hidden">
        <ul className="flex flex-col gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => handleNav(item.path)}
                  className={cn(
                    "flex w-full items-center gap-3.5 px-3 py-3 rounded-[12px] text-sm font-medium transition-all duration-300 border",
                    isActive 
                      ? "bg-gradient-to-r from-green-500 to-green-400 border-transparent text-white shadow-md shadow-green-500/25" 
                      : "bg-white border-gray-200 text-gray-500 hover:bg-green-50 hover:border-green-400 hover:text-green-600 group"
                  )}
                >
                  <Icon className={cn(
                    "text-[22px] shrink-0 transition-colors duration-300",
                    isActive ? "text-yellow-100" : "text-gray-400 group-hover:text-green-500"
                  )} />
                  
                  <span 
                    className={cn(
                      "whitespace-nowrap transition-all duration-300 overflow-hidden text-left flex-1",
                      !isMobile && isCollapsed ? "opacity-0 w-0 max-w-0" : "opacity-100 w-auto max-w-[200px]"
                    )}
                  >
                    {item.name}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
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
        <SidebarContent isMobile={false} />
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
              <SidebarContent isMobile={true} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
