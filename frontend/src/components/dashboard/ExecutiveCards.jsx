import React from 'react';
import { MdStar, MdFolder, MdListAlt, MdWarning, MdCheckCircle, MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';

const ExecutiveCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      
      {/* Avg SevR Rating */}
      <div className="bg-white border border-gray-300 shadow-sm rounded flex flex-col p-3 relative h-full">
        <div className="flex items-center gap-2 mb-2 justify-center">
          <MdStar className="text-yellow-400 text-lg" />
          <h3 className="text-gray-700 font-bold text-xs uppercase tracking-tight">Avg SevR Rating</h3>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-green-600">8.28</span>
          <div className="flex items-center text-green-600 font-bold text-sm mt-1">
            <MdArrowDropUp className="text-xl" />
            <span>+0.28</span>
          </div>
        </div>
        <div className="text-[10px] text-gray-500 font-medium text-center mt-2 border-t pt-1">
          vs April 2026 : 8.00
        </div>
      </div>

      {/* Total Projects */}
      <div className="bg-white border border-gray-300 shadow-sm rounded flex flex-col p-3 relative h-full">
        <div className="flex items-center gap-2 mb-2 justify-center">
          <MdFolder className="text-yellow-500 text-lg" />
          <h3 className="text-gray-700 font-bold text-xs uppercase tracking-tight">Total Projects</h3>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-800">27</span>
        </div>
        <div className="text-[10px] text-transparent font-medium text-center mt-2 border-t pt-1">
          -
        </div>
      </div>

      {/* Parameters Evaluated */}
      <div className="bg-white border border-gray-300 shadow-sm rounded flex flex-col p-3 relative h-full">
        <div className="flex items-center gap-2 mb-2 justify-center">
          <MdListAlt className="text-pink-400 text-lg" />
          <h3 className="text-gray-700 font-bold text-[10px] uppercase tracking-tight text-center">Parameters Evaluated</h3>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-red-500">146627</span>
        </div>
        <div className="text-[10px] text-gray-500 font-medium text-center mt-2 border-t pt-1">
          vs April 2026 : 148K
        </div>
      </div>

      {/* Critical Observations */}
      <div className="bg-white border border-gray-300 shadow-sm rounded flex flex-col p-3 relative h-full">
        <div className="flex items-center gap-2 mb-2 justify-center">
          <MdWarning className="text-orange-400 text-lg" />
          <h3 className="text-gray-700 font-bold text-[10px] uppercase tracking-tight text-center">Critical Observations</h3>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-red-500">10660</span>
        </div>
        <div className="text-[10px] text-gray-500 font-medium text-center mt-2 border-t pt-1">
          vs April 2026 : 10.65K
        </div>
      </div>

      {/* Green Rated Projects */}
      <div className="bg-white border border-gray-300 shadow-sm rounded flex flex-col p-3 relative h-full">
        <div className="flex items-center gap-2 mb-2 justify-center">
          <h3 className="text-gray-700 font-bold text-xs uppercase tracking-tight text-center">Green Rated<br/>Projects</h3>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center mt-1">
          <span className="text-3xl font-bold text-green-600">19</span>
          <div className="flex items-center text-green-600 font-bold text-sm mt-1">
            <MdArrowDropUp className="text-xl" />
            <span>+19</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ExecutiveCards;
