import React, { useEffect, useState } from 'react';
import { motion, animate, AnimatePresence } from 'framer-motion';
import { MdOutlineMoreHoriz, MdInfoOutline } from 'react-icons/md';
import editedLogo from '../../assets/editedlogo.PNG';

const StatCard = ({ title, value, icon: Icon, colorClass, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(false);
    let controls;
    
    const timeout = setTimeout(() => {
      setIsAnimating(true);
      controls = animate(0, value, {
        duration: 1.5,
        ease: "linear",
        onUpdate(v) {
          setDisplayValue(Math.round(v));
        },
        onComplete() {
          setIsAnimating(false);
        }
      });
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (controls) controls.stop();
    };
  }, [value, delay]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200/60 rounded-[16px] p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] flex flex-col hover:shadow-lg transition-shadow duration-300 relative overflow-hidden h-[150px]"
    >
      {/* Subtle corner gradient from reference */}
      <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-blue-100/40 rounded-full blur-3xl pointer-events-none z-0"></div>
      
      {/* Header */}
      <div className="flex justify-between items-center z-10 relative mb-4">
        <div className="flex items-center gap-1.5">
          <Icon className={`text-base ${colorClass.replace('bg-', 'text-')}`} />
          <span className="text-[13px] font-bold text-gray-800 tracking-tight">{title}</span>
          <MdInfoOutline className="text-gray-400 text-[11px] ml-0.5" />
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors border border-gray-200/80 rounded-md p-0.5 shadow-sm">
          <MdOutlineMoreHoriz className="text-[14px]" />
        </button>
      </div>
      
      {/* Main Value */}
      <div className="flex flex-col justify-center flex-1 z-10 relative">
        <h3 className="text-[34px] font-semibold text-gray-900 tracking-tight leading-none mb-1 font-inter">{displayValue}</h3>
        
        {/* Animated Logos running below the number */}
        <div className="h-4 w-full relative overflow-hidden mt-0.5">
          <AnimatePresence>
            {isAnimating && (
              <motion.div
                initial={{ left: "-80%" }}
                animate={{ left: "120%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "linear" }}
                className="absolute top-0 bottom-0 flex items-center gap-2.5 w-max"
              >
                {[...Array(Math.min(value, 100))].map((_, i) => (
                  <img key={i} src={editedLogo} alt="Logo" className="w-3.5 h-3.5 object-contain drop-shadow-sm opacity-80" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
