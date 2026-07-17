import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import editedLogo from '../../assets/editedlogo.PNG';

// Helper to determine left border color based on status
const getStatusColor = (status) => {
  switch (status) {
    case 'ON-GOING': return 'border-l-green-500';
    case 'HO-PROCESS': return 'border-l-purple-500';
    case 'HO-RATED': return 'border-l-amber-500';
    case 'SPV-RATED': return 'border-l-indigo-500';
    default: return 'border-l-gray-400';
  }
};

const CompactRoadCard = ({ data, onHover, onLeave, onClick }) => {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      onHover(data, rect);
    }
  };

  return (
    <motion.button
      ref={cardRef}
      layoutId={`card-${data.roadName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
      onClick={() => onClick(data)}
      whileHover={{ scale: 1.08, zIndex: 50 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative w-full h-[60px] bg-white rounded-xl shadow-sm hover:shadow-xl hover:ring-2 hover:ring-gray-200/50 transition-shadow duration-300 flex items-center overflow-hidden border-t border-r border-b border-gray-100 border-l-[6px] ${getStatusColor(data.status)} cursor-pointer group`}
    >
      {/* Left Icon (Star with road) */}
      <div className="w-[50px] h-full flex items-center justify-center pl-2 z-10 shrink-0">
        <img src={editedLogo} alt="Logo" className="w-[32px] h-[32px] object-contain transform group-hover:scale-110 transition-transform duration-300" />
      </div>

      {/* Center Text with sliding cross-fade animation */}
      <div className="flex-1 flex justify-center items-center pr-2 z-10 relative h-full overflow-hidden">
        <span className="absolute text-gray-900 font-extrabold text-[17px] tracking-tight transition-all duration-300 transform group-hover:-translate-y-4 group-hover:opacity-0 group-hover:blur-sm">
          {data.roadName}
        </span>
        <span className="absolute px-1 text-gray-900 font-bold text-[10px] sm:text-[11px] leading-tight tracking-tight text-center transition-all duration-300 transform translate-y-4 opacity-0 blur-sm group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none">
          {data.roadFullName.replace('SPV Name : ', '')}
        </span>
      </div>

      {/* Right Angled Road Background Graphic */}
      <div className="absolute right-0 top-0 bottom-0 w-[80px] pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity z-0">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="roadGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
          <path d="M40 100L80 0H100V100H40Z" fill="url(#roadGradient)" />
          {/* Dashed line on the angled road */}
          <path d="M58 100L86 0" stroke="white" strokeWidth="2.5" strokeDasharray="6 6" className="opacity-50" />
        </svg>
      </div>
      
      {/* Light glow overlay on hover */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none z-20"></div>
    </motion.button>
  );
};

export default CompactRoadCard;
