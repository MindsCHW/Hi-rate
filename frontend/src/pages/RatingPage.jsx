import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Tabs from '../components/Tabs';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import { MdKeyboardArrowDown, MdOutlineFileDownload } from 'react-icons/md';

const dummyData = [
  // Page 1
  { roadName: 'APFI', roadFullName: 'SPV Name : Andhra Pradesh Expressway Limited (APFI)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'DATI', roadFullName: 'SPV Name : Delhi Agra Tollway Limited (DATI)', status: 'HO-RATED', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'FRHI', roadFullName: 'SPV Name : Farakka-Raiganj Highways Ltd(FRHI)', status: 'HO-RATED', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'JMTPL', roadFullName: 'SPV Name : Jaipur-Mahua Tollway Private Limited (JMTPL)', status: 'HO-RATED', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'KETPL', roadFullName: 'SPV Name : Kanyakumari-Etturavattam Tollway Private Limited (KETPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'KMTPL', roadFullName: 'SPV Name : Kotwa-Muzaffarpur Tollway Private Limited (KMTPL)', status: 'HO-RATED', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'MBEL', roadFullName: 'SPV Name : Mahua Bharatpur Expressway Limited (MBEL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'MKTPL', roadFullName: 'SPV Name : Madurai-Kanyakumari Tollway Private Limited (MKTPL)', status: 'HO-RATED', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'NAM', roadFullName: 'SPV Name : N A M Expressway Limited (NAMEL)', status: 'HO-RATED', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'NDEPL', roadFullName: 'SPV Name : Nelamangla Devihalli Expressway Private Limited (NDEPL)', status: 'HO-RATED', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  // Page 2
  { roadName: 'NKTPL', roadFullName: 'SPV Name : Nanguneri-Kanyakumari Tollway Private Limited (NKTPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'SMTPL', roadFullName: 'SPV Name : Salaipudhur-Madurai Tollway Private Limited (SMTPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'WUPTL', roadFullName: 'SPV Name : Western UP Tollway Limited (WUPTL)', status: 'HO-RATED', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'WVEL', roadFullName: 'SPV Name : KNR Walayar Tollways Pvt Ltd(WVEL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'KTIPL', roadFullName: 'SPV Name : KNR Tirumala Infra Private Limited(KTIPL)', status: 'HO-RATED', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'SPPL', roadFullName: 'SPV Name : KNR Shankarampet Projects Private Limited(SPPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'MSHP', roadFullName: 'SPV Name : DBL Mangalwedha Solapur Highways Private Limited(MSHP)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'MHPL', roadFullName: 'SPV Name : DBL Mangloor Highways Private Limited(MHPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'BWHPL', roadFullName: 'SPV Name : DBL Borgaon Watambare Highways Private Limited(BWHPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'GAEPL', roadFullName: 'SPV Name : Ghaziabad Aligarh Expressway Private Limited(GAEPL)', status: 'SPV-RATED', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  // Page 3
  { roadName: 'SIPL', roadFullName: 'SPV Name : KNR Srirangam Infra Private Limited(SIPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'BFHL', roadFullName: 'SPV Name : Baharampore Farakka Highways Limited(BFHL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'KHEPL', roadFullName: 'SPV Name : Kokhraj Handia Expressway Pvt Ltd (KHEPL)', status: 'HO-PROCESS', dateCreated: '07-Apr-26, 3:35:52 PM', reportedBy: 'Swaraj' },
  { roadName: 'WMPTL', roadFullName: 'SPV Name : Western MP Infrastructure & Toll Roads Pvt Ltd (WMPTL)', status: 'HO-RATED', dateCreated: '07-Apr-26, 3:35:52 PM', reportedBy: 'Swaraj' },
  { roadName: 'DHMEPL', roadFullName: 'SPV Name : Delhi Hapur Meerut Expressway Private Limited(DHMEPL)', status: 'HO-PROCESS', dateCreated: '07-Apr-26, 3:35:52 PM', reportedBy: 'Swaraj' },
  { roadName: 'ADTPL', roadFullName: 'SPV Name : Devanahalli Tollway Private Limited (DTPL)', status: 'HO-PROCESS', dateCreated: '07-Apr-26, 3:35:52 PM', reportedBy: 'Swaraj' },
  { roadName: 'JUHPL', roadFullName: 'SPV Name : Jammu Udhampur Highway Private limited (JUHPL)', status: 'HO-RATED', dateCreated: '07-Apr-26, 3:35:52 PM', reportedBy: 'Swaraj' }
];

const RatingPage = ({ activeTab, setActiveTab }) => {
  const [activeTabInternal, setActiveTabInternal] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(dummyData.length / ITEMS_PER_PAGE);
  const currentData = dummyData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-pageBg">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden p-6">
          <div className="bg-white rounded shadow-sm border border-borderColor flex flex-col min-h-full">
            
            {/* Top Controls: Tabs and Actions */}
            <div className="flex items-center justify-between px-2 pt-2 border-b border-borderColor">
              <Tabs activeTab={activeTabInternal} setActiveTab={setActiveTabInternal} />
              
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
