import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import { MdStarRate, MdPerson, MdChevronLeft, MdChevronRight, MdClose, MdDashboard, MdContentCopy } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const projectOptions = [
  'ADTPL', 'APEL', 'BFHL', 'BWHPL', 'DATL', 'DHMEPL', 'FRHL', 'GAEPL',
  'JMTPL', 'JUHPL', 'KETPL', 'KHEPL', 'KMTPL', 'KTIPL', 'MBEL', 'MHPL',
  'MKTPL', 'MSHP', 'NAM', 'NDEPL', 'NKTPL', 'SIPL', 'SMTPL', 'SPPL',
  'WMPTL', 'WUPTL', 'WVEL'
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Sidebar collapsed by default on desktop
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Dropdown menu state (opened on double click)
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const handler = () => setIsMobileOpen(prev => !prev);
    window.addEventListener('toggle-mobile-sidebar', handler);
    return () => window.removeEventListener('toggle-mobile-sidebar', handler);
  }, []);

  const menuItems = [
    { name: 'Dashboard', icon: MdDashboard, path: '/dashboard' },
    { name: 'Rating', icon: MdStarRate, path: '/rating' },
    { name: 'Role', icon: MdPerson, path: '/role' },
    { name: 'Clone Page', icon: MdContentCopy, path: '/demo' },
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
            const isActive = location.pathname.startsWith(item.path);
            const isDashboard = item.name === 'Dashboard';
            
            return (
              <li 
                key={item.path} 
                className="relative"
              >
                <button
                  onClick={() => handleNav(item.path)}
                  onDoubleClick={(e) => {
                    if (isDashboard) {
                      e.preventDefault();
                      setOpenMenu(prev => prev === item.name ? null : item.name);
                    }
                  }}
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

                {/* Double-Click Sub-Menu for Dashboard */}
                <AnimatePresence>
                  {openMenu === 'Dashboard' && isDashboard && (
                    <motion.div
                      initial={{ opacity: 0, x: -10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "absolute z-[100] w-56 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden",
                        isMobile ? "left-12 top-14" : "left-[calc(100%+16px)] top-0"
                      )}
                    >
                      <div className="bg-gray-50/80 px-4 py-2.5 border-b border-gray-100 backdrop-blur-sm flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Project</span>
                        <button onClick={() => setOpenMenu(null)} className="text-gray-400 hover:text-gray-600">
                          <MdClose className="text-sm" />
                        </button>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto custom-dropdown-scrollbar py-1.5 flex flex-col">
                        {projectOptions.map(proj => (
                          <button 
                            key={proj} 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNav(item.path, proj);
                              setOpenMenu(null);
                            }}
                            className="text-left px-4 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50/50 transition-colors relative group"
                          >
                            <span className="relative z-10">{proj}</span>
                            <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
