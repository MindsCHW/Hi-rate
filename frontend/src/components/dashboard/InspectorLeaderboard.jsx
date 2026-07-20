import React from 'react';
import { motion } from 'framer-motion';
import { MdStar, MdArrowUpward, MdArrowDownward } from 'react-icons/md';

const inspectors = [
  { id: 1, name: 'Thatipally Manoj Kumar', role: 'Senior Inspector', score: 98, change: '+2', avatar: 'TM' },
  { id: 2, name: 'Raavi Likhitha', role: 'Field Engineer', score: 95, change: '+5', avatar: 'RL' },
  { id: 3, name: 'Punith', role: 'QA Specialist', score: 91, change: '-1', avatar: 'P' },
  { id: 4, name: 'Amit Sharma', role: 'Inspector', score: 88, change: '+4', avatar: 'AS' },
  { id: 5, name: 'Priya Patel', role: 'Field Engineer', score: 85, change: '0', avatar: 'PP' },
];

const InspectorLeaderboard = () => {
  return (
    <div className="bg-white border border-borderColor rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-700 font-bold text-sm tracking-wide uppercase">Inspector Leaderboard</h3>
        <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View All</span>
      </div>

      <div className="space-y-4">
        {inspectors.map((inspector, index) => (
          <motion.div 
            key={inspector.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-sm shadow-inner">
                {inspector.avatar}
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">{inspector.name}</h4>
                <p className="text-xs text-gray-500">{inspector.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <MdStar className="text-yellow-400 text-sm" />
                  <span className="font-bold text-gray-700">{inspector.score}</span>
                </div>
                <div className={`text-[10px] font-bold flex items-center ${
                  inspector.change.startsWith('+') ? 'text-green-500' : 
                  inspector.change.startsWith('-') ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {inspector.change.startsWith('+') && <MdArrowUpward className="text-[10px]" />}
                  {inspector.change.startsWith('-') && <MdArrowDownward className="text-[10px]" />}
                  {inspector.change !== '0' ? inspector.change : '-'}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InspectorLeaderboard;
