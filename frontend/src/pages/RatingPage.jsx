import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Tabs from '../components/Tabs';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import { MdKeyboardArrowDown, MdOutlineFileDownload } from 'react-icons/md';
import { dummyData } from '../data/ratingData';

const RatingPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(dummyData.length / ITEMS_PER_PAGE);
  const currentData = dummyData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-pageBg">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden p-6">
          <div className="bg-white rounded shadow-sm border border-borderColor flex flex-col min-h-full">
            
            {/* Top Controls: Tabs and Actions */}
            <div className="flex items-center justify-between px-2 pt-2 border-b border-borderColor">
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
              
              <div className="flex items-center gap-6 px-4 pb-2 mb-2">
                <div className="flex items-center gap-2 text-sm text-primary font-medium uppercase tracking-wide">
                  SHOW ON PAGE: 
                  <button className="flex items-center gap-1 hover:text-blue-700">
                    10 <MdKeyboardArrowDown className="text-lg" />
                  </button>
                </div>
                
                <button className="flex items-center gap-1 text-sm text-primary font-medium hover:text-blue-700 uppercase tracking-wide">
                  <MdOutlineFileDownload className="text-lg" />
                  DOWNLOAD <MdKeyboardArrowDown className="text-lg" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1">
              <Table data={currentData} />
            </div>

            {/* Pagination */}
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPage;
