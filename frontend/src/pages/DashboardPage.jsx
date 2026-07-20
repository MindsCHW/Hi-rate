import React from 'react';
import DashboardChart from '../components/DashboardChart';
import { Link } from 'react-router-dom';
import { MdRefresh, MdDashboard } from 'react-icons/md';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const updatesData = [
  { roadName: 'MKTPL', user: 'Thatipally Manoj Kumar', action: '"Physical Condition" Parameter hoRating edit...', date: '15-Jul-26, 10:47 AM' },
  { roadName: 'NKTPL', user: 'Raavi Likhitha', action: '"Lane line Marking Night Visibility" Parameter ...', date: '15-Jul-26, 10:47 AM' },
  { roadName: 'MKTPL', user: 'Thatipally Manoj Kumar', action: '"Painting" Parameter hoRating edited to "10"', date: '15-Jul-26, 10:47 AM' },
  { roadName: 'MSHP', user: 'Punith', action: '"Unevenness" Parameter spvRating edited to ...', date: '15-Jul-26, 10:47 AM' },
  { roadName: 'NKTPL', user: 'Raavi Likhitha', action: '"Edge line Marking" Parameter hoRating edite...', date: '15-Jul-26, 10:47 AM' },
];

const DashboardPage = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        
        <div className="flex-1 overflow-y-auto p-8 pt-6 relative scroll-smooth">
          <div className="max-w-[1800px] mx-auto w-full h-full flex flex-col">
            
            <div className="flex gap-6 flex-1 min-h-0">
        {/* Left Column - Roads Status */}
        <div className="w-[400px] shrink-0 bg-white border border-borderColor rounded shadow-sm flex flex-col p-6">
          <h2 className="text-gray-500 font-bold text-sm tracking-wide mb-8 uppercase">Roads Status</h2>
          
          <div className="flex-1 flex flex-col items-center justify-center -mt-8">
            <DashboardChart />
            <div className="text-center mt-2">
              <span className="font-bold text-gray-700 text-lg">Total Roads : 16</span>
            </div>
          </div>
        </div>

        {/* Right Column - Latest Updates */}
        <div className="flex-1 bg-white border border-borderColor rounded shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-borderColor">
            <h2 className="text-gray-500 font-bold text-sm tracking-wide uppercase">Latest Updates In Ratings and Roads</h2>
          </div>
          
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0 border-b border-borderColor">
                <tr>
                  <th className="px-6 py-3 font-medium">ROAD NAME</th>
                  <th className="px-6 py-3 font-medium">USER</th>
                  <th className="px-6 py-3 font-medium">ACTION</th>
                  <th className="px-6 py-3 font-medium text-right">CREATED AT</th>
                </tr>
              </thead>
              <tbody>
                {updatesData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-700">{item.roadName}</td>
                    <td className="px-6 py-4 text-gray-600">{item.user}</td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-[200px]">{item.action}</td>
                    <td className="px-6 py-4 text-red-500 text-right">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-3 border-t border-borderColor flex items-center justify-between">
            <button className="text-gray-500 hover:text-gray-700">
              <MdRefresh className="text-2xl" />
            </button>
            <button className="bg-primary hover:bg-blue-700 text-white font-medium py-1.5 px-4 rounded text-sm transition-colors">
              All History
            </button>
          </div>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
