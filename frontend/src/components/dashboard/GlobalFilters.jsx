import React from 'react';
import { MdSearch, MdFilterList } from 'react-icons/md';

const GlobalFilters = () => {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-borderColor rounded-xl shadow-sm p-4 mb-6 flex flex-wrap items-center gap-4 sticky top-0 z-10">
      <div className="flex items-center gap-2 text-gray-500 font-medium">
        <MdFilterList className="text-xl text-primary" />
        <span>Filters:</span>
      </div>

      <div className="flex-1 min-w-[200px] relative">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        <input 
          type="text" 
          placeholder="Search projects, roads, or assets..." 
          className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-gray-600 cursor-pointer">
        <option value="">All States</option>
        <option value="MH">Maharashtra</option>
        <option value="KA">Karnataka</option>
        <option value="TN">Tamil Nadu</option>
        <option value="UP">Uttar Pradesh</option>
      </select>

      <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-gray-600 cursor-pointer">
        <option value="">All Projects</option>
        <option value="MKTPL">MKTPL</option>
        <option value="NKTPL">NKTPL</option>
        <option value="MSHP">MSHP</option>
      </select>

      <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-gray-600 cursor-pointer">
        <option value="">Asset Type</option>
        <option value="Flexible">Flexible Pavement</option>
        <option value="Rigid">Rigid Pavement</option>
        <option value="Structure">Structures</option>
      </select>

      <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-gray-600 cursor-pointer">
        <option value="">Rating Status</option>
        <option value="critical">Critical (1 Rating)</option>
        <option value="warning">Need Attention (5 Rating)</option>
        <option value="good">Good (10 Rating)</option>
      </select>

      <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-gray-600 cursor-pointer">
        <option value="">Last 30 Days</option>
        <option value="jan-26">Jan 26</option>
        <option value="feb-26">Feb 26</option>
        <option value="jun-26">June 26</option>
      </select>
    </div>
  );
};

export default GlobalFilters;
