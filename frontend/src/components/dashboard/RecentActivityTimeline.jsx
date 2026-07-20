import React from 'react';
import { motion } from 'framer-motion';
import { MdEdit, MdAddCircle, MdCheckCircle } from 'react-icons/md';

const updatesData = [
  { id: 1, roadName: 'MKTPL', user: 'Thatipally Manoj Kumar', action: '"Physical Condition" Parameter hoRating edit...', date: '15-Jul-26, 10:47 AM', type: 'edit' },
  { id: 2, roadName: 'NKTPL', user: 'Raavi Likhitha', action: '"Lane line Marking Night Visibility" Parameter ...', date: '15-Jul-26, 10:47 AM', type: 'add' },
  { id: 3, roadName: 'MKTPL', user: 'Thatipally Manoj Kumar', action: '"Painting" Parameter hoRating edited to "10"', date: '15-Jul-26, 10:47 AM', type: 'edit' },
  { id: 4, roadName: 'MSHP', user: 'Punith', action: '"Unevenness" Parameter spvRating edited to ...', date: '15-Jul-26, 10:47 AM', type: 'check' },
  { id: 5, roadName: 'NKTPL', user: 'Raavi Likhitha', action: '"Edge line Marking" Parameter hoRating edite...', date: '15-Jul-26, 10:47 AM', type: 'edit' },
];

const getIcon = (type) => {
  switch (type) {
    case 'edit': return <MdEdit className="text-blue-500" />;
    case 'add': return <MdAddCircle className="text-green-500" />;
    case 'check': return <MdCheckCircle className="text-purple-500" />;
    default: return <MdEdit className="text-gray-500" />;
  }
};

const getBg = (type) => {
  switch (type) {
    case 'edit': return 'bg-blue-100';
    case 'add': return 'bg-green-100';
    case 'check': return 'bg-purple-100';
    default: return 'bg-gray-100';
  }
};

const RecentActivityTimeline = () => {
  return (
    <div className="bg-white border border-borderColor rounded-xl p-5 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-700 font-bold text-sm tracking-wide uppercase">Recent Activities</h3>
        <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View History</span>
      </div>

      <div className="relative border-l border-gray-200 ml-3 flex-1 overflow-y-auto pr-2">
        {updatesData.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-6 ml-6 relative"
          >
            <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-9 ring-4 ring-white ${getBg(item.type)} shadow-sm`}>
              {getIcon(item.type)}
            </span>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-gray-800">{item.roadName}</span>
                <span className="text-[10px] text-gray-400 font-medium">{item.date}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{item.action}</p>
              <div className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                By <span className="font-bold text-primary">{item.user}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityTimeline;
