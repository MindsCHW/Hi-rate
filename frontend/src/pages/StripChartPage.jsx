import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { dummyData } from '../data/ratingData';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { MdTrendingUp, MdFilterList, MdOutlineInfo } from 'react-icons/md';

const categories = [
  "Roadway",
  "Road Signage and Furniture",
  "Project Facilities",
  "Structures",
  "ATMS",
  "TMS",
  "Landscaping"
];

// Seed dummy linear data for various chainage points (Km 100 to Km 112)
const generateMockChartData = (road, category) => {
  const seed = road.charCodeAt(0) + category.charCodeAt(0);
  const data = [];
  for (let km = 100; km <= 112; km++) {
    // Generate scores between 2.5 and 5.0 based on simple math formula using seed
    const pavementScore = +(3 + Math.sin(km + seed) * 1.5 + Math.cos(km * 0.5) * 0.5).toFixed(1);
    const shoulderScore = +(2.8 + Math.cos(km + seed) * 1.2 + Math.sin(km * 0.4) * 0.6).toFixed(1);
    const drainageScore = +(3.2 + Math.sin(km * 0.8 + seed) * 1.0).toFixed(1);
    const overallAverage = +((pavementScore + shoulderScore + drainageScore) / 3).toFixed(1);
    
    data.push({
      chainage: `Km ${km}`,
      Pavement: Math.min(5, Math.max(1, pavementScore)),
      Shoulder: Math.min(5, Math.max(1, shoulderScore)),
      Drainage: Math.min(5, Math.max(1, drainageScore)),
      Average: Math.min(5, Math.max(1, overallAverage))
    });
  }
  return data;
};

const StripChartPage = () => {
  const [selectedRoad, setSelectedRoad] = useState(dummyData[0].roadName);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const activeRoadDetails = dummyData.find(d => d.roadName === selectedRoad);
  const chartData = generateMockChartData(selectedRoad, selectedCategory);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 p-6 overflow-y-auto flex flex-col space-y-6 custom-scrollbar">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#0f172a]">Linear Strip Chart Analysis</h1>
              <p className="text-sm text-gray-500 mt-1">Monitor asset conditions, pavement index, and overall rating plotted continuously over highway chainage segments.</p>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-100 shadow-sm self-start md:self-auto">
              <MdOutlineInfo className="text-sm shrink-0" />
              <span>Chainage Linear Plotting Mode</span>
            </div>
          </div>

          {/* Control bar */}
          <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 text-gray-400 shrink-0">
              <MdFilterList className="text-lg" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Filters</span>
            </div>
            
            <div className="w-full sm:w-[220px]">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Select Road / Project</label>
              <select
                value={selectedRoad}
                onChange={(e) => setSelectedRoad(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm bg-white focus:outline-none focus:border-green-500 cursor-pointer"
              >
                {dummyData.map(road => (
                  <option key={road.roadName} value={road.roadName}>
                    {road.roadName} – {road.roadFullName.replace(/^SPV Name\s*:\s*/i, '')}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-[220px]">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Select Asset Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm bg-white focus:outline-none focus:border-green-500 cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {activeRoadDetails && (
              <div className="ml-auto flex items-center gap-4 self-start sm:self-auto bg-green-50/50 border border-green-100 rounded-lg px-4 py-2 text-xs font-medium text-green-700">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block font-bold leading-normal">Road Status</span>
                  <span className="font-bold">{activeRoadDetails.status}</span>
                </div>
                <div className="border-l border-green-200/60 pl-4">
                  <span className="text-[10px] text-gray-400 uppercase block font-bold leading-normal">Created On</span>
                  <span>{activeRoadDetails.dateCreated.split(',')[0]}</span>
                </div>
              </div>
            )}
          </div>

          {/* Composed Strip Chart Card */}
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Linear Chainage Profiler</h3>
                <p className="text-xs text-gray-400 mt-0.5">Continuous condition index (1.0 to 5.0 scale) at 1 Km intervals.</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-md">
                <MdTrendingUp />
                <span>Live Composed Feed</span>
              </div>
            </div>

            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" />
                  <XAxis dataKey="chainage" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }} />
                  <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', fontWeight: 500 }} />
                  
                  <Bar dataKey="Pavement" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  <Bar dataKey="Shoulder" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  <Bar dataKey="Drainage" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  <Line type="monotone" dataKey="Average" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 1 }} activeDot={{ r: 6 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripChartPage;
